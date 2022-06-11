export const array_fill = <T>(count: number, fill: T) => new Array<T>(count).fill(fill);

type A<T> = { forEach: (cb: (value: T, index: number, array: A<T>) => void) => void };
export const array_each = <T>(array: A<T>, callback: (value: T, index: number, array: A<T>) => void) =>
  array.forEach(callback);
