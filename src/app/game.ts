import { raf } from 'src/core/utils/raf';
import { conf_game_scale, conf_get_game_height, conf_get_game_width } from './game_config';
import { grid_draw } from './grid';
import { shape_draw, shape_randomize, shape_update } from './shape';
import { game_input_init } from './game_input';
import { ctx2d } from 'src/core/utils/element';

const game_ctx = ctx2d(conf_get_game_width() * conf_game_scale, conf_get_game_height() * conf_game_scale)!;

let stop_game = false;
let stop_update_loop = false;
let drop_timeout = 1000;
let drop_time = drop_timeout;

const update_loop = (time_now: number) => {
  raf(update_loop);

  if (stop_game || stop_update_loop || drop_time > time_now) return;
  drop_time = time_now + drop_timeout;

  shape_update();
};

const animation_loop = () => {
  raf(animation_loop);

  if (stop_game) return;

  grid_draw(game_ctx);
  shape_draw(game_ctx);
};

export const game_stop_update = (state: boolean) => {
  stop_update_loop = state;
};

export const game_stop = () => {
  stop_game = true;
  grid_draw(game_ctx);
};

export const game_start = () => {
  game_input_init();
  shape_randomize();
  [update_loop, animation_loop].map(raf);
};

export const game_is_paused = () => stop_game || stop_update_loop;

export const game_set_ctx = (root: HTMLElement) => {
	root.appendChild(game_ctx.canvas)
  game_ctx.scale(conf_game_scale, conf_game_scale);
  game_ctx.imageSmoothingEnabled = false;
};
