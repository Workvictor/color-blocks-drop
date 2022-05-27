import { get_style_var } from 'src/core/ui/style';
import { canvasCTX } from 'src/core/utils/element';
import main_state from './main_state';

let layer_background: CanvasRenderingContext2D | null = null;

const make_background = () => {
  const { $cell_size, $grid } = main_state;
  const width = $grid.x * $cell_size;
  const height = $grid.y * $cell_size;
  const ctx = canvasCTX(width, height)!;

  ctx.strokeStyle = get_style_var(i => i.color_gray_2);
  ctx.fillStyle = get_style_var(i => i.color_gray_4);
  ctx.fillRect(0, 0, $grid.x * $cell_size, $grid.y * $cell_size);
  for (let row = 1; row < $grid.y; row++) {
    const y = row * $cell_size;
    ctx.moveTo(0, y);
    ctx.lineTo($grid.x * $cell_size, y);
  }
  for (let col = 1; col < $grid.x; col++) {
    const x = col * $cell_size;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, $grid.y * $cell_size);
  }
  ctx.stroke();

  return ctx;
};

export const grid_init = () => {
  layer_background = make_background();
};

export const grid_draw = (ctx: CanvasRenderingContext2D) => {
  if (!layer_background) return;
  ctx.drawImage(layer_background.canvas, 0, 0);
};
