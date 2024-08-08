import { DailyRoutinePluginSettings } from "src/settings/DailyRoutineSettingTab";
import { DailyRoutineExtension } from "./DailyRoutineExtension";
import { HideCompletedRoutineExtension } from "./hide-completed-routine";
import { ProgressExtension } from "./progress";
import { Constructor } from "obsidian";


// 여기에 사용할 extension을 등록
const extenstions: DailyRoutineExtension[] = [
  new ProgressExtension(),
  new HideCompletedRoutineExtension()
];

class DailyRoutineExtensionManager {
  #extensions: DailyRoutineExtension[];

  constructor(extensions: DailyRoutineExtension[]) {
    this.#extensions = extensions;
  }

  init(settings: DailyRoutinePluginSettings) {
    extenstions.forEach(extension => {
      extension.init(settings);
    });
  }

  applySettings(settings: DailyRoutinePluginSettings) {
    extenstions.forEach(extension => {
      extension.onSettingsChange(settings);
    });
  }

  load<E extends DailyRoutineExtension>(type: Constructor<E>){
    return this.#extensions.find(ext => ext instanceof type) as E;
  }
}


export const extensionManager = new DailyRoutineExtensionManager(extenstions);