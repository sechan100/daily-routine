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

/**
 * extension을 만들기 위한 추상
 * 해당 클래스를 상속하고, 객체를 생성하면, extension에 등록된다.
 */
export abstract class DailyRoutineExtension {

  constructor() {
    for(let i = 0; i < extenstions.length; i++){
      if(extenstions[i].constructor.name === this.constructor.name){
        throw new Error("Already registered extension: " + this.constructor.name);
      }
    }
    extenstions.push(this);
  }

  abstract init(settings: DailyRoutinePluginSettings): void;
  abstract onSettingsChange(settings: DailyRoutinePluginSettings): void;

  initializeExtension(settings: DailyRoutinePluginSettings) {
    this.init(settings);
  }
}

