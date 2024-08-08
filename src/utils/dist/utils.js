"use strict";
exports.__esModule = true;
exports.searchText = exports.getMarkdownView = exports.getFilePath = void 0;
var obsidian_1 = require("obsidian");
var plugin_service_locator_1 = require("./plugin-service-locator");
exports.getFilePath = function () {
    var file = plugin_service_locator_1.plugin().app.workspace.getActiveFile();
    if (!file)
        throw new Error('No active file');
    return file.path;
};
exports.getMarkdownView = function () {
    var view = plugin_service_locator_1.plugin().app.workspace.getActiveViewOfType(obsidian_1.MarkdownView);
    if (!view)
        throw new Error('No active markdown view');
    return view;
};
exports.searchText = function (e, regex) {
    var lineCount = e.lineCount();
    var results = [];
    for (var i = 0; i < lineCount; i++) {
        var l = e.getLine(i);
        var match = l.match(regex);
        if (match) {
            results.push({ lineNum: i, text: l });
        }
    }
    return results;
};
