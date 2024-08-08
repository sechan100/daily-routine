import { DailyRoutinePluginSettings } from "src/settings/DailyRoutineSettingTab";




const extenstions: DailyRoutineExtension[] = [];
export const initExtensions = (settings: DailyRoutinePluginSettings) => {
  extenstions.forEach(extension => {
    extension.initializeExtension(settings);
  });
}
export const applySettings = (settings: DailyRoutinePluginSettings) => {
  extenstions.forEach(extension => {
    extension.onSettingsChange(settings);
  });
}

export abstract class DailyRoutineExtension {
  abstract init(settings: DailyRoutinePluginSettings): void;
  abstract onSettingsChange(settings: DailyRoutinePluginSettings): void;

  initializeExtension(settings: DailyRoutinePluginSettings) {
    extenstions.push(this);
    this.init(settings);
  }
}

