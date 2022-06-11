import { raf } from 'src/core/utils/raf';
import { event_game_start, gs_update_timeout, gs_is_running, event_game_update, event_game_draw, gs_is_animating, event_shape_drop, event_animate_merge_stop } from './game_state';
import { shape_init } from './shape';
import { game_input_init } from './game_input';
import { timer } from 'src/core/utils/timer';

export const game_init = () => {
  const time_to_update = timer(gs_update_timeout.v);

  const loop = () => {
    raf(loop);

    if (gs_is_running() && time_to_update()) event_game_update.$broadcast();

    if (gs_is_animating()) event_game_draw.$broadcast();
  };

  event_shape_drop.$subscribe(() => time_to_update(performance.now() + gs_update_timeout.v));
  event_animate_merge_stop.$subscribe(() => time_to_update(performance.now() + gs_update_timeout.v));

  game_input_init();
  shape_init();
  raf(loop);

  event_game_start.$broadcast();
};
