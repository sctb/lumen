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
            throw new Error("Expected ) at " + s.pos);
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
            throw new Error("Expected \" at " + s.pos);
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
        case ")": throw new Error("Unexpected ) at " + s.pos);
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
    return operators[form];
}

function compileAtom(form, isStatement) {
    return form.toString() + (isStatement ? ";" : "");
}

function compileCall(form, isStatement) {
    var args = "";
    for (var i = 1; i < form.length; i++)
        args += compile(form[i], false);
    return form[0] + "(" + args + ")" + (isStatement ? ";" : "");
}

function compile(form, isStatement) {
    isStatement = typeof isStatement == "undefined" ? true : isStatement;

    if (isAtom(form))
        return compileAtom(form, isStatement);
    else if (isCall(form))
        return compileCall(form, isStatement);
    else
        throw new Error("Unexpected form " + form.toString());
}

function test(actual, expected) {
    if (expected !== actual) {
        throw new Error("Expected " + expected + ", was " + actual);
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
