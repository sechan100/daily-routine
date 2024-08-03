"use strict";
exports.__esModule = true;
exports.routineMarkdownProcessor = void 0;
var utils_1 = require("src/global/utils");
var Routine_1 = require("../Routine");
var routine_registry_1 = require("../routine-registry");
var progress_1 = require("../progress");
// 최초 1회
var onFirstProcessorCalled = function (ctx) {
    console.log('=== first processor called ===');
    var routines = utils_1.searchRoutine(utils_1.getMarkdownView().editor);
    ctx.set('routines', routines);
};
// section별 프로세서
var processor = function (element, ctx) {
    // '> - [ ]', '>- [ ]', '> - [x]', '>- [x]'
    var routineUls = element.querySelectorAll('blockquote > .contains-task-list');
    if (routineUls.length !== 0)
        console.groupCollapsed("[+ ROUTINE REGISTER]");
    routineUls.forEach(function (ul) {
        liftNodesFromBlockquote(ul); // blockquote로부터 한단계 올리기(원래의 인용 스타일을 제거)
        ul.querySelectorAll(":scope > li").forEach(function (li) {
            registerRoutine(li);
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
// 마지막 1회
var onAllProcessorCalled = function (ctx) {
    routine_registry_1.routineRegistry.update();
    progress_1.routineProgress.update();
};
exports.routineMarkdownProcessor = {
    onFirstProcessorCalled: onFirstProcessorCalled,
    processor: processor,
    onAllProcessorCalled: onAllProcessorCalled
};
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
