import { RoutineLine } from "./processor/source";


export class Routine {
  #line: number;
  #content: string;
  #isChecked: boolean;

  constructor(routineLine: RoutineLine){
    this.#line = routineLine.line;
    this.#content = routineLine.content;
    this.#isChecked = routineLine.isChecked;
  }

  sync(routineEl: HTMLLIElement) {
    const isChecked = routineEl.classList.contains('is-checked');
    this.#isChecked = isChecked;
  }


  get line() {
    return this.#line;
  }

  get content() {
    return this.#content;
  }

  get isChecked() {
    return this.#isChecked;
  }
}

// 모듈 레지스트리를 정의
const registry = new Map<number, Routine>();

// 루틴을 등록하는 함수
const register = (routineLine: RoutineLine): Routine => {
  const routine = new Routine(routineLine);
  registry.set(routine.line, routine);
  console.debug("[+ register routine]:", routine.content, routine);
  return routine;
}

const registerAll = (routines: RoutineLine[]) => {
  routines.forEach(routine => {
    register(routine);
  });
}

const clear = () => {
  registry.clear();
}

const forEach = (callback: (routine: RoutineLine) => void) => {
  registry.forEach(callback);
}

const get = (line: number): Routine | null => {
  return registry.get(line) ?? null;
}

export const routineRegistry = {
  register,
  forEach,
  registerAll,
  clear,
  get,
  size: () => registry.size,
  getValues: () => registry.values(),
  getKeys: () => registry.keys(),
}



// Routine HTMLLIElement 레지스트리를 정의
const elRegistry = new Set<HTMLLIElement>();

/**
 * 이미 지워진 루틴도 계속해서 쌓일 수 있기 때문에 메모리가 누수될 수 있음.
 * 당장은 progressWidget의 remove시 겸사겸사 한번씩 clear해주는 방식으로 해결
 */
export const routineElementRegistry = {

  register: (el: HTMLLIElement) => {
    elRegistry.add(el);
  },

  clear: () => {
    elRegistry.clear();
  },
  
  checkAll: () => {
    elRegistry.forEach(li => {
      if(!li.classList.contains('is-checked')){
        li.click();
      }
    });
  },

  uncheckAll: () => {
    elRegistry.forEach(li => {
      if(li.classList.contains('is-checked')){
        li.click();
      }
    });
  },
}

