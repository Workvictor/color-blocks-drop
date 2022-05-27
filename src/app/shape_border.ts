import { canvasCTX } from 'src/core/utils/element';
import { HSLA } from 'src/core/utils/hsla';
import main_state from './main_state';

const create_border = () => {
  const { $cell_size } = main_state;
  const center = 0.5;
  const pattern = canvasCTX($cell_size, $cell_size)!;
  const border_color = new HSLA(0, 0, 100, 1).$list(4).map((color, index) => color.$light(-25 * index).$value);
  const border_points = [
    //top border - the most lighter
    [
      [0, 0],
      [1, 0],
    ],
    //left
    [
      [0, 1],
      [0, 0],
    ],
    //right
    [
      [1, 0],
      [1, 1],
    ],
    //bottom
    [
      [1, 1],
      [0, 1],
    ],
  ];

  border_points.forEach((border, ind) => {
    pattern.fillStyle = border_color[ind];
    pattern.beginPath();
    pattern.moveTo(center * $cell_size, center * $cell_size);
    border.forEach(([x, y]) => {
      pattern.lineTo(x * $cell_size, y * $cell_size);
    });
    pattern.lineTo(center * $cell_size, center * $cell_size);
    pattern.fill();
  });
  const ctx = canvasCTX($cell_size, $cell_size)!;
  ctx.lineJoin = 'miter';
  ctx.lineWidth = $cell_size / 4;
  ctx.miterLimit = 10;
  ctx.strokeStyle = pattern.createPattern(pattern.canvas, 'no-repeat')!;
  ctx.moveTo(0, 1 * $cell_size);
  [...border_points[0], ...border_points[3]].forEach(corner => {
    ctx.lineTo(corner[0] * $cell_size, corner[1] * $cell_size);
  });
  ctx.stroke();
  return ctx;
};

export const shape_border = create_border();