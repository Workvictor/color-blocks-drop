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

// const value_px = value_unit_pick(unit_px);
// const value_pc = value_unit_pick(unit_pc);
// const value_rm = value_unit_pick(unit_rm);
// const value_em = value_unit_pick(unit_em);
// const value_fr = value_unit_pick(unit_fr);
// const value_ss = value_unit_pick(unit_ss);
// const value_nm = value_unit_pick('');
// const value_str = (...values: string[]) => join_space(...values.map(i => i));
const translate_xy_unit =
  (unit: CssUnit = unit_px) =>
  (x: number, y: number) =>
    `translate(${x + unit}, ${y + unit})`;
// const translate_xy_px = translate_xy_unit(unit_px);
const translate_xy_pc = translate_xy_unit(unit_pc);
const translate_center = () => translate_xy_pc(-50, -50);
const scale = (value: number) => `scale(${value})`;
// const scale_center = (scale_val: number = 1) => join_space(translate_center(), scale(scale_val));
// const rotate = (value: number) => `rotate(${value}deg)`;

// export const css_rule_map = {
//   $grayscale: (val: number) => `grayscale(${val})`,
//   $var: (val: string) => `var(${val})`,
//   $calc: (val: string) => `calc(${val})`,
//   $minus: (a: string, b: string) => `${a} - ${b}`,
//   $join: join_space,
//   $join_comma: join_comma,
//   $value_px: value_px,
//   $value_pc: value_pc,
//   $value_rm: value_rm,
//   $value_nm: value_nm,
//   $value_em: value_em,
//   /**
//    * секунды
//    */
//   $value_ss: value_ss,
//   $value_fr: value_fr,
//   $value_str: value_str,
//   $translate_xy_px: translate_xy_px,
//   $translate_xy_pc: translate_xy_pc,
//   $scale: scale,
//   $rotate: rotate,
//   $translate_center: translate_center,
//   $scale_center: scale_center,
// };

// const css_style_key = (key: keyof CSSStyleDeclaration) => camel_to_kebab(key as string);
// export const css_key_map = {
//   $transform_origin: css_style_key('transformOrigin'),
//   $opacity: css_style_key('opacity'),
//   $padding: css_style_key('padding'),
//   $margin: css_style_key('margin'),
//   $overflow: css_style_key('overflow'),
//   $visibility: css_style_key('visibility'),
//   $text_align: css_style_key('textAlign'),
//   $text_shadow: css_style_key('textShadow'),
//   $transform: css_style_key('transform'),
//   $will_change: css_style_key('willChange'),
//   $font_size: css_style_key('fontSize'),
//   $line_height: css_style_key('lineHeight'),
//   $font_family: css_style_key('fontFamily'),
//   $letter_spacing: css_style_key('letterSpacing'),
//   $position: css_style_key('position'),
//   $filter: css_style_key('filter'),
//   $box_shadow: css_style_key('boxShadow'),
//   $box_sizing: css_style_key('boxSizing'),
//   $width: css_style_key('width'),
//   $max_width: css_style_key('maxWidth'),
//   $min_width: css_style_key('minWidth'),
//   $height: css_style_key('height'),
//   $min_height: css_style_key('minHeight'),
//   $top: css_style_key('top'),
//   $right: css_style_key('right'),
//   $left: css_style_key('left'),
//   $bottom: css_style_key('bottom'),
//   $content: css_style_key('content'),
//   $transition: css_style_key('transition'),
//   $border: css_style_key('border'),
//   $border_top: css_style_key('borderTop'),
//   $border_bottom: css_style_key('borderBottom'),
//   $outline: css_style_key('outline'),
//   $color: css_style_key('color'),
//   $border_radius: css_style_key('borderRadius'),
//   $display: css_style_key('display'),
//   $grid_template_columns: css_style_key('gridTemplateColumns'),
//   $grid_template_rows: css_style_key('gridTemplateRows'),
//   $align_items: css_style_key('alignItems'),
//   $justify_items: css_style_key('justifyItems'),
//   $justify_content: css_style_key('justifyContent'),
//   $column_gap: css_style_key('columnGap'),
//   $row_gap: css_style_key('rowGap'),
//   $background_color: css_style_key('backgroundColor'),
//   $background: css_style_key('background'),
//   $background_image: css_style_key('backgroundImage'),
//   $background_size: css_style_key('backgroundSize'),
//   $background_position_x: css_style_key('backgroundPositionX'),
//   $background_repeat: css_style_key('backgroundRepeat'),
//   $z_index: css_style_key('zIndex'),
//   $pointer_events: css_style_key('pointerEvents'),
//   $transition_duration: css_style_key('transitionDuration'),
//   $image_rendering: css_style_key('imageRendering'),
// };
// type CCSKeyMap = typeof css_key_map;

// export type CssVariable = (css_variables: typeof css_constants) => string | number;
// export type RuleCreator = (rules: typeof css_rule_map, css_variables: typeof css_constants) => string | number;
// export type RuleCreatorObj = (o: { r: typeof css_rule_map; v: typeof css_constants }) => string | number;

// const is_rule_creator = (rule: any): rule is RuleCreatorObj => true;

// const create_rule = (fn: RuleCreator) => `${fn(css_rule_map, css_constants)};`;

// export type StyleCreator = (keys: typeof css_key_map, rules: typeof css_rule_map, css_variables: typeof css_constants) => Record<string, string | number>;

// export const create_style = (fn: StyleCreator) => Object.entries(fn(css_key_map, css_rule_map, css_constants)).map(([key, value]) => `${key}:${value};`);

// export const create_style_string = (fn: StyleCreator) => create_style(fn).join('');

// const create_selector_rules = (selector: string, rules: string) => `${selector}{${rules}}`;

// export const css_selectors = {
//   $host: selector_host,
//   $slot: 'slot',
//   $host_slot: selector_host_slot,
//   $host_hover: selector_host_hover,
//   $host_input: selector_host_input,
//   $host_before: selector_host_before,
//   $host_after: selector_host_after,
//   $host_active: selector_host_active,
//   $link: selector_link,
//   $link_hover: selector_link_hover,
//   // $slotted: selector_slotted,
// };

// type CSSSelector = typeof css_selectors;
// type SelectorKey<T> = Partial<{ [key in keyof CSSSelector]: T }>;
// type Rule = RuleCreatorObj | string | number | undefined;
// export type CSSKeys = Partial<{ [key in keyof CCSKeyMap]: Rule }>;
// export type CssRules = CSSKeys & Record<string, Rule>;

// export const inline_style = (values: CssRules) => {
//   return Object.entries(values)
//     .map(
//       ([rule_name, rule]) =>
//         `${css_key_map[rule_name as keyof CCSKeyMap] || rule_name}:${typeof rule === 'function' ? rule({ r: css_rule_map, v: css_constants }) : rule};`
//     )
//     .join('');
// };

// export const create_style_node = (styles: SelectorKey<CssRules> & Record<string, CssRules>) => {
//   return Object.entries(styles)
//     .map(([key, values = {}]) => {
//       const t = css_selectors[key as keyof typeof css_selectors] || key;
//       return create_selector_rules(t, inline_style(values));
//     })
//     .join('');
// };

// const rule_creator = (creator: Rule) => (is_rule_creator(creator) ? creator({ r: css_rule_map, v: css_constants }) : creator);

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
  (...values: (string|number)[]) =>
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
