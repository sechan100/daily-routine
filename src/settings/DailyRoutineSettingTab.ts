import DailyRoutinePlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";



export interface DailyRoutinePluginSettings {
	showProgressWidget: boolean;
  hideCompletedRoutines: boolean;
}

export const DEFAULT_SETTINGS: DailyRoutinePluginSettings = {
  showProgressWidget: true,
  hideCompletedRoutines: false
}




export class DailyRoutineSettingTab extends PluginSettingTab {
  plugin: DailyRoutinePlugin;

  constructor(app: App, plugin: DailyRoutinePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    // SHOW PROGRESS WIDGET
    new Setting(containerEl)
      .setName("Show progress widget")
      .setDesc("show progress widget on the right side of the editor when preview mode")
      .addToggle(toggle =>toggle
        .setValue(this.plugin.settings.showProgressWidget)
        .onChange(async (value) => {
          this.plugin.settings.showProgressWidget = value;
          await this.plugin.saveSettings();
        })
      );

    // HIDE COMPLETED ROUTINES
    new Setting(containerEl)
      .setName("Hide completed routines")
      .setDesc("hide completed routines in the preview")
      .addToggle(toggle =>toggle
        .setValue(this.plugin.settings.hideCompletedRoutines)
        .onChange(async (value) => {
          this.plugin.settings.hideCompletedRoutines = value;
          await this.plugin.saveSettings();
        })
      );
  }
}