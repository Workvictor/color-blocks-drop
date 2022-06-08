import { game_is_paused } from './game';
import { shape_drop, shape_move, shape_rotate } from './shape';

export const game_input_init = () => {
  const key_move_x = new Map<string, number>();
  key_move_x.set('KeyA', -1);
  key_move_x.set('KeyD', +1);

  const key_move_y = new Map<string, number>();
  key_move_y.set('KeyS', +1);

  const key_drop = new Map<string, number>();
  key_drop.set('Space', +1);

  const key_rotate = new Map<string, number>();
  key_rotate.set('KeyW', +1);
  key_rotate.set('KeyQ', -1);
  key_rotate.set('KeyE', +1);

  let key_timeout = 50;
  let key_time = 0;

  const process_keys = (move_x?: number, move_y?: number, rotation?: number, drop_key?: number) => {
    if (move_x || move_y) {
      shape_move(move_x || 0, move_y || 0);
    }

    if (rotation) {
      shape_rotate(rotation);
    }

    if (drop_key) {
      shape_drop();
    }
  };

  const process_key = ({ code, timeStamp }: KeyboardEvent) => {
    if (game_is_paused()) return;

    if (key_time > timeStamp) return;
    key_time = timeStamp + key_timeout;

    const keys = [key_move_x, key_move_y, key_rotate, key_drop].map(i => i.get(code));
    process_keys(...keys);
  };

  window.addEventListener('keyup', process_key);
};
