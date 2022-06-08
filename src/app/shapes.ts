import { math_random } from 'src/core/utils/math';
import { matrix_clone } from 'src/core/utils/matrix';

export enum EShapeID {
  T,
  L,
  J,
  S,
  Z,
  O,
  I,
}

const base_shapes = [
  // shape.T,
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  // shape.L,
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  // shape.J,
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  // shape.S,
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  // shape.Z,
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  // shape.O,
  [
    [1, 1],
    [1, 1],
  ],
  // shape.I,
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
];

// 10%
const small_shapes = [
  // shape.Dot,
  [[1]],
  // shape.Lsm,
  [
    [1, 0],
    [1, 1],
  ],
  // shape.Ism,
  [
    [1, 0],
    [1, 0],
  ],
  // shape.Ism,
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
];

// 5%
const big_shapes = [
  // shape.Sbig,
  [
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 0],
  ],
  // shape.Zbig,
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
];

// 1%
const unique_shapes = [
  // shape.Obig,
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  // shape_C,
  [
    [1, 1, 0],
    [1, 0, 0],
    [1, 1, 0],
  ],
  // shape.H,
  [
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
  ],
  // shape.Pl,
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  // shape.M,
  [
    [0, 1, 1],
    [1, 1, 0],
    [1, 0, 0],
  ],
];

// ('spawn unique shape?', MathEX.random(0, 101) <= 2);

const ingame_shapes = [...base_shapes];

const ingame_shapes_count = ingame_shapes.length;

export const shapes_get = (id: EShapeID = math_random(0, ingame_shapes_count)): [number, number[][]] => [
  id,
  matrix_clone(ingame_shapes[id]),
];

export const shapes_get_base_count = () => base_shapes.length;
