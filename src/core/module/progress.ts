import { getMarkdownView } from "src/extension/utils";
import { routineElementRegistry, routineRegistry } from "../routine-registry";
import { DailyRoutinePluginSettings } from "main";


const widgetId = "dr-progress-widget";

const applySettings = (settings: DailyRoutinePluginSettings) => {
  console.log("applySettings", settings);
  if(settings.showProgressWidget){
    widget.style.display = 'block';
  } else {
    widget.style.display = 'none';
  }
}

interface RoutineProgress {
  total: number;
  checked: number;
  getPercentage: () => number;
}

const getProgress: () => RoutineProgress = () => {
  const total = routineRegistry.size();
  const checked = Array.from(routineRegistry.getValues()).filter(routine => routine.isChecked).length;
  return {
    total,
    checked,
    getPercentage: () => Math.round(checked / total * 100)
  } as RoutineProgress;
}


const widget = (() => {
  const widget = document.createElement('div');
  widget.id = widgetId;
  const indicator = document.createElement('div');
  indicator.classList.add('dr-indicator');
  indicator.innerHTML = '0%';
  widget.appendChild(indicator);
  const waveBg = document.createElement('div');
  waveBg.classList.add('dr-wave-bg');
  widget.appendChild(waveBg);
  const waves = document.createElement('div');
  waves.classList.add('dr-waves');
  waveBg.appendChild(waves);
  return widget;
})();

const renderWidget = () => {
  if(!document.getElementById(progressModule.widgetId)){
    const view = getMarkdownView();
    const widget = progressModule.widget;
    view.containerEl.querySelector(".view-header")?.appendChild(widget);
  }
}

const removeWidget = () => {
  console.log("removeWidget");
  const widget = getMarkdownView().containerEl.querySelector("#" + progressModule.widgetId);
  if(widget){
    widget.remove();
    routineElementRegistry.clear(); // 겸사겸사 메모리 클리어
  }
}

const setProgressPercentage = (percentage: number) => {
  const translateY = -0.55 * percentage - 50;
  document.documentElement.style.setProperty('--water-height-translate-y', `${translateY}%`);
  const indicator = document.querySelector(`#${widgetId} .dr-indicator`);
  if(indicator){
    indicator.innerHTML = `${percentage}%`;
  }
}

export const progressModule = {
  applySettings,
  widgetId,
  widget,
  renderWidget,
  removeWidget,
  setProgressPercentage,
  update: () => {
    setProgressPercentage(getProgress().getPercentage());
  }
}