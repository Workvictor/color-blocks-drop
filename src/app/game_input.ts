import { map } from 'src/core/utils/map_util';
import { vector_update } from 'src/core/utils/vector';
import { gs_is_running, gs_key_timeout, event_shape_drop, event_shape_move, event_shape_rotation } from './game_state';

export const game_input_init = () => {
  const key_move_x = map<string, number>();
  key_move_x.set('KeyA', -1);
  key_move_x.set('KeyD', +1);

  const key_move_y = map<string, number>();
  key_move_y.set('KeyS', +1);

  const key_drop = map<string, number>();
  key_drop.set('Space', +1);

  const key_rotate = map<string, number>();
  key_rotate.set('KeyW', +1);
  key_rotate.set('KeyQ', -1);
  key_rotate.set('KeyE', +1);

  let key_time = 0;

  const process_keys = (move_x?: number, move_y?: number, rotation?: number, drop_key?: number) => {
    if (move_x || move_y) {
      event_shape_move.$set_f(vector_update([move_x || 0, move_y || 0]));
    }

    if (rotation) {
      event_shape_rotation.$set(rotation);
    }

    if (drop_key) {
      event_shape_drop.$set(0);
    }
  };

  const process_key = ({ code, timeStamp }: KeyboardEvent) => {
    if (!gs_is_running() || key_time > timeStamp) return;
    key_time = timeStamp + gs_key_timeout.v;

    const keys = [key_move_x, key_move_y, key_rotate, key_drop].map(i => i.get(code));
    process_keys(...keys);
  };

  window.addEventListener('keyup', process_key);
};
