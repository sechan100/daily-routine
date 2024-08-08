import { routineRegistry, routineElementRegistry } from "src/core/routine-registry";
import { getMarkdownView } from "src/utils/utils";
import { DailyRoutinePluginSettings } from "src/settings/DailyRoutineSettingTab";
import { DailyRoutineExtension } from "./DailyRoutineExtension";
import { plugin } from "src/utils/plugin-service-locator";
import { has } from "lodash";



const widgetId = "dr-progress-widget";

const createWidget = () => {
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
};

class ProgressExtension extends DailyRoutineExtension {
  #showProgressWidget: boolean;
  #widgetId: string;
  #widget: HTMLElement;

  constructor() {
    super();
    this.#showProgressWidget = false;
    this.#widgetId = widgetId;
    this.#widget = createWidget();
  }

  init(settings: DailyRoutinePluginSettings): void {
    this.#showProgressWidget = settings.showProgressWidget;

    // 일단 파일이 새로 열리면 widget을 지움. 그 이후에 markdown view가 routine을 가지고있다면 프로세서에서 다시 렌더링
    plugin().registerEvent(plugin().app.workspace.on("active-leaf-change", () => {
      const hasRoutine = getMarkdownView().containerEl.classList.contains("has-routine");
      this.renderWidget(hasRoutine);
    }));  
  }

  onSettingsChange(settings: DailyRoutinePluginSettings): void {
    const show = settings.showProgressWidget;
    this.#showProgressWidget = show;
    this.renderWidget(show);
  }
  
  calcProgressPercentage(): number {
    const total = routineRegistry.size();
    const checked = Array.from(routineRegistry.getValues()).filter(routine => routine.isChecked).length;
    return Math.round(checked / total * 100)
  }

  updateProgress() {
    const percentage = this.calcProgressPercentage();
    const translateY = -0.55 * percentage - 50;
    this.#widget.style.setProperty('--water-height-translate-y', `${translateY}%`);
    const indicator = this.#widget.querySelector(`.dr-indicator`);
    if(indicator){
      indicator.innerHTML = `${percentage}%`;
    }
  }

  // document에 붙이거나 떼기
  renderWidget(render = true) {
    if(render){
      if(document.getElementById(this.#widgetId)) return;
      getMarkdownView().containerEl.querySelector(".view-header")?.appendChild(this.#widget);
      this.updateProgress();
    } else {
      const widget = document.getElementById(this.#widgetId);
      if(widget){
        widget.remove();
        routineElementRegistry.clear(); // 겸사겸사 메모리 클리어
      }
    }
  }
}

export const progressExtension = new ProgressExtension();