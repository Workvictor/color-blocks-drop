export const vector_update = (vector_a: number[]) => (vector_b: number[]) => {
  vector_b[0] = vector_a[0];
  vector_b[1] = vector_a[1];
  return vector_b;
};
