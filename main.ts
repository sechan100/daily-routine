import { Plugin } from 'obsidian';
import { setPlugin } from 'src/utils/plugin-service-locator';
import { surroundProcessorEntryPoint } from 'src/utils/surround-processor';
import './src/core/processor/processor'; // 실행 필요
import { checkAllCommand, uncheckAllCommand } from 'src/commands/routine-command';
import { DailyRoutinePluginSettings, DailyRoutineSettingTab, DEFAULT_SETTINGS } from 'src/settings/DailyRoutineSettingTab';
import { applySettings, initExtensions } from 'src/extension/DailyRoutineExtension';

export default class DailyRoutinePlugin extends Plugin {
	settings: DailyRoutinePluginSettings;

	async onload() {
		await this.loadSettings();

    // plugin locator
    setPlugin(this);

    // daily routine internal extensions initialization
    initExtensions(this.settings);

    // processor
    this.registerMarkdownPostProcessor(surroundProcessorEntryPoint.bind(this));

    // setting tab
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
    applySettings(this.settings);
    await this.saveData(this.settings);
  }
}