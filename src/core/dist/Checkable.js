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
var _id, _isChecked, _element, _sectionInfo;
exports.__esModule = true;
exports.Checkable = void 0;
var utils_1 = require("src/global/utils");
var Checkable = /** @class */ (function () {
    function Checkable(element, sectionInfo) {
        _id.set(this, void 0); // sectionId
        _isChecked.set(this, void 0);
        _element.set(this, void 0);
        _sectionInfo.set(this, void 0);
        __classPrivateFieldSet(this, _element, element);
        __classPrivateFieldSet(this, _sectionInfo, sectionInfo);
        __classPrivateFieldSet(this, _isChecked, __classPrivateFieldGet(this, _element).classList.contains('.is-checked'));
    }
    Checkable.prototype.check = function () {
        // 기존 obsidian 동작
        __classPrivateFieldGet(this, _element).classList.add('.is-checked');
        __classPrivateFieldGet(this, _element).setAttribute('task', 'x');
        // 내부상태 업데이트
        __classPrivateFieldSet(this, _isChecked, true);
        this..call(this, true);
    };
    // 마크다운 문서를 체크박스 상태와 동기화
    Checkable.prototype. = function (check) {
        // 전체문서에서의 line을 구하기 위해서 seciton의 시작점을 가산
        var line = parseInt(__classPrivateFieldGet(this, _element).getAttribute('line')) + __classPrivateFieldGet(this, _sectionInfo).lineStart;
        var editor = utils_1.getEditor();
        var pos = editor.getLine(line).indexOf("- [");
        editor.replaceRange(check ? '- [x]' : '- [ ]', { line: line, ch: pos }, { line: line, ch: pos + 3 });
    };
    return Checkable;
}());
exports.Checkable = Checkable;
_id = new WeakMap(), _isChecked = new WeakMap(), _element = new WeakMap(), _sectionInfo = new WeakMap();
