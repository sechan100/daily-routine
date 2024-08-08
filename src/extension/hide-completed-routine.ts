import { DailyRoutinePluginSettings } from 'src/settings/DailyRoutineSettingTab';
import { DailyRoutineExtension } from './DailyRoutineExtension';


export class HideCompletedRoutineExtension extends DailyRoutineExtension {
  #hideCompletedRoutine: boolean;

  constructor() {
    super();
    this.#hideCompletedRoutine = false
  }

  init(settings: DailyRoutinePluginSettings): void {
    this.#hideCompletedRoutine = settings.hideCompletedRoutines;
    this.hide(this.#hideCompletedRoutine);
  }
  
  onSettingsChange(settings: DailyRoutinePluginSettings): void {
    this.#hideCompletedRoutine = settings.hideCompletedRoutines;
    this.hide(this.#hideCompletedRoutine);
  }

  hide(hide = true) {
    document.documentElement.style.setProperty('--completed-routine-display', hide ? 'none' : 'block');
  }
  
}
