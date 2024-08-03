import DailyRoutinePlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";


export class DailyRoutineSettingTab extends PluginSettingTab {
  plugin: DailyRoutinePlugin;

  constructor(app: App, plugin: DailyRoutinePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Show Progress Widget")
      .setDesc("show progress widget on the right side of the editor when preview mode")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.showProgressWidget)
          .onChange(async (value) => {
            this.plugin.settings.showProgressWidget = value;
            await this.plugin.saveSettings();
          })
      );
  }
}