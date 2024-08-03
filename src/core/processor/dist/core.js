"use strict";
exports.__esModule = true;
exports.routineMarkdownProcessor = void 0;
var progress_1 = require("../progress");
var routine_registry_1 = require("../routine-registry");
var source_mode_processor_1 = require("./source-mode-processor");
// 최초 1회
var onFirstProcessorCalled = function (ctx) {
    console.log('=== first processor called ===');
    var routines = source_mode_processor_1.searchRoutine();
    routine_registry_1.routineRegistry.registerAll(routines);
};
// section별 프로세서
var processor = function (element, ctx) {
    // '> - [ ]', '>- [ ]', '> - [x]', '>- [x]'
    var routineUls = element.querySelectorAll('blockquote > .contains-task-list');
    if (routineUls.length === 0)
        return;
    console.groupCollapsed("[+ ROUTINE REGISTER]");
    var routines = ctx.get('routines');
    var routineNum = ctx.remove('routineNum') || 0;
    routineUls.forEach(function (ul) {
        liftNodesFromBlockquote(ul); // blockquote로부터 한단계 올리기(원래의 인용 스타일을 제거)
        ul.querySelectorAll(":scope > li").forEach(function (li) {
            routine_registry_1.routineRegistry.register(li, routines[routineNum]);
            routineNum++;
        });
    });
    ctx.set('routineNum', routineNum);
    console.groupEnd();
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
