import { Vector } from 'src/core/utils/vector';
import { shape_border } from './shape_border';
import { shape_list } from './shape_view';
import main_state from './main_state';
import { main_colors } from './main_colors';

const shape_state = {
  $shape_index: 0,
  $shape_position: new Vector(0, 0),
};

const get_current_shape = () => shape_list[shape_state.$shape_index] || shape_list[0];

export const get_current_shape_color = () => main_colors[shape_state.$shape_index];

export const shape_draw = (ctx: CanvasRenderingContext2D) => {
  const { $cell_size } = main_state;
  ctx.save();
  ctx.fillStyle = get_current_shape_color();
  ctx.shadowBlur = $cell_size;
  ctx.shadowColor = ctx.fillStyle;
  get_current_shape().$each((value, row, col) => {
    if (!value) return;
    const pos = new Vector(
      (col + shape_state.$shape_position.x) * $cell_size,
      (row + shape_state.$shape_position.y) * $cell_size
    );
    ctx.fillRect(...pos.xy, $cell_size, $cell_size);
    ctx.save();
    ctx.globalCompositeOperation = 'overlay';
    ctx.drawImage(shape_border.canvas, ...pos.xy);
    ctx.restore();
  });
  ctx.restore();
};

export const shape_move_down = () => {
  shape_state.$shape_position.y = shape_state.$shape_position.y + 1;
};

export const shape_move = (move_vector: Vector) => {
  shape_state.$shape_position.x = shape_state.$shape_position.x + move_vector.x;
  shape_state.$shape_position.y = shape_state.$shape_position.y + move_vector.y;
};

export const shape_rotate = (rotate_dir: number) => {
  get_current_shape().$rotate(rotate_dir);
};

export const shape_check_collide_y = (arena: number[][]) => {
  return get_current_shape().some((data, row) => {
    const y = shape_state.$shape_position.y + 1 + row;
    return data.some((value, col) => {
      return (value && arena[y] === undefined) || (value && arena[y][col]);
    });
  });
};

export const shape_get_next = () => {
  shape_state.$shape_position.y = 0;
  shape_state.$shape_position.x = 5;
  shape_state.$shape_index = (shape_state.$shape_index + 1) % shape_list.length;
};
