/* eslint-disable @typescript-eslint/no-unused-vars */
import { surroundProcessor, SurroundProcessorContext } from "src/utils/surround-processor";
import { routineRegistry } from "../routine-registry";
import { RoutineLine, searchRoutineLines } from "./source";
import { decorateRoutineElement, findSectionRoutines, setGetSectionInfo } from "./preview";
import { progressExtension } from "src/extension/progress";
import { getMarkdownView } from "src/utils/utils";

const noRoutine = (ctx: SurroundProcessorContext): boolean => {
  return !ctx.get("has-routine");
}

// 최초 1회
surroundProcessor.setPre(ctx => {
  const routines: RoutineLine[] = searchRoutineLines();
  // routine 페이지 여부 설정
  const hasRoutine = routines.length > 0;
  ctx.set("has-routine",hasRoutine);
  getMarkdownView().containerEl.toggleClass("has-routine", hasRoutine);

  // 루틴이 없으면 위젯을 지우고 프로세서를 종료
  if(noRoutine(ctx)){
    progressExtension.renderWidget(false);
    return;
  }
  // routineRegistry를 초기화하고 새롭게 세팅
  routineRegistry.clear();
  routineRegistry.registerAll(routines);

  // section 정보를 가져오는 함수를 세팅
  setGetSectionInfo(ctx.markdownPostProcessorContext.getSectionInfo)
})


// section별 프로세서
surroundProcessor.setProcessor((element: HTMLElement, ctx) => {
  if(noRoutine(ctx)) return; // 루틴이 없으면 종료

  // '> - [ ]', '>- [ ]', '> - [x]', '>- [x]'
  const routineEls: HTMLLIElement[] = findSectionRoutines(element);
  routineEls.forEach(routineEl => {
    decorateRoutineElement(routineEl);
  });
})

// 마지막 1회
surroundProcessor.setPost(ctx => {
  if(noRoutine(ctx)) return; // 루틴이 없으면 종료
  progressExtension.renderWidget(true);
})