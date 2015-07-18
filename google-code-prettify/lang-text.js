var a=null;
PR.registerLangHandler(PR.createSimpleLexer([["str",/^'(?:[^\n\r'\\]|\\.)*(?:'|$)/,a,"'"],["pln",/^\s+/,a," \r\n\t\u00a0"]],[["com",/^\(\*[\S\s]*?(?:\*\)|$)|^{[\S\s]*?(?:}|$)/,a],["kwd",/^(?)\b/i,a],
["lit",/^(?:true|false|self|nil)/i,a],["pln",/^[a-z][^\W_]*/i,a],["lit",/^(?:\$[\da-f]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)/i,a,"0123456789"],["pun",/^.[^\s\w$'./@]*/,a]]),["pascal"]);
