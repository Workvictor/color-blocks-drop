import { camel_to_kebab } from './camel_to_kebab';
import { CssUnit, unit_em, unit_fr, unit_pc, unit_px, unit_rm, unit_ss, value_unit_pick } from './css_unit';
import { join_min, join_space } from './join';

const selector_host = ':host';
// const selector_active = ':active';
// const selector_hover = ':hover';
// const selector_input = 'input';
// const selector_link = 'a';
// const selector_link_hover = join_min(selector_link, selector_hover);
// const selector_host_slot = join_min(selector_host, '(slot)');
// const selector_host_hover = join_min(selector_host, '(:hover)');
// const selector_host_active = join_min(selector_host, `(${selector_active})`);
// const selector_host_before = join_min(selector_host, '::before');
// const selector_host_after = join_min(selector_host, '::after');
// const selector_host_input = join_space(selector_host, selector_input);
export const selector_slotted = (value: string) => `::slotted(${value})`;

const translate_xy_unit =
  (unit: CssUnit = unit_px) =>
  (x: number, y: number) =>
    `translate(${x + unit}, ${y + unit})`;
const translate_xy_pc = translate_xy_unit(unit_pc);
const translate_center = () => translate_xy_pc(-50, -50);
const scale = (value: number) => `scale(${value})`;

export const css_value_px = value_unit_pick(unit_px);
export const css_value_pc = value_unit_pick(unit_pc);
export const css_value_rm = value_unit_pick(unit_rm);
export const css_value_em = value_unit_pick(unit_em);
export const css_value_fr = value_unit_pick(unit_fr);
export const css_value_ss = value_unit_pick(unit_ss);
export const css_value_nm = value_unit_pick('');
export const css_value_str = join_min;
export const css_value_translate_pc = translate_xy_pc;
export const css_value_translate_center = translate_center;
export const css_value_scale = scale;

export const css_token_absolute = 'absolute';
export const css_token_fixed = 'fixed';
export const css_token_inset = 'inset';
export const css_token_none = 'none';
export const css_token_pixelated = 'pixelated';
export const css_token_top = 'top';

//

const key =
  (key: keyof CSSStyleDeclaration) =>
  (...values: (string | number)[]) =>
    `${camel_to_kebab(key)}:${join_space(...values)};`;

//

export const css_position = key('position');
export const css_top = key('top');
export const css_left = key('left');
export const css_background_color = key('backgroundColor');
export const css_width = key('width');
export const css_height = key('height');
export const css_box_shadow = key('boxShadow');
export const css_transform = key('transform');
export const css_transform_origin = key('transformOrigin');
export const css_border = key('border');
export const css_border_top = key('borderTop');
export const css_image_rendering = key('imageRendering');

//
const selector_rules =
  (selector: string) =>
  (...rules: string[]) =>
    `${selector}{${join_min(...rules)}}`;

export const $_host = selector_rules(selector_host);
export const $_slotted = (selector: string) => selector_rules(selector_slotted(selector));
