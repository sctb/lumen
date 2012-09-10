fs = require('fs');

var delimiters = {};
delimiters["("] = true; delimiters[")"] = true;
delimiters[";"] = true; delimiters["\n"] = true;

var whitespace = {};
whitespace[" "] = true; whitespace["\t"] = true; whitespace["\n"] = true;

var operators = {};
operators["+"] = "+"; operators["<"] = "<"; operators["="] = "==";
operators["and"] = "&&"; operators["or"] = "||";

var special = {};
special["set"] = compileSet;
special["if"] = compileIf;
special["function"] = compileFunction;
special["get"] = compileGet;
special["define"] = compileDefine;
special["while"] = compileWhile;

function error(msg) {
    throw new Error(msg);
}

function makeStream(str) {
    return { pos: 0, string: str, len: str.length };
}

function readFile(filename) {
    return fs.readFileSync(filename, "utf8");
}

function peekChar(s) {
    if (s.pos < s.len)
        return s.string.charAt(s.pos);
}

function readChar(s) {
    var c = peekChar(s);

    if (c) {
        s.pos++;
        return c;
    }
}

function readWhitespace (s) {
    var c;

    while (true) {
        c = peekChar(s);
        if (c && whitespace[c])
            readChar(s);
        else break;
    }
}

function readAtom(s) {
    var c, str = "";

    while (true) {
        c = peekChar(s);
        if (c && !whitespace[c] && !delimiters[c]) {
            str += c;
            readChar(s);
        } else break;
    }

    return str;
}

function readList(s) {
    readChar(s); // (

    var c, l = [];

    while (true) {
        readWhitespace(s);
        c = peekChar(s)
        if (c && c != ")") {
            l.push(read(s));
        } else if (c) {
            readChar(s); // )
            break;
        } else {
            error("Expected ) at " + s.pos);
        }
    }

    return l;
}

function readComment(s) {
    var c;
    do { c = readChar(s); } while (c && c != "\n");
}

function readString(s) {
    readChar(s); // "

    var c, str = "";

    while (true) {
        c = peekChar(s);
        if (c && c != "\"") {
            if (c == "\\")
                str += readChar(s);
            str += readChar(s);
        } else if (c) {
            readChar(s); // "
            break;
        } else {
            error("Expected \" at " + s.pos);
        }
    }

    return str;
}

function read(s) {
    readWhitespace(s);

    var c = peekChar(s);

    switch (c) {
        case ";": readComment(s); return read(s);
        case "(": return readList(s);
        case ")": error("Unexpected ) at " + s.pos);
        case "\"": return readString(s);
        default: return readAtom(s);
    }
}

function readFromString(str) {
    return read(makeStream(str));
}

function isAtom(form) {
    return typeof form == "string";
}

function isCall(form) {
    return Array.isArray(form) && typeof form[0] == "string";
}

function isOperator(form) {
    return operators[form[0]] != null;
}

function isSpecial(form) {
    return special[form[0]] != null;
}

function compileAtom(form, isStatement) {
    return form.toString() + (isStatement ? ";" : "");
}

function compileCall(form, isStatement) {
    return form[0] + compileArgs(form.slice(1)) + (isStatement ? ";" : "");
}

function compileOperator(form) {
    if (form.length > 3)
        error("Too many arguments to operator " + form[0]);

    var a = compile(form[1], false);
    var b = compile(form[2], false);
    return "(" + a + operators[form[0]] + b + ")";
}

function compileSet(form, isStatement) {
    if (!isStatement)
        error("Cannot compile assignment as an expression");
    if (!isAtom(form[0]))
        error("Invalid left-hand side of assignment");
    if (form.length < 3)
        error("Missing right-hand side in assignment");
    return compile(form[1], false) + "=" + compile(form[2], false) + ";";
}

function compileArgs(forms, areLiteral) {
    var i = 0, str = "(";
    while (i < forms.length) {
        if (areLiteral)
            str += forms[i];
        else
            str += compile(forms[i], false);
        if (i < forms.length - 1)
            str += ",";
        ++i;
    }
    return str + ")";
}

function compileBody(forms) {
    var i = 0, str = "{";
    while (i < forms.length) {
        str += compile(forms[i], true);
        ++i;
    }
    return str + "}";
}

function compileBranch(branch) {
    var body = branch.slice(1);
    return "if(" + compile(branch[0], false) + ")" + compileBody(body);
}

function compileIf(form, isStatement) {
    if (!isStatement)
        error("Cannot compile if as an expression");
    var i = 1, str = "";
    while (i < form.length) {
        str += compileBranch(form[i]);
        if (i < form.length - 1)
            str += "else ";
        ++i;
    }
    return str + ";";
}

function compileFunction(form, isStatement) {
    // ignoring isStatement for now
    var name = form[1];
    var args = compileArgs(form[2], true);
    var body = compileBody(form.slice(3));
    return "function " + name + args + body + ";";
}

function compileGet(form, isStatement) {
    return form[1] + "[" + form[2] + "]" + (isStatement ? ";" : "");
}

function compileDefine(form, isStatement) {
    if (!isStatement)
        error("Cannot compile definition as an expression");

    if (typeof form[2] == "undefined")
        return "var " + form[1] + ";";
    else return "var " + form[1] + "=" + form[2] + ";";
}

function compileWhile(form, isStatement) {
    if (!isStatement)
        error("Cannot compile while loop as an expression");
    var condition = compile(form[1], false);
    var body = compileBody(form.slice(2));
    return "while(" + condition + ")" + body + ";";
}

function compile(form, isStatement) {
    isStatement = typeof isStatement == "undefined" ? true : isStatement;

    if (isAtom(form))
        return compileAtom(form, isStatement);
    else if (isCall(form)) {
        if (isOperator(form)) {
            if (isStatement)
                error("Cannot compile use of operator " + form[0] + " as a statement");
            return compileOperator(form);
        } else if (isSpecial(form)) {
            return special[form[0]](form, isStatement);
        } else return compileCall(form, isStatement);
    } else error("Unexpected form " + form.toString());
}

function compileFile(filename) {
    var s = makeStream(readFile(filename));
    var form, output = "";
    while (true) {
        form = read(s);
        if (form)
            output += compile(form, true);
        else
            break;
    }
    return output;
}
