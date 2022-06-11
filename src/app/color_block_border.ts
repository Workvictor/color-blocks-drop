import { array_each } from 'src/core/utils/array_utils';
import { ctx2d } from 'src/core/utils/element';
import { hsla } from 'src/core/utils/hsla';
import { conf_block_size } from './game_state';

const i = conf_block_size;
const output_ctx = ctx2d(i)!;
const center = 0.5 * i;
const pattern = ctx2d(i)!;
const border_color = [0, 0, 0, 0].map((_, ind) => hsla(0, 0, 100 - 25 * ind, 1));
const border_points = [
  //top border - the most lighter
  [
    [0, 0],
    [i, 0],
  ],
  //left
  [
    [0, i],
    [0, 0],
  ],
  //right
  [
    [i, 0],
    [i, i],
  ],
  //bottom
  [
    [i, i],
    [0, i],
  ],
];

array_each(border_points, (border, ind) => {
  pattern.fillStyle = border_color[ind];
  pattern.beginPath();
  pattern.moveTo(center, center);
  array_each(border, ([x, y]) => {
    pattern.lineTo(x, y);
  });
  pattern.lineTo(center, center);
  pattern.fill();
});

output_ctx.lineJoin = 'miter';
output_ctx.lineWidth = 8;
output_ctx.miterLimit = 10;
output_ctx.strokeStyle = pattern.createPattern(pattern.canvas, 'no-repeat')!;
output_ctx.moveTo(0, i);
array_each([...border_points[0], ...border_points[3]], ([x, y]) => {
  output_ctx.lineTo(x, y);
});
output_ctx.stroke();

export const color_block_border = output_ctx.canvas;
