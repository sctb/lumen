var delimiters = ['(', ')', ';', '\n'];
var whitespace = [' ', '\t', '\n'];

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

function unreadChar(s) {
    s.pos > 0 && --s.pos;
}

function read(s) {
    readWhitespace(s);

    var c = peekChar(s);

    switch (c) {
        case ';': readComment(s); return read(s);
        case '(': return readList(s);
        case ')': throw new Error("Unexpected ) at " + s.pos);
        default: return readAtom(s);
    }
}

function readWhitespace (s) {
    var c;

    do {
        c = readChar(s);
    } while (c && whitespace.indexOf(c) >= 0);

    c && unreadChar(s);
}

function readAtom(s) {
    var c = readChar(s), str = '';

    while (c && whitespace.indexOf(c) < 0 && delimiters.indexOf(c) < 0) {
        str += c;
        c = readChar(s);
    }

    c && unreadChar(s);

    var n = parseFloat(str);

    return isNaN(n) ? str : n;
}

function readList(s) {
    readChar(s); // (

    var c, l = [];

    while ((c = peekChar(s)) && c != ')') {
        l.push(read(s));
    }

    if (c)
        readChar(s);
    else
        throw new Error('Expected ) at ' + s.pos);

    return l;
}

function readComment(s) {
    var c;
    do { c = readChar(s); } while (c && c != '\n');
}

function readFromString(str) {
    return read(makeStream(str));
}

function test(actual, expected) {
    if (expected !== actual) {
        throw new Error("Expected '" + expected + "', was '" + actual + "'");
    }
}

function runTests() {
    test(readFromString('()').length, [].length);
    test(readFromString('a'), 'a');
    test(readFromString('(a b c)').length, 3);
    test(readFromString('(a b c) ; blaz').length, 3);
    test(readFromString('; blaz\n(a b c)').length, 3);
    test(readFromString('( 1  b delta)').length, 3);
}
