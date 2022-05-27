export class Vector extends Array<number> {
  set x(value: number) {
    this[0] = value;
  }
  get x() {
    return this[0];
  }
  set y(value: number) {
    this[1] = value;
  }
  get y() {
    return this[1];
  }
  get xy(): [number, number] {
    return [this[0], this[1]];
  }
  set xy(value: [number, number]) {
    this[0] = value[0];
    this[1] = value[1];
  }
}
