"use strict";
exports.__esModule = true;
exports.routineMarkdownProcessor = void 0;
var obsidian_1 = require("obsidian");
var Routine_1 = require("./Routine");
var routine_registry_1 = require("./routine-registry");
var progress_widget_1 = require("./progress-widget");
var onFirstProcessorCalled = function () {
};
var processor = function (element) {
    var routineUls = element.querySelectorAll('blockquote > .contains-task-list'); // '> - [ ]', '>- [ ]', '> - [x]', '>- [x]'
    if (routineUls.length !== 0)
        console.groupCollapsed("[+ ROUTINE REGISTER]");
    routineUls.forEach(function (ul) {
        // blockquote로부터 한단계 올리기
        liftNodesFromBlockquote(ul);
        ul.querySelectorAll(":scope > li").forEach(function (li) {
            var routine = registerRoutine(li);
        });
    });
    console.groupEnd();
};
// 개별 routine 엘리먼트에 적용할 로직
var registerRoutine = function (element) {
    var routine = new Routine_1.Routine(element);
    routine_registry_1.routineRegistry.register(routine);
    return routine;
};
var onAllProcessorCalled = obsidian_1.debounce(function () {
    routine_registry_1.routineRegistry.updateDisconnected();
    progress_widget_1.progressWidget.setProgressPercentage(routine_registry_1.routineRegistry.getProgress().getPercentage());
}, 100, true);
var firstProcessorCalled = false;
function routineMarkdownProcessor(element) {
    console.debug("=== md-processor called ===", element);
    if (!firstProcessorCalled) {
        onFirstProcessorCalled();
        firstProcessorCalled = true;
    }
    processor(element);
    // processor가 여러번 실행되어도, 모든 프로세서가 호출되고 마지막에 한번만 호출됨
    onAllProcessorCalled();
}
exports.routineMarkdownProcessor = routineMarkdownProcessor;
// utils
var liftNodesFromBlockquote = function (element) {
    var blockquote = element.parentElement;
    if (!blockquote || blockquote.tagName.toLowerCase() !== 'blockquote') {
        console.error('The provided element does not have a <blockquote> parent.');
        return;
    }
    var grandparent = blockquote.parentElement;
    if (grandparent) {
        // Blockquote의 모든 자식 요소들을 grandparent로 옮김
        while (blockquote.firstChild) {
            grandparent.insertBefore(blockquote.firstChild, blockquote);
        }
        // Blockquote 요소 제거
        blockquote.remove();
    }
};
