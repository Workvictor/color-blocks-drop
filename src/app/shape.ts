import { canvas_clear } from 'src/core/utils/canvas';
import { ctx2d } from 'src/core/utils/element';
import { math_flip } from 'src/core/utils/math';
import { matrix_rotate } from 'src/core/utils/matrix';
import { color_block_draw } from './color_block';
import {
  conf_get_game_height,
  conf_get_game_width,
  conf_grid_size,
  event_animate_merge_start,
  event_animate_merge_stop,
  event_game_draw,
  event_game_start,
  event_game_update,
  event_shape_drop,
  event_shape_move,
  event_shape_rotation,
} from './game_state';
import { grid_collides, grid_merge } from './grid';
import { shapes_get } from './shapes';

export const shape_init = () => {
  //---
  const shape_ctx = ctx2d(conf_get_game_width(), conf_get_game_height())!;

  let pos_x = 0;

  let pos_y = 0;

  let color_id = 0;

  let shape_data: number[][] = [];
  //---

  const collides = () => grid_collides(shape_data, pos_x, pos_y);

  const merge = () => grid_merge(shape_data, color_id, pos_x, pos_y);

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
    let next_step_available = true;
    pos_y++;
    if (collides()) {
      pos_y--;
      merge();
      next_step_available = false;
    }
    redraw();
    return next_step_available;
  };

  const shape_randomize = () => {
    [color_id, shape_data] = shapes_get();
    pos_x = (conf_grid_size[0] / 2 - shape_data.length / 2) | 0;
    pos_y = 0;
    redraw();
  };

  const shape_clear = () => {
    canvas_clear(shape_ctx);
    shape_data = [];
  };

  event_shape_move.$subscribe(([x, y]) => {
    pos_x += x;
    pos_y += y;

    if (collides()) {
      pos_x -= x;
      pos_y -= y;
      return;
    }

    redraw();
  });

  event_game_update.$subscribe(() => {
    step_down();
  });

  event_game_draw.$subscribe((ctx: CTX) => {
    ctx.drawImage(shape_ctx.canvas, 0, 0);
  });

  event_shape_rotation.$subscribe(rotation => {
    matrix_rotate(shape_data, rotation);

    const initial_x = pos_x;
    const initial_y = pos_y;
    const length = shape_data.length;

    let offset_x = 1;
    let offset_y = 0;

    // finding best placing ...
    while (collides() && offset_y < length) {
      while (collides() && offset_x < length) {
        pos_x += offset_x;
        offset_x = math_flip(offset_x);
      }
      if (collides() && offset_y < length) {
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
  });

  event_shape_drop.$subscribe(() => {
    while (step_down()) {}
  });

  event_game_start.$subscribe(shape_randomize);

  event_animate_merge_start.$subscribe(() => {
    shape_clear();
  });

  event_animate_merge_stop.$subscribe(() => {
    shape_randomize();
  });
};
