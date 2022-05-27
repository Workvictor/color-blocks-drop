import { canvasCTX } from 'src/core/utils/element';
import { Vector } from 'src/core/utils/vector';

export default {
  $main_ctx: canvasCTX()!,
  $initial_size: 32,
  $scale: 2,
  get $cell_size() {
    return this.$initial_size / this.$scale;
  },
  $grid: new Vector(14, 22),
};
