import { DailyRoutinePluginSettings } from "src/settings/DailyRoutineSettingTab";


/**
 * extension을 만들기 위한 추상
 * 해당 클래스를 상속하고, dr-extension-manager.ts에 등록하면 됨
 */
export abstract class DailyRoutineExtension {

  constructor() {
  }

  abstract init(settings: DailyRoutinePluginSettings): void;
  abstract onSettingsChange(settings: DailyRoutinePluginSettings): void;

  initializeExtension(settings: DailyRoutinePluginSettings) {
    this.init(settings);
  }
}

