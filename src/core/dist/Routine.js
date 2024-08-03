"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _isChecked, _line, _element, _input, _content;
exports.__esModule = true;
exports.Routine = void 0;
var progress_1 = require("./progress");
var Routine = /** @class */ (function () {
    function Routine(element, line) {
        _isChecked.set(this, void 0);
        _line.set(this, void 0);
        _element.set(this, void 0);
        _input.set(this, void 0);
        _content.set(this, void 0);
    }
    Routine.prototype.click = function () {
        __classPrivateFieldSet(this, _isChecked, !__classPrivateFieldGet(this, _isChecked));
        __classPrivateFieldGet(this, _input).click(); // click
        progress_1.routineProgress.update();
    };
    Routine.prototype.check = function () {
        if (!this.isChecked()) {
            __classPrivateFieldGet(this, _input).click();
        }
    };
    Routine.prototype.uncheck = function () {
        if (this.isChecked()) {
            __classPrivateFieldGet(this, _input).click();
        }
    };
    Routine.prototype.isChecked = function () {
        return __classPrivateFieldGet(this, _isChecked);
    };
    Object.defineProperty(Routine.prototype, "element", {
        get: function () {
            return __classPrivateFieldGet(this, _element);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Routine.prototype, "content", {
        get: function () {
            return __classPrivateFieldGet(this, _content).innerHTML;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Routine.prototype, "line", {
        get: function () {
            return __classPrivateFieldGet(this, _line);
        },
        enumerable: false,
        configurable: true
    });
    return Routine;
}());
exports.Routine = Routine;
_isChecked = new WeakMap(), _line = new WeakMap(), _element = new WeakMap(), _input = new WeakMap(), _content = new WeakMap();
