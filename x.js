var delimiters = {};
delimiters["("] = true; delimiters[")"] = true;
delimiters[";"] = true; delimiters["\n"] = true;

var whitespace = {};
whitespace[" "] = true; whitespace["\t"] = true; whitespace["\n"] = true;

var operators = {};
operators["+"] = "+"; operators["<"] = "<";
operators["and"] = "&&"; operators["or"] = "||";

function makeStream(str) {
    return { pos: 0, string: str, len: str.length };
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

function compileAtom(form, isStatement) {
    return form.toString() + (isStatement ? ";" : "");
}

function compileCall(form, isStatement) {
    var i = 1, args = "";
    while (i < form.length) {
        var a = compile(form[i], false);
        args += a + (i < form.length - 1 ? "," : "");
        ++i;
    }
    return form[0] + "(" + args + ")" + (isStatement ? ";" : "");
}

function compileOperator(form) {
    if (form.length > 3)
        error("Too many arguments to operator " + form[0]);

    var a = compile(form[1], false);
    var b = compile(form[2], false);
    return "(" + a + operators[form[0]] + b + ")";
}

function compile(form, isStatement) {
    isStatement = typeof isStatement == "undefined" ? true : isStatement;

    if (isAtom(form))
        return compileAtom(form, isStatement);
    else if (isCall(form))
        if (isOperator(form)) {
            if (isStatement)
                error("Cannot compile use of operator " + form[0] + " as a statement");
            return compileOperator(form);
        } else return compileCall(form, isStatement);
    else error("Unexpected form " + form.toString());
}

function error(msg) {
    throw new Error(msg);
}

function test(actual, expected) {
    if (expected !== actual) {
        error("Expected " + expected + ", was " + actual);
    }
}

function runTests() {
    test(readFromString("()").length, [].length);
    test(readFromString("a"), "a");
    test(readFromString("(a b c)").length, 3);
    test(readFromString("(a b c) ; blaz").length, 3);
    test(readFromString("; blaz\n(a b c)").length, 3);
    test(readFromString("( 1  b delta)").length, 3);
    test(readFromString(""), "");
    test(readFromString("\"foo\""), "foo");
    test(readFromString("\"foo\n\""), "foo\n");
    test(readFromString("(\"a\" b c)")[0], "a");
}
