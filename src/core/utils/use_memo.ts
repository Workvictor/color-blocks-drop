import { array_each } from './array_utils';

export const use_memo =
  <T>(fn: (...args: T[]) => void, prev: T[]) =>
  (...args: T[]) => {
    let isChanged = false;
    array_each(args, (val, ind) => {
      isChanged = val !== prev[ind];
      val = prev[ind];
    });
    if (isChanged) {
      fn(...args);
      isChanged = false;
    }
  };
