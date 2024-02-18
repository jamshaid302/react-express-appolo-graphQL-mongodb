import { atom, selector } from "recoil";

// atom
export const counterState = atom({
  key: "counterState",
  default: 0,
});

// Selector
export const squaredCounter = selector({
  key: "squaredCounter",
  get: ({ get }) => {
    const counter = get(counterState);
    return counter * counter;
  },
});

export const todoListAtom = atom({
  key: "todoListState",
  default: [],
});

export const getTasks = selector({
  key: "getTasks",
  get: ({ get }) => {
    const tasks = get(todoListAtom);
    return tasks;
  },
});
