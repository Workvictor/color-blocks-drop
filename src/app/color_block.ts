import { ctx2d } from 'src/core/utils/element';
import { hsla } from 'src/core/utils/hsla';
import { color_block_border } from './color_block_border';
import { conf_block_size, conf_shadow_alpha, conf_shadow_blur } from './game_config';
import { shapes_get_base_count } from './shapes';

const block_width = conf_block_size + conf_shadow_blur * 2;
const block_center = block_width / 2 - conf_block_size / 2;

export const color_block = (fill_style: string, shadow_color: string) => {
  const ctx = ctx2d(block_width)!;
  ctx.shadowBlur = conf_shadow_blur;
  ctx.fillStyle = fill_style;
  ctx.shadowColor = shadow_color;
  ctx.fillRect(block_center, block_center, conf_block_size, conf_block_size);
  ctx.save();
  ctx.globalCompositeOperation = 'overlay';
  ctx.drawImage(color_block_border, block_center, block_center);
  ctx.restore();
  return ctx.canvas;
};

export const color_block_calc_pos = (row: number, col: number): [number, number] => [
  col * conf_block_size - block_center,
  row * conf_block_size - block_center,
];

const color_blocks: HTMLCanvasElement[] = [];
const base_count = shapes_get_base_count();
const color_offset = (360 / base_count) | 0;
const with_alpha = (a: number) => (i: number) => hsla(i * color_offset, 80, 45, a);
const fill_color = with_alpha(1);
const shadow_color = with_alpha(conf_shadow_alpha);

for (let i = 0; i < base_count; i++) {
  color_blocks[i] = color_block(fill_color(i), shadow_color(i));
}

export const color_block_draw = (ctx: CTX, color_id: number, col: number, row: number) =>
  ctx.drawImage(color_blocks[color_id], ...color_block_calc_pos(row, col));
