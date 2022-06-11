import { get_style_var } from 'src/core/ui/style';
import { array_fill } from 'src/core/utils/array_utils';
import { canvas_clear } from 'src/core/utils/canvas';
import { ctx2d } from 'src/core/utils/element';
import { set } from 'src/core/utils/map_util';
import { raf } from 'src/core/utils/raf';
import { color_block_draw } from './color_block';
import {
  conf_block_size,
  conf_get_game_height,
  conf_get_game_width,
  conf_grid_size,
  event_animate_merge_start,
  event_animate_merge_stop,
  event_game_draw,
  event_game_over,
  game_ctx,
} from './game_state';

let grid_data: number[][] = [];
let grid_width = conf_get_game_width();
let grid_height = conf_get_game_height();
let layer_bg = ctx2d(grid_width, grid_height)!;
let layer_limit = ctx2d(grid_width, 1)!;
let layer_merge = ctx2d(grid_width, grid_height)!;
let layer_animation = ctx2d(grid_width, grid_height)!;
let row_limit_top = conf_grid_size[1] - 20;
let layer_animation_pos_y = 0;

layer_limit.strokeStyle = get_style_var(i => i.color_primary_active);
layer_bg.strokeStyle = get_style_var(i => i.color_gray_2);
layer_bg.fillStyle = get_style_var(i => i.color_gray_4);

for (let row = 0; row < conf_grid_size[1]; row++) {
  grid_data[row] = [];
  for (let col = 0; col < conf_grid_size[0]; col++) {
    grid_data[row][col] = -1;
  }
}

const layer_limit_redraw = () => {
  layer_limit.moveTo(0, 0);
  layer_limit.lineTo(conf_grid_size[0] * conf_block_size, 0);
  layer_limit.stroke();
};

const layer_bg_redraw = () => {
  const cell_size = conf_block_size;

  layer_bg.fillRect(0, 0, grid_width, grid_height);

  for (let row = 1; row < conf_grid_size[1]; row++) {
    const y = row * cell_size;
    layer_bg.moveTo(0, y);
    layer_bg.lineTo(conf_grid_size[0] * cell_size, y);
  }

  for (let col = 1; col < conf_grid_size[0]; col++) {
    const x = col * cell_size;
    layer_bg.moveTo(x, 0);
    layer_bg.lineTo(x, conf_grid_size[1] * cell_size);
  }

  layer_bg.stroke();
};

const layer_redraw = (layer: CTX, start_row = 0, end_row = grid_data.length) => {
  canvas_clear(layer);

  for (let row = start_row; row < end_row; row++) {
    for (let col = 0; col < grid_data[row].length; col++) {
      const id = grid_data[row][col];
      if (id >= 0) {
        color_block_draw(layer, id, col, row);
      }
    }
  }
};

const grid_is_fulfilled = () => {
  for (let col = 0, length = grid_data[row_limit_top].length; col < length; col++) {
    if (grid_data[row_limit_top][col] >= 0) return true;
  }
  return false;
};

const grid_is_collides_here = (row: number, col: number) =>
  [grid_data[row] === undefined, grid_data[row]?.[col] === undefined, grid_data[row]?.[col] >= 0].some(Boolean);

const grid_draw = (ctx: CTX) => {
  ctx.drawImage(layer_bg.canvas, 0, 0);
  ctx.drawImage(layer_limit.canvas, 0, row_limit_top * conf_block_size);
  ctx.drawImage(layer_merge.canvas, 0, 0);
  ctx.drawImage(layer_animation.canvas, 0, layer_animation_pos_y);
};

const animate_merge = async (fulfilled_rows: number[]) => {
  const rows_count = fulfilled_rows.length;

  if (!rows_count) return Promise.resolve();

  const start_row = fulfilled_rows[0];
  const end_row = fulfilled_rows[rows_count - 1];
  const animation_height = conf_block_size * rows_count;
  const bounce_reduction = 0.6; // Jumpion The bouncy one
  const gravity = 0.98;

  // draw top rows for animation
  layer_redraw(layer_animation, 0, start_row);
  // redraw bottom rows
  layer_redraw(layer_merge, end_row + 1);

  // delete and renew data
  const new_grid_data = array_fill(rows_count, []).map(() => array_fill(conf_grid_size[0], -1));
  grid_data.splice(start_row, rows_count);
  grid_data.unshift(...new_grid_data);

  let speed_y = 0;
  let bouncing_count = 4;
  let prev_time = performance.now();
  let time_passed = 0;

  return new Promise<void>(resolve => {
    const animation_loop = (time_now: number) => {
      if (bouncing_count <= 0) {
        layer_animation_pos_y = 0;
        canvas_clear(layer_animation);
        return resolve();
      }

      raf(animation_loop);

      time_passed = time_now - prev_time;
      prev_time = time_now;

      speed_y += gravity * time_passed;

      // animate top rows by frame
      layer_animation_pos_y += (speed_y / 1000) * time_passed;

      if (layer_animation_pos_y >= animation_height) {
        layer_animation_pos_y = animation_height;

        speed_y = -(speed_y * bounce_reduction);

        bouncing_count--;
      }
    };

    raf(animation_loop);
  });
};

export const grid_collides = (shape_data: number[][], shape_pos_x: number, shape_pos_y: number) => {
  for (let length = shape_data.length, row = 0; row < length; row++) {
    for (let col = 0; col < length; col++) {
      const shape_collides = shape_data[row][col];
      const grid_collides = grid_is_collides_here(shape_pos_y + row, shape_pos_x + col);
      if (shape_collides && grid_collides) return true;
    }
  }
  return false;
};

export const grid_merge = async (shape_data: number[][], color_id: number, x: number, y: number) => {
  const check_this_rows_after_merge = set<number>();

  for (let row = 0; row < shape_data.length; row++) {
    for (let col = 0; col < shape_data.length; col++) {
      const gridX = col + x;
      const gridY = row + y;
      if (shape_data[row][col]) {
        grid_data[gridY][gridX] = color_id;
        color_block_draw(layer_merge, color_id, gridX, gridY);
        check_this_rows_after_merge.add(gridY);
      }
    }
  }

  const fulfilled_rows: number[] = [];

  check_this_rows_after_merge.forEach(row => {
    if (grid_data[row].every(i => i >= 0)) {
      fulfilled_rows.push(row);
    }
  });

  if (grid_is_fulfilled()) return event_game_over.$broadcast();

  event_animate_merge_start.$broadcast();

  await animate_merge(fulfilled_rows);

  layer_redraw(layer_merge);

  event_animate_merge_stop.$broadcast();
};

layer_bg_redraw();
layer_limit_redraw();

event_game_draw.$subscribe(grid_draw);

event_game_over.$subscribe(() => {
  grid_draw(game_ctx);
});
