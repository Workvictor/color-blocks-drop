import { unit_px } from './css_unit';
import { hsla } from './hsla';
import { join_comma, join_space } from './join';

// export const custom_parameter = (name: string) => '--' + name;
// const token_auto = 'auto';
// const token_scroll = 'scroll';
// const token_solid = 'solid';
// const token_none = 'none';
// const token_unset = 'unset';
// const token_all = 'all';
// const token_contents = 'contents';
// const token_hidden = 'hidden';
// const token_inset = 'inset';
// const token_inherit = 'inherit';
// const token_current_color = 'currentColor';
// const transition_name_1 = 'ease-in-out';
// const font_size = 18;
// const font_step_multiplier = 0.25;
// const font_step_id = {
//   1: font_step_multiplier * 1,
//   2: font_step_multiplier * 2,
//   3: font_step_multiplier * 3,
//   4: font_step_multiplier * 4,
//   5: font_step_multiplier * 5,
//   6: font_step_multiplier * 6,
//   7: font_step_multiplier * 7,
//   8: font_step_multiplier * 8,
//   9: font_step_multiplier * 9,
// };
// const font_title = 'Eczar';
// const font_hand = 'Caveat';
// const font_text = 'Arial';
// const font_spec = 'YanoneKaff';
// const font_mono = 'Fira Code';
// const replace_alpha = (color: ReturnType<typeof hsla>, result_alpha: number) => join_comma(...color.split(',').slice(0, 3), result_alpha + ')');
// const color_grey = [2, 4, 8, 12, 16, 24, 32, 40, 54, 72].map(i => hsla(0, 0, i));
// const color_void = hsla(0, 0, 0);
// const color_primary = hsla(0, 100, 27);
// const color_primary_void = hsla(0, 90, 10);
// const color_secondary = hsla(200, 80, 35);
// const color_accent = hsla(43, 74, 49);
// const color_accent_light = hsla(40, 40, 50);
// const color_attr_health = hsla(82, 93, 23);
// const color_attr_mana = hsla(218, 51, 42);
// const color_attr_stamina = hsla(49, 86, 28);
// const color_attr_exp = hsla(276, 56, 39);
// const color_item_poor = hsla(0, 0, 45);
// const color_item_common = hsla(0, 0, 80);
// const color_item_uncommon = hsla(100, 80, 40);
// const color_item_rare = hsla(225, 100, 40);
// const color_item_epic = hsla(286, 100, 40);
// const color_item_legendary = hsla(29, 100, 40);
// const color_item_artifact = hsla(46, 100, 40);
// const color_background = color_grey[1];
// const color_foreground = color_grey[8];
// const color_accent_05 = replace_alpha(color_accent, 0.5);
// const color_backdrop = replace_alpha(color_grey[0], 0.75);
// const color_highlighter = color_grey[9];
// const color_highlighter_04 = replace_alpha(color_highlighter, 0.4);
// const color_highlighter_03 = replace_alpha(color_highlighter, 0.3);
// const color_highlighter_02 = replace_alpha(color_highlighter, 0.2);
// const color_highlighter_015 = replace_alpha(color_highlighter, 0.15);
// const color_dimmer = replace_alpha(color_void, 0.75);
// const color_background_06 = replace_alpha(color_background, 0.6);
// const radius_global = 4 + unit_px;
// const transition_ms = [0.5, 1, 2, 3, 4, 10, 20, 30].map(i => i * 100 + 'ms');
// const transition = (nm: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7, fn = 'ease-in-out') => join_space(token_all, transition_ms[nm], fn);
// const brightness = (val: number) => `brightness(${val}%)`;
// const saturate = (val: number) => `saturate(${val}%)`;
// const filter_dark = brightness(90);
// const filter_norm = brightness(100);
// const filter_bright = brightness(110);
// const filter_disabled = join_space(brightness(70), saturate(15));
// const border = (w: number, color: string) => join_space(w + unit_px, token_solid, color);
// const border_divider = [border(2, color_dimmer), token_none, border(2, color_highlighter_015), token_none];
// const border_black = border(1, color_void);
// const create_shadow = (x: number, y: number, blur: number, offset: number | null, color: string, use_inset = 0) =>
//   join_space(
//     use_inset ? token_inset : '',
//     ...[x, y, blur, offset]
//       .filter(i => i !== null)
//       .map(i => i + unit_px)
//       .concat(color)
//   );
// const shadow_carve = join_comma(
//   create_shadow(0, -1, 0, 0, color_grey[5], 1),
//   create_shadow(-1, 0, 0, 0, color_grey[4], 1),
//   create_shadow(1, 0, 0, 0, color_grey[4], 1),
//   create_shadow(0, 0, 0, 1, color_void, 1),
//   create_shadow(0, 0, 4, 2, color_void, 1)
// );
// const text_shadow_carve = join_comma(create_shadow(0, -1, 1, null, color_void), create_shadow(0, 1, 1, null, color_grey[4]));
// const shadow_void_60 = create_shadow(0, 0, 60, 0, color_void, 1);
// const shadow_void_30_60_120 = join_comma(
//   create_shadow(0, 0, 30, 0, color_void, 1),
//   create_shadow(0, 0, 60, 0, color_void, 1),
//   create_shadow(0, 0, 120, 0, color_void, 1)
// );
// const shadow_carve_bridge_left = join_comma(create_shadow(1, 0, 0, 0, color_grey[4]), create_shadow(4, 0, 0, 0, color_grey[0]));
// const shadow_carve_bridge_right = join_comma(create_shadow(-1, 0, 0, 0, color_grey[4]), create_shadow(-4, 0, 0, 0, color_grey[0]));
// const shadow_hover_accent = join_comma(create_shadow(0, 1, 6, -1, color_accent_05, 1), create_shadow(0, 0, 5, 0, color_accent_05));
// const shadow_button = join_comma(create_shadow(0, 0, 0, 1, color_void), create_shadow(0, 0, 8, 0, color_void, 1));
// const shadow_button_up = create_shadow(0, 1, 2, 1, color_highlighter_03, 1);
// const shadow_button_down = create_shadow(0, 1, 3, 1, color_grey[1], 1);
// const shadow_track = join_comma(create_shadow(0, 0, 2, 0, color_void, 1), create_shadow(0, 0, 3, 0, color_void, 1));
// const shadow_scroll = create_shadow(0, 0, 10, 2, color_void);
// const shadow_bar = join_comma(
//   create_shadow(0, 0, 2, -1, color_void, 1),
//   create_shadow(0, -2, 4, -2, color_void, 1),
//   create_shadow(0, 2, 4, -2, color_highlighter, 1)
// );

// const transform_fast = css_rule_map.$value_nm(css_key_map.$transform, transition_value_fast, transition_name_1);

export const css_color_gray_4 = hsla(0, 0, 4);
export const css_color_gray_8 = hsla(0, 0, 8);
export const css_color_gray_12 = hsla(0, 0, 12);

// export const css_constants = {
//   $token: {
//     $inherit: token_inherit,
//     $none: token_none,
//     $auto: token_auto,
//     $scroll: token_scroll,
//     $unset: token_unset,
//     $all: token_all,
//     $contents: token_contents,
//     $hidden: token_hidden,
//     $inset: token_inset,
//     $current_color: token_current_color,
//     $solid: token_solid,
//     $pixelated: 'pixelated',
//   },
//   $font: {
//     $size: font_size,
//     $step_id: font_step_id,
//     $family_title: font_title,
//     $family_hand: font_hand,
//     $family_text: font_text,
//     $family_spec: font_spec,
//     $family_mono: font_mono,
//   },
//   $transition_ms: transition_ms,
//   $filter: {
//     $dark: filter_dark,
//     $norm: filter_norm,
//     $bright: filter_bright,
//     $disabled: filter_disabled,
//   },
//   $box_sizing: {
//     $border_box: 'border-box',
//   },
//   $position: {
//     $relative: 'relative',
//     $absolute: 'absolute',
//     $fixed: 'fixed',
//   },
//   $display: {
//     $inline_grid: 'inline-grid',
//     $inline_block: 'inline-block',
//     $grid: 'grid',
//     $block: 'block',
//     $flex: 'flex',
//     $none: token_none,
//   },
//   $align: {
//     $center: 'center',
//     $left: 'left',
//     $end: 'end',
//     $start: 'start',
//     $right: 'right',
//     $space_between: 'space-between',
//     $stretch: 'stretch',
//   },
//   $background_repeat: {
//     $repeat: 'repeat',
//   },
//   $pointer_events: {
//     $none: token_none,
//     $all: 'all',
//   },
//   $color: {
//     $transparent: 'transparent',
//     $grey: color_grey,
//     $void: color_void,
//     $primary: color_primary,
//     $color_primary_void: color_primary_void,
//     $secondary: color_secondary,
//     $accent: color_accent,
//     $accent_light: color_accent_light,
//     $attr_health: color_attr_health,
//     $attr_mana: color_attr_mana,
//     $attr_stamina: color_attr_stamina,
//     $attr_exp: color_attr_exp,
//     $item_poor: color_item_poor,
//     $item_common: color_item_common,
//     $item_uncommon: color_item_uncommon,
//     $item_rare: color_item_rare,
//     $item_epic: color_item_epic,
//     $item_legendary: color_item_legendary,
//     $item_artifact: color_item_artifact,
//     $background: color_background,
//     $foreground: color_foreground,
//     $accent_05: color_accent_05,
//     $backdrop: color_backdrop,
//     $highlighter_02: color_highlighter_02,
//     $highlighter_015: color_highlighter_015,
//     $dimmer: color_dimmer,
//     $background_06: color_background_06,
//   },
//   $shadow: {
//     $carve: shadow_carve,
//     $text_shadow_carve: text_shadow_carve,
//     $shadow_carve_bridge_left: shadow_carve_bridge_left,
//     $shadow_carve_bridge_right: shadow_carve_bridge_right,
//     $shadow_void_60: shadow_void_60,
//     $shadow_void_30_60_120: shadow_void_30_60_120,
//     $hover_accent: shadow_hover_accent,
//     $panel: 'var(--box-shadow-panel)',
//     $elevated: 'var(--box-shadow-elevated)',
//     $divider: 'var(--box-shadow-divider)',
//     $button: shadow_button,
//     $button_up: shadow_button_up,
//     $button_down: shadow_button_down,
//     $track: shadow_track,
//     $scroll: shadow_scroll,
//     $bar: shadow_bar,
//   },
//   $scroll_bar: {
//     $width: 'var(--scroll-bar-width)',
//     $radius: 'var(--scroll-bar-radius)',
//   },
//   $transition_preset: {
//     $bounce: 'all var(--transition-fast) cubic-bezier(0.36, -0.14, 1, 2.13)',
//     $all_fast: 'all var(--transition-fast) ease-in-out',
//     // $transform_fast: transform_fast,
//     $very_fast: transition(0),
//   },
//   $border: {
//     $black: border_black,
//     $divider: border_divider,
//     $radius: radius_global,
//     $style: ['var(--box-border)', '1px inset var(--color-grey4)', '1px solid var(--color-grey0)'],
//   },
// };
