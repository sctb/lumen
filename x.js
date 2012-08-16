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
        case ';': return readComment(s);
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

    return str;
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
