import { getMarkdownView } from "src/utils/utils";


// routine
export interface RoutineLine {
  line: number;
  content: string;
  isChecked: boolean;
}

const routineRegex = new RegExp(/>\s{0,4}-\s\[( |x)\]\s/gi);

export const searchRoutineLines = (): RoutineLine[] => {
  const e = getMarkdownView().editor;
  const lineCount = e.lineCount();
  const results: RoutineLine[] = [];
  for (let i = 0; i < lineCount; i++) {
    const l = e.getLine(i);
    const match = l.match(routineRegex);
    if(match) {
      const contentStartIndex = l.indexOf(match[0]) + match[0].length;
      const content = l.substring(contentStartIndex).trim();
      if(content.length === 0) continue;
      results.push({line: i, content: content, isChecked: match[0].contains('x')});
    }
  }
  return results;
}

export const checkAllRoutineLines = (lines: number[], status: "check" | "uncheck" = "check") => {
  const view = getMarkdownView();
  const e = view.editor;
  lines.forEach(line => {
    const l = e.getLine(line);
    const match = l.match(routineRegex);
    if(match){
      const newLine = l.replace(match[0], status === "check" ? "> - [x] " : "> - [ ] ");
      e.replaceRange(newLine, {line, ch: 0}, {line, ch: l.length});
      console.debug(`[${status}]: ${newLine}`);
    }
  });
  view.requestSave();
}