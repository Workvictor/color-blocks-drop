import { canvas_clear } from 'src/core/utils/canvas';
import { ctx2d } from 'src/core/utils/element';
import { math_flip } from 'src/core/utils/math';
import { matrix_rotate } from 'src/core/utils/matrix';
import { color_block_draw } from './color_block';
import { conf_get_game_height, conf_get_game_width, conf_grid_size, conf_shadow_alpha } from './game_config';
import { grid_collides, grid_merge } from './grid';
import { shapes_get } from './shapes';

//---
let shape_ctx = ctx2d(conf_get_game_width(), conf_get_game_height())!;

let pos_x = 0;

let pos_y = 0;

let color_id = 0;

let shape_data: number[][] = [];
//---

const collides = () => grid_collides(shape_data, pos_x, pos_y);

const merge = () => grid_merge(shape_data, pos_x, pos_y, color_id);

const redraw = () => {
  canvas_clear(shape_ctx);

  const length = shape_data.length;

  if (!length) return;

  for (let row = 0; row < length; row++) {
    for (let col = 0; col < length; col++) {
      if (shape_data[row][col]) {
        color_block_draw(shape_ctx, color_id, col + pos_x, row + pos_y);
      }
    }
  }
};

const step_down = () => {
  pos_y++;
  if (collides()) {
    pos_y--;
    merge();
  }
  redraw();
};

export const shape_randomize = () => {
  [color_id, shape_data] = shapes_get();
  pos_x = (conf_grid_size[0] / 2 - shape_data.length / 2) | 0;
  pos_y = 0;
  redraw();
};

export const shape_clear = () => {
  canvas_clear(shape_ctx);
  shape_data = [];
};

export const shape_move = (x: number, y: number) => {
  pos_x += x;
  pos_y += y;

  if (collides()) {
    pos_x -= x;
    pos_y -= y;
    return;
  }

  redraw();
};

export const shape_rotate = (rotation: number) => {
  matrix_rotate(shape_data, rotation);

  const initial_x = pos_x;
  const initial_y = pos_y;

  let offset_x = 1;
  let offset_y = 0;

  // finding best placing ...
  while (collides() && offset_y < shape_data.length) {
    while (collides() && offset_x < shape_data.length) {
      pos_x += offset_x;
      offset_x = math_flip(offset_x);
    }
    if (collides() && offset_y < shape_data.length) {
      offset_y++;
      pos_y++;
      offset_x = 1;
      pos_x = initial_x;
    }
  }

  if (collides()) {
    // if it still collides - reset
    pos_x = initial_x;
    pos_y = initial_y;
    matrix_rotate(shape_data, -rotation);
    return;
  }

  if (offset_y > 0) {
    // if place is found !
    // now we can afford bonus
    //*TODO: try bonus
    console.log('rotate bonus: ', offset_y);
  }

  redraw();
};

export const shape_drop = () => {
  do {
    pos_y++;
  } while (!collides());
  pos_y--;
  merge();
  redraw();
};

export const shape_update = () => {
  step_down();
};

export const shape_draw = (ctx: CTX) => {
  ctx.drawImage(shape_ctx.canvas, 0, 0);
};
