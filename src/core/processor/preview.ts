import { plugin } from "src/extension/plugin-service-locator";
import { Routine, routineElementRegistry, routineRegistry } from "../routine-registry";
import { MarkdownSectionInformation } from "obsidian";
import { progressModule } from "../module/progress";


const isNonContentRoutine = (li: HTMLLIElement): boolean => {
  /* span(list-bullet), input, textNode 3개의 자식을 가져야 함
   * 그렇지 않을 경우 content가 아직 작성되지 않은 routine이고, 이 경우 click될 경우 이상하게 전체가 리렌더링되는 
   * 문제가 발생하므로, 아직 content가 없는 routine은 routine으로 처리하지 않는다.
   */
// 근데 이상하게 content가 없는건 span, text, input, text 이러더라..
  return li.childNodes.length === 4 ? true : false;
}

export const findSectionRoutines = (element: HTMLElement): HTMLLIElement[] => {
  // routine li가 묶인 <ul>을 특정할 수 있는 쿼리를 작성
  const query = "blockquote > ul.contains-task-list";

  const results: HTMLLIElement[] = [];
  const routineUls: NodeListOf<HTMLUListElement> = element.querySelectorAll(query);
  routineUls.forEach(ul => {
    liftNodesFromBlockquote(ul); // blockquote로부터 한단계 올리기(원래의 인용 스타일을 제거)
    (ul.querySelectorAll(":scope > li") as NodeListOf<HTMLLIElement>).forEach(li => {
      if(isNonContentRoutine(li)) return;
      results.push(li);
    });
  });
  return results;
}

export const selectRoutines = (
  filter: "checked" | "unchecked" | "all" = "all"
) => {
  const routines: HTMLLIElement[] = [];
  const queryFilter = filter === "all" ? "" : filter === "checked" ? ".is-checked" : ":not(.is-checked)";
  const query = `li.dr-routine${queryFilter}`;
  const inputs = document.querySelectorAll(query) as NodeListOf<HTMLLIElement>;
  inputs.forEach(i => {
    routines.push(i);
  });
  return routines;
}

let getSectionInfo: (el: HTMLElement) => MarkdownSectionInformation | null;
export const setGetSectionInfo = (fn: (el: HTMLElement) => MarkdownSectionInformation | null) => {
  getSectionInfo = fn;
}

const getMatchedRoutine = (element: HTMLElement): Routine | null => {
  const sectionInfo = getSectionInfo(element);
  if(!sectionInfo) return null;
  const line = sectionInfo.lineStart + Number(element.getAttribute('data-line'));
  return routineRegistry.get(line);
}


const cns = {
  block: "dr-routine",
  input: "dr-routine__input",
  checkbox: {
    block: "dr-checkbox",
    checkmark: "dr-checkbox__checkmark",
  },
  content: "dr-routine__content",
}

export const decorateRoutineElement = (element: HTMLLIElement) => {
  // element registry register
  routineElementRegistry.register(element);

  // element
  element.classList.add(cns.block);
  // input
  const input = element.querySelector('input[type="checkbox"]') as HTMLInputElement;
  input.classList.add(cns.input);

  // custom checkbox
  const checkbox = document.createElement('div');
  checkbox.className = cns.checkbox.block;
  // custom checkmark
  const checkmark = document.createElement('div');
  checkmark.className = cns.checkbox.checkmark;
  checkbox.appendChild(checkmark);
  element.insertBefore(checkbox, element.firstChild); // insert

  // content
  element.childNodes.forEach(node => {
    if(node.nodeType === Node.TEXT_NODE) {
      const span = document.createElement('span');
      span.textContent = node.textContent?.trim() || '';
      node.replaceWith(span); // wrap plain text with span tag
      span.className = cns.content;
    }
  });

  // click 후 렌더링 반영후 실행됨(setTimeout 0s)
  const afterClick = (routine: Routine) => {
    routine.sync(element);
    progressModule.update();
  }
  
  // register click event
  plugin().registerDomEvent(element, 'click', (event) => {
    if(event.target === input) return;
    event.stopPropagation();
    const routine = getMatchedRoutine(element);
    if(!routine) throw new Error('Routine not found.');
    // ===
    console.groupCollapsed('[Routine Click]');
    console.debug(routine.content, `${routine.isChecked} => ${!routine.isChecked}`, element.isShown());
    input.click(); // CLICK!!!
    setTimeout(() => afterClick(routine));
    console.groupEnd();
    return false;
  });
}

const liftNodesFromBlockquote = (element: HTMLUListElement) => {
  const blockquote = element.parentElement;
  if(!blockquote || blockquote.tagName.toLowerCase() !== 'blockquote') {
    console.error('The provided element does not have a <blockquote> parent.');
    return;
  }

  const grandparent = blockquote.parentElement;
  if(grandparent) {
    // Blockquote의 모든 자식 요소들을 grandparent로 옮김
    while(blockquote.firstChild) {
        grandparent.insertBefore(blockquote.firstChild, blockquote);
    }
    // Blockquote 요소 제거
    blockquote.remove();
  }
}
