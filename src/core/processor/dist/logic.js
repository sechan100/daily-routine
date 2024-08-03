"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _map;
exports.__esModule = true;
exports.routineMarkdownProcessorEntryPoint = exports.RoutineProcessorContext = void 0;
var obsidian_1 = require("obsidian");
var processor_api_1 = require("./processor-api");
// Routine 프로세서가 실행되는 컨텍스트동안만 살아있는 로컬 스코프를 제공
var RoutineProcessorContext = /** @class */ (function () {
    function RoutineProcessorContext() {
        _map.set(this, void 0);
        __classPrivateFieldSet(this, _map, new Map());
    }
    RoutineProcessorContext.prototype.set = function (key, value) {
        __classPrivateFieldGet(this, _map).set(key, value);
    };
    RoutineProcessorContext.prototype.get = function (key) {
        return __classPrivateFieldGet(this, _map).get(key);
    };
    RoutineProcessorContext.prototype.pop = function (key) {
        var value = __classPrivateFieldGet(this, _map).get(key);
        __classPrivateFieldGet(this, _map)["delete"](key);
        return value;
    };
    return RoutineProcessorContext;
}());
exports.RoutineProcessorContext = RoutineProcessorContext;
_map = new WeakMap();
var routineProcessorContext = null;
var _d = obsidian_1.debounce(function (ctx) {
    routineProcessorContext = null; // context clear
    processor_api_1.routineMarkdownProcessor.onAllProcessorCalled(ctx);
}, 100, true);
var firstProcessorCalled = false;
function routineMarkdownProcessorEntryPoint(element) {
    console.debug("=== md-processor called ===", element);
    if (!firstProcessorCalled) {
        routineProcessorContext = new RoutineProcessorContext();
        processor_api_1.routineMarkdownProcessor.onFirstProcessorCalled(routineProcessorContext);
        firstProcessorCalled = true;
    }
    processor_api_1.routineMarkdownProcessor.processor(element, routineProcessorContext);
    // processor가 여러번 실행되어도, 모든 프로세서가 호출되고 마지막에 한번만 호출됨
    _d(routineProcessorContext);
}
exports.routineMarkdownProcessorEntryPoint = routineMarkdownProcessorEntryPoint;
