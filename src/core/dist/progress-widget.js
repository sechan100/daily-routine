"use strict";
exports.__esModule = true;
exports.progressWidget = void 0;
var widgetId = "dr-progress-widget";
var setProgressPercentage = function (percentage) {
    var translateY = -0.55 * percentage - 50;
    document.documentElement.style.setProperty('--water-height-translate-y', translateY + "%");
    var indicator = document.querySelector("#" + widgetId + " .dr-indicator");
    if (indicator) {
        indicator.innerHTML = percentage + "%";
    }
};
var createWidget = function () {
    var widget = document.createElement('div');
    widget.id = widgetId;
    var indicator = document.createElement('div');
    indicator.classList.add('dr-indicator');
    indicator.innerHTML = '0%';
    widget.appendChild(indicator);
    var waveBg = document.createElement('div');
    waveBg.classList.add('dr-wave-bg');
    widget.appendChild(waveBg);
    var waves = document.createElement('div');
    waves.classList.add('dr-waves');
    waveBg.appendChild(waves);
    return widget;
};
exports.progressWidget = {
    widgetId: widgetId,
    widget: createWidget(),
    setProgressPercentage: setProgressPercentage
};
