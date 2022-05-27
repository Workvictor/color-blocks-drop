export class Matrix<T> extends Array<T[]> {
  $each = (cb: (value: T, row: number, col: number) => void) => {
    const context = this;
    const length = context.length;
    for (let row = 0; row < length; row++) {
      for (let col = 0; col < length; col++) {
        cb(this[row][col], row, col);
      }
    }
  };

  $rotate = (dir = 1) => {
    if (dir === 0) return;
    const context = this;
    const length = context.length;
    for (let row = 0; row < length; ++row) {
      for (let col = 0; col < row; ++col) {
        [context[col][row], context[row][col]] = [context[row][col], context[col][row]];
      }
    }
    if (dir > 0) {
      for (let row = 0; row < length; row++) {
        context[row].reverse();
      }
    }
    if (dir < 0) {
      context.reverse();
    }
  };
}
