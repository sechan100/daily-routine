"use strict";
var _this = this;
exports.__esModule = true;
exports.routineRegistry = void 0;
var plugin_service_locator_1 = require("src/extension/plugin-service-locator");
var routine_cn_1 = require("src/global/routine-cn");
var utils_1 = require("src/global/utils");
var source_mode_processor_1 = require("./processor/source-mode-processor");
// 모듈 레지스트리를 정의
var registry = new Set();
// 루틴을 등록하는 함수
var register = function (element) {
    var registerRoutine = function (element, routineLine) {
        if (routineLine.content !== element.textContent)
            throw new Error('Routine content does not match.');
        var routine = new Routine(element, routineLine.line);
        exports.routineRegistry.register(routine);
        console.debug("[+REGISTER]:", routine.content);
        return routine;
    };
    registry.add(routine);
    // element
    _this. = element;
    _this..classList.add(routine_cn_1.routineCn.block);
    // line
    _this. = line;
    // input
    _this. = _this..querySelector('input[type="checkbox"]');
    _this..classList.add(routine_cn_1.routineCn.input);
    // isChecked
    _this. = _this..classList.contains('is-checked');
    // checkbox
    var checkbox = document.createElement('div');
    checkbox.className = routine_cn_1.routineCn.checkbox.block;
    // checkmark
    var checkmark = document.createElement('div');
    checkmark.className = routine_cn_1.routineCn.checkbox.checkmark;
    checkbox.appendChild(checkmark);
    // insert checkbox
    element.insertBefore(checkbox, element.firstChild);
    // content
    _this..childNodes.forEach(function (node) {
        var _a;
        if (node.nodeType === Node.TEXT_NODE) {
            var span = document.createElement('span');
            span.textContent = ((_a = node.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
            node.replaceWith(span);
            _this. = span;
            span.className = routine_cn_1.routineCn.content;
        }
    });
    // register click event
    plugin_service_locator_1.plugin().registerDomEvent(element, 'click', function (event) {
        if (event.target === _this.)
            return;
        event.stopPropagation();
        _this.click();
        return false;
    });
    console.debug("[+REGISTER]:", routine.content);
};
// preview와 source 모드가 변경될 때나 파일이 바뀔 때, 기존 routineRegistry에는 존재했지만 새롭게 렌더링되면서 없어진 루틴을 찾아서 제거하는 함수
var update = function () {
    var removed = [];
    var routines = source_mode_processor_1.searchRoutine(utils_1.getMarkdownView().editor);
    registry.forEach(function (routine) {
        if (isRemoved(routine)) {
            registry["delete"](routine);
            removed.push(routine.content);
        }
    });
    if (removed.length > 0) {
        console.groupCollapsed("[- ROUTINE REMOVED]");
        for (var _i = 0, removed_1 = removed; _i < removed_1.length; _i++) {
            var content = removed_1[_i];
            console.debug("[-REMOVED]:", content);
        }
        console.groupEnd();
    }
};
var registerAll = function (routines) {
    routines.forEach(function (routine) {
        register(routine);
    });
};
var clear = function () {
    registry.clear();
};
var forEach = function (callback) {
    registry.forEach(callback);
};
exports.routineRegistry = {
    register: register,
    forEach: forEach,
    update: update,
    registerAll: registerAll,
    clear: clear,
    size: function () { return registry.size; },
    getValues: function () { return new Set(registry); }
};
