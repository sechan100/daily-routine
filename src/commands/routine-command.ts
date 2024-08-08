import { Command } from "obsidian";
import { routineRegistry } from "../core/routine-registry";
import { getMarkdownView } from "src/utils/utils";
import { checkAllRoutineLines, searchRoutineLines } from "../core/processor/source";

const findModeSwitchBtn = () => {
  const query = 'button.clickable-icon.view-action';
  return Array.from(getMarkdownView().containerEl.querySelectorAll(query
) as NodeListOf<HTMLButtonElement>)
  .find(btn => {
    return ( 
      btn.children[0].classList.contains('lucide-book-open')
      ||
      btn.children[0].classList.contains('lucide-edit-3')
    )
  }) as HTMLButtonElement;
}

const cmd = (status: "check" | "uncheck") => {
  if(getMarkdownView().getMode() === 'preview'){
    const btn = findModeSwitchBtn();
    btn.click();
    setTimeout(() => {
      btn.click();
    }, 0);
  }
  let lines: number[] = Array.from(routineRegistry.getKeys());
  if(lines.length === 0){
    lines = searchRoutineLines().map(r => r.line);
  }
  checkAllRoutineLines(lines, status);
}


export const checkAllCommand: Command = {
  id: 'check-all',
  name: 'Check All Routine',
  callback: () => {
    cmd("check");
  }
}

export const uncheckAllCommand: Command = {
  id: 'uncheck-all',
  name: 'Uncheck All Routine',
  callback: () => {
    cmd("uncheck");
  }
}