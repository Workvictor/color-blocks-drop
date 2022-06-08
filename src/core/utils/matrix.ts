export const matrix_clone = (matrix: number[][]) => matrix.map(data => data.slice());

export const matrix_rotate = (matrix: number[][], dir: number) => {
  if (dir === 0) return;
  //
  const length = matrix.length;
  for (let row = 0; row < length; ++row) {
    for (let col = 0; col < row; ++col) {
      [matrix[col][row], matrix[row][col]] = [matrix[row][col], matrix[col][row]];
    }
  }
  if (dir > 0) {
    for (let row = 0; row < length; row++) {
      matrix[row].reverse();
    }
  }
  if (dir < 0) {
    matrix.reverse();
  }
};
