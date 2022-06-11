import { ctx2d } from 'src/core/utils/element';
import { observer } from 'src/core/utils/observer';

export const enum enum_game_scene {
  title = 0,
  game = 1,
}

export const conf_shadow_alpha = 0.3;
export const conf_shadow_blur = 24;
export const conf_block_size = 16;
export const conf_grid_size = [10, 24];
export const conf_game_width = 540;
export const conf_game_height = 540;

export const conf_get_game_width = () => conf_grid_size[0] * conf_block_size;
export const conf_get_game_height = () => conf_grid_size[1] * conf_block_size;
export const conf_get_window_size = (): [number, number] => [window.innerWidth, window.innerHeight];

export const conf_get_scale = () => {
  const [cur_w, cur_h] = conf_get_window_size();
  return Math.min(cur_w / conf_game_width, cur_h / conf_game_height);
};
export const game_ctx = ctx2d(conf_get_game_width(), conf_get_game_height())!;
game_ctx.imageSmoothingEnabled = false;

export const gs_animate_running = observer(false);
export const gs_update_running = observer(false);
export const gs_data_level = observer(1); // level difficulty +0.01
export const gs_update_timeout = observer(1000); // data store time
export const gs_input_timeout = observer(250); // network latency
export const gs_scene = observer(enum_game_scene.title);

export const event_game_over = observer(0);
export const event_game_start = observer(0);
export const event_game_draw = observer(game_ctx);
export const event_game_update = observer(0);
export const event_animate_merge_start = observer(0);
export const event_animate_merge_stop = observer(0);
export const event_game_pause_on = observer(0);
export const event_game_pause_off = observer(0);
export const event_shape_drop = observer(0);
export const event_shape_move = observer([0, 0]);
export const event_shape_rotation = observer(0);

export const game_is_running = () => gs_animate_running.v || gs_update_running.v;
export const game_is_updating = () => gs_update_running.v;
export const game_is_animating = () => gs_animate_running.v;

export const game_get_update_timeout = () => gs_update_timeout.v / gs_data_level.v;

//--reactions--//

event_game_pause_on.$subscribe(() => {
  gs_animate_running.$set(false);
  gs_update_running.$set(false);
});

event_game_pause_off.$subscribe(() => {
  gs_animate_running.$set(true);
  gs_update_running.$set(true);
});

event_game_start.$subscribe(() => {
  gs_animate_running.$set(true);
  gs_update_running.$set(true);
});

event_game_over.$subscribe(() => {
  gs_animate_running.$set(false);
  gs_update_running.$set(false);
});

event_animate_merge_start.$subscribe(() => {
  gs_update_running.$set(false);
});

event_animate_merge_stop.$subscribe(() => {
  gs_update_running.$set(true);
});
