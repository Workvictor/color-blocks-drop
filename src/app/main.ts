import { raf_timer } from 'src/core/utils/raf';
import { grid_draw, grid_init } from './grid';
import {
  shape_draw,
  shape_check_collide_y,
  shape_move_down,
  shape_move,
  shape_rotate,
  shape_get_next,
} from './shape_actions';
import { on_input_change } from './system/input';
import main_state from './main_state';

export const main = () => {
  const { $main_ctx, $cell_size, $grid, $scale } = main_state;
  const canvas = $main_ctx.canvas;
  const width = $grid.x * $cell_size;
  const height = $grid.y * $cell_size;
  const grid_data = new Array<number[]>($grid.y).fill(new Array($grid.x).fill(0));
  const drop_timeout = 500;

  canvas.width = width * $scale;
  canvas.height = height * $scale;
  $main_ctx.scale($scale, $scale);
  $main_ctx.imageSmoothingEnabled = false;

  let collide = false;

  grid_init();

  on_input_change.$subscribe(({ move_vector, rotate_dir }) => {
    //
    shape_move(move_vector);
    shape_rotate(rotate_dir);
    //
    // collide = shape_check_collide(grid_data);
    //
    grid_draw($main_ctx);
    shape_draw($main_ctx);
    //
  });

  raf_timer(() => {
    //
    shape_move_down();
    //
    collide = shape_check_collide_y(grid_data);
    //
    grid_draw($main_ctx);
    shape_draw($main_ctx);
    //
    if (collide) {
      collide = false;
      shape_get_next();
    }
  }, drop_timeout);
};
