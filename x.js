var delimiters = ['(', ')', ';', '\n'];
var whitespace = [' ', '\t', '\n'];

function makeStream(str) {
    return { pos: 0, string: str, len: str.length };
}

function readChar(s) {
    if (s.pos < s.len)
        return s.string.charAt(s.pos++);
}

function unreadChar(s) {
    s.pos > 0 && --s.pos;
}

function read(s) {
    readWhitespace(s);

    var c = readChar(s);

    switch (c) {
        case ';': return readComment(s);
        default: return c;
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
}

function readList(s) {
}

function readComment(s) {
    var c;
    do { c = readChar(s); } while (c && c != '\n');
}

function readFromString(str) {
    return read(makeStream(str));
}
