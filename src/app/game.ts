import { raf } from 'src/core/utils/raf';
import {
  event_game_start,
  game_is_running,
  event_game_update,
  event_game_draw,
  game_is_animating,
  event_shape_drop,
  event_animate_merge_stop,
  game_get_update_timeout,
  event_game_pause_off,
} from './game_state';
import { shape_init } from './shape';
import { game_input_init } from './game_input';
import { timer } from 'src/core/utils/timer';

export const game_init = () => {
  const time_to_update = timer(game_get_update_timeout());

  const update_timer = () => time_to_update(performance.now() + game_get_update_timeout());

  const loop = () => {
    raf(loop);

    if (game_is_running() && time_to_update()) event_game_update.$broadcast();

    if (game_is_animating()) event_game_draw.$broadcast();
  };

  event_shape_drop.$subscribe(update_timer);
  event_animate_merge_stop.$subscribe(update_timer);
  event_game_start.$subscribe(update_timer);
  event_game_pause_off.$subscribe(update_timer);

  game_input_init();
  shape_init();
  raf(loop);
};
