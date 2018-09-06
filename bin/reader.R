delimiters <- list("(" = TRUE, ")" = TRUE, ";" = TRUE, "\r" = TRUE, "\n" = TRUE)
whitespace <- list(" " = TRUE, "\t" = TRUE, "\r" = TRUE, "\n" = TRUE)
stream <- function (str, more) {
list(pos = 0, string = str, len = V_35(str), more = more)
}
peek_char <- function (s) {
  V__V__id <- s
  V__pos <- V__V__id[["pos"]]
  V__len <- V__V__id[["len"]]
  V__string <- V__V__id[["string"]]
  if (V__pos < V__len) {
    char(V__string, V__pos)
  }
}
read_char <- function (s) {
  V__c <- peek_char(s)
  if (V__c) {
    s[["pos"]] <<- s[["pos"]] + 1
    V__c
  }
}
skip_non_code <- function (s) {
  while (TRUE) {
    V__c1 <- peek_char(s)
    if (nil63(V__c1)) {
      break
    } else {
      if (whitespace[[V__c1]]) {
        read_char(s)
      } else {
        if (V__c1 == ";") {
          while (V__c1 && !( V__c1 == "\n")) {
            V__c1 <- read_char(s)
          }
          skip_non_code(s)
        } else {
          break
        }
      }
    }
  }
}
read_table <- list()
eof <- list()
read <- function (s) {
  skip_non_code(s)
  V__c2 <- peek_char(s)
  if (is63(V__c2)) {
    (read_table[[V__c2]] || read_table[[""]])(s)
  } else {
    eof
  }
}
read_all <- function (s) {
  V__l <- list()
  while (TRUE) {
    V__form <- read(s)
    if (V__form == eof) {
      break
    }
    add(V__l, V__form)
  }
  V__l
}
read_string <- function (str, more) {
  V__x <- read(stream(str, more))
  if (!( V__x == eof)) {
    V__x
  }
}
key63 <- function (atom) {
  string63(atom) && V_35(atom) > 1 && char(atom, edge(atom)) == ":"
}
flag63 <- function (atom) {
  string63(atom) && V_35(atom) > 1 && char(atom, 0) == ":"
}
expected <- function (s, c) {
  V__V__id1 <- s
  V__more <- V__V__id1[["more"]]
  V__pos1 <- V__V__id1[["pos"]]
  V__more || error(cat("Expected ", c, " at ", V__pos1))
}
wrap <- function (s, x) {
  V__y <- read(s)
  if (V__y == s[["more"]]) {
    V__y
  } else {
    list(x, V__y)
  }
}
hex_prefix63 <- function (str) {
  V__e
  if (code(str, 0) == 45) {
    V__e <- 1
  } else {
    V__e <- 0
  }
  V__i <- V__e
  V__id2 <- code(str, V__i) == 48
  V__e1
  if (V__id2) {
    V__i <- V__i + 1
    V__n <- code(str, V__i)
    V__e1 <- V__n == 120 || V__n == 88
  } else {
    V__e1 <- V__id2
  }
  V__e1
}
maybe_number <- function (str) {
  if (hex_prefix63(str)) {
    if (number_code63(code(str, edge(str)))) {
      number(str)
    }
  }
}
real63 <- function (x) {
  number63(x) && ! nan63(x) && ! inf63(x)
}
read_table[[""]] <<- function (s) {
  V__str <- ""
  while (TRUE) {
    V__c3 <- peek_char(s)
    if (V__c3 && (! whitespace[[V__c3]] && ! delimiters[[V__c3]])) {
      V__str <- cat(V__str, read_char(s))
    } else {
      break
    }
  }
  if (V__str == "true") {
    TRUE
  } else {
    if (V__str == "false") {
      FALSE
    } else {
      V__n1 <- maybe_number(V__str)
      if (real63(V__n1)) {
        V__n1
      } else {
        V__str
      }
    }
  }
}
read_table[["("]] <<- function (s) {
  read_char(s)
  V__r16 <- NULL
  V__l1 <- list()
  while (nil63(V__r16)) {
    skip_non_code(s)
    V__c4 <- peek_char(s)
    if (V__c4 == ")") {
      read_char(s)
      V__r16 <- V__l1
    } else {
      if (nil63(V__c4)) {
        V__r16 <- expected(s, ")")
      } else {
        V__x1 <- read(s)
        if (key63(V__x1)) {
          V__k <- clip(V__x1, 0, edge(V__x1))
          V__v <- read(s)
          V__l1[[V__k]] <<- V__v
        } else {
          if (flag63(V__x1)) {
            V__l1[[clip(V__x1, 1)]] <<- TRUE
          } else {
            add(V__l1, V__x1)
          }
        }
      }
    }
  }
  V__r16
}
read_table[[")"]] <<- function (s) {
  error(cat("Unexpected ) at ", s[["pos"]]))
}
read_table[["\""]] <<- function (s) {
  read_char(s)
  V__r19 <- NULL
  V__str1 <- "\""
  while (nil63(V__r19)) {
    V__c5 <- peek_char(s)
    if (V__c5 == "\"") {
      V__r19 <- cat(V__str1, read_char(s))
    } else {
      if (nil63(V__c5)) {
        V__r19 <- expected(s, "\"")
      } else {
        if (V__c5 == "\\") {
          V__str1 <- cat(V__str1, read_char(s))
        }
        V__str1 <- cat(V__str1, read_char(s))
      }
    }
  }
  V__r19
}
read_table[["|"]] <<- function (s) {
  read_char(s)
  V__r21 <- NULL
  V__str2 <- "|"
  while (nil63(V__r21)) {
    V__c6 <- peek_char(s)
    if (V__c6 == "|") {
      V__r21 <- cat(V__str2, read_char(s))
    } else {
      if (nil63(V__c6)) {
        V__r21 <- expected(s, "|")
      } else {
        V__str2 <- cat(V__str2, read_char(s))
      }
    }
  }
  V__r21
}
read_table[["'"]] <<- function (s) {
  read_char(s)
  wrap(s, "quote")
}
read_table[["`"]] <<- function (s) {
  read_char(s)
  wrap(s, "quasiquote")
}
read_table[[","]] <<- function (s) {
  read_char(s)
  if (peek_char(s) == "@") {
    read_char(s)
    wrap(s, "unquote-splicing")
  } else {
    wrap(s, "unquote")
  }
}
return list(stream = stream, read = read, "read-all" = read_all, "read-string" = read_string, "read-table" = read_table)
