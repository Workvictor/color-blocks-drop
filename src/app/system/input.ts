import { Observer } from 'src/core/utils/observer';
import { Vector } from 'src/core/utils/vector';

const key_code_move_x = new Map<string, number>();
key_code_move_x.set('KeyA', -1);
key_code_move_x.set('KeyD', +1);

const key_code_move_y = new Map<string, number>();
key_code_move_y.set('KeyS', +1);
key_code_move_y.set('Space', +1);

const key_code_rotate = new Map<string, number>();
key_code_rotate.set('KeyW', +1);
key_code_rotate.set('KeyQ', -1);
key_code_rotate.set('KeyE', +1);

const key_timeout = 50;
let key_time = Date.now();

export const on_input_change = new Observer({ move_vector: new Vector(0, 0), rotate_dir: 0 });

const keyup = ({ code }: KeyboardEvent) => {
  if (key_time > Date.now()) return;
  key_time = Date.now() + key_timeout;

  on_input_change.$set(prev => {
    prev.move_vector.xy = [key_code_move_x.get(code) || 0, key_code_move_y.get(code) || 0];
    prev.rotate_dir = key_code_rotate.get(code) || 0;
    return prev;
  });
};

window.addEventListener('keyup', keyup);
