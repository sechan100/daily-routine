"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
var _preview, _datas;
exports.__esModule = true;
exports.PreviewModeContext = void 0;
var PreviewModeContext = /** @class */ (function () {
    function PreviewModeContext() {
        _preview.set(this, void 0);
        _datas.set(this, void 0);
        __classPrivateFieldSet(this, _datas, new Map());
    }
    Object.defineProperty(PreviewModeContext.prototype, "getInstance", {
        get: function () {
            if (!__classPrivateFieldGet(this, _preview)) {
                __classPrivateFieldSet(this, _preview, new PreviewModeContext());
            }
            return __classPrivateFieldGet(this, _preview);
        },
        enumerable: false,
        configurable: true
    });
    PreviewModeContext.prototype.set = function (key, value) {
        __classPrivateFieldGet(this, _datas).set(key, value);
    };
    PreviewModeContext.prototype.get = function (key) {
        return __classPrivateFieldGet(this, _datas).get(key);
    };
    PreviewModeContext.prototype.remove = function (key) {
        __classPrivateFieldGet(this, _datas)["delete"](key);
    };
    PreviewModeContext.prototype.clear = function () {
        __classPrivateFieldGet(this, _datas).clear();
    };
    return PreviewModeContext;
}());
exports.PreviewModeContext = PreviewModeContext;
_preview = new WeakMap(), _datas = new WeakMap();
