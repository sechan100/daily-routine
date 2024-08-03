import { Plugin } from 'obsidian';
import { progressModule } from 'src/core/module/progress';
import { setPlugin } from 'src/extension/plugin-service-locator';
import { surroundProcessorEntryPoint } from 'src/extension/surround-processor';
import './src/core/processor/processor'; // 실행 필요
import { checkAllCommand, uncheckAllCommand } from 'src/core/commands/routine-command';
import { DailyRoutineSettingTab } from 'src/core/settings/DailyRoutineSettingTab';

export interface DailyRoutinePluginSettings {
	showProgressWidget: boolean;
}

const DEFAULT_SETTINGS: DailyRoutinePluginSettings = {
  showProgressWidget: true,
}

export default class DailyRoutinePlugin extends Plugin {
	settings: DailyRoutinePluginSettings;

	async onload() {
		await this.loadSettings();

    // plugin locator
    setPlugin(this);

    this.applySettings();

    // processor
    this.registerMarkdownPostProcessor(surroundProcessorEntryPoint.bind(this));

    // progress widget
    this.registerEvent(this.app.workspace.on("file-open", () => {
      progressModule.removeWidget();
    }))

    this.addSettingTab(new DailyRoutineSettingTab(this.app, this));

    // commands
    this.addCommand(checkAllCommand);
    this.addCommand(uncheckAllCommand);
  }
  
  onunload() {
  }

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

  async saveSettings() {
    await this.applySettings();
    await this.saveData(this.settings);
  }

  async applySettings() {
    progressModule.applySettings(this.settings);
  }
}