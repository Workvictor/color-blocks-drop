import { HSLA } from 'src/core/utils/hsla';
import { shape_list } from './shape_view';

export const main_colors = new Array<[color: HSLA, offset: number]>(shape_list.length)
  .fill([new HSLA(0, 85, 45), (360 / shape_list.length) | 0])
  .map(([start_hsla, color_offset], index) => start_hsla.$hue(index * color_offset).$value);
