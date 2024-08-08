/* eslint-disable @typescript-eslint/no-unused-vars */
import { surroundProcessor, SurroundProcessorContext } from "src/utils/surround-processor";
import { routineRegistry } from "../routine-registry";
import { RoutineLine, searchRoutineLines } from "./source";
import { decorateRoutineElement, findSectionRoutines, selectRoutines, setGetSectionInfo } from "./preview";
import { progressModule } from "src/extension/progress";


const noRoutine = (ctx: SurroundProcessorContext): boolean => {
  return ctx.get("no-routine");
}

// 최초 1회
surroundProcessor.setPre(ctx => {
  const routines: RoutineLine[] = searchRoutineLines();
  // routine 페이지 여부 설정
  if(routines.length === 0) ctx.set("no-routine", true);
  else ctx.set("no-routine", false);

  // 루틴이 없으면 위젯을 지우고 종료
  if(noRoutine(ctx)){
    progressModule.removeWidget();
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
  progressModule.renderWidget();
  progressModule.update();
})