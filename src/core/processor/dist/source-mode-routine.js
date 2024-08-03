"use strict";
exports.__esModule = true;
exports.searchRoutine = void 0;
var utils_1 = require("src/global/utils");
exports.searchRoutine = function () {
    var e = utils_1.getMarkdownView().editor;
    var regex = new RegExp(/>\s{0,4}-\s*\[( |x)\]/g);
    var lineCount = e.lineCount();
    var results = [];
    for (var i = 0; i < lineCount; i++) {
        var l = e.getLine(i);
        var match = l.match(regex);
        if (match) {
            var contentStartIndex = l.indexOf(match[0]) + match[0].length;
            console.log(contentStartIndex);
            var content = l.substring(contentStartIndex).trim();
            results.push({ line: i, content: content, isChecked: match[0].contains('x') });
        }
    }
    return results;
};
