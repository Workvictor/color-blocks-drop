import { css, set_global_style } from '../utils/css';
import { hsla } from '../utils/hsla';
import { get_var_token } from '../utils/token';

const unit_sec = (value: number) => `${value}s`;
const brightness = (value: number) => `brightness(${value}%)`;

const prop_map: string[][] = [];
const define_prop = (value: string) => {
  const key = get_var_token();
  prop_map.push([key, value]);
  return key;
};

const style_var = {
  color_gray_0: define_prop(hsla(0, 0, 0)),
  color_gray_2: define_prop(hsla(0, 0, 2)),
  color_gray_4: define_prop(hsla(0, 0, 4)),
  color_gray_6: define_prop(hsla(0, 0, 6)),
  color_gray_8: define_prop(hsla(0, 0, 8)),
  color_gray_12: define_prop(hsla(0, 0, 12)),
  color_gray_16: define_prop(hsla(0, 0, 16)),
  color_gray_24: define_prop(hsla(0, 0, 24)),
  color_gray_32: define_prop(hsla(0, 0, 32)),
  color_gray_40: define_prop(hsla(0, 0, 40)),
  color_gray_54: define_prop(hsla(0, 0, 54)),
  color_gray_72: define_prop(hsla(0, 0, 72)),

  color_white: define_prop(hsla(0, 0, 100)),

  color_common: define_prop(hsla(60, 17, 75)),
  color_common_light: define_prop(hsla(60, 29, 84)),
  color_common_dark: define_prop(hsla(60, 9, 50)),

  color_dimmer: define_prop(hsla(0, 0, 0, 0.75)),
  color_highlighter: define_prop(hsla(0, 0, 72, 0.3)),

  color_accent: define_prop(hsla(43, 74, 49)),

  color_primary: define_prop(hsla(0, 100, 27)),
  color_primary_dark: define_prop(hsla(0, 100, 10)),
  color_primary_active: define_prop(hsla(0, 100, 67)),

  color_success: define_prop(hsla(118, 71, 27)),
  color_success_dark: define_prop(hsla(118, 71, 10)),
  color_success_active: define_prop(hsla(118, 57, 76)),

  color_sucondary: define_prop(hsla(200, 80, 35)),
  color_sucondary_dark: define_prop(hsla(200, 45, 30)),
  color_sucondary_active: define_prop(hsla(193, 39, 12)),

  transition_xs: define_prop(unit_sec(0.025)),
  transition_sm: define_prop(unit_sec(0.075)),
  transition_md: define_prop(unit_sec(0.15)),
  transition_lg: define_prop(unit_sec(0.3)),
  transition_xl: define_prop(unit_sec(0.4)),
  transition_xxl: define_prop(unit_sec(0.8)),

  filter_dark: define_prop(brightness(90)),
  filter_norm: define_prop(brightness(100)),
  filter_bright: define_prop(brightness(110)),
  filter_bright_2: define_prop(brightness(120)),
};

const css_variables = prop_map.reduce((acc, [key, value]) => acc + `${key}:${value};`, '');

type TypeOfStyle = typeof style_var;

export const use_style_var = (varName: (styleVarObj: TypeOfStyle) => TypeOfStyle[keyof TypeOfStyle]) =>
  `var(${varName(style_var)})`;

export const get_style_var = (varName: (styleVarObj: TypeOfStyle) => TypeOfStyle[keyof TypeOfStyle]) =>
  getComputedStyle(document.body).getPropertyValue(varName(style_var));

set_global_style(css`
  :root {
    ${css_variables}
  }

  body {
    background-color: ${use_style_var(i => i.color_gray_2)};
    color: ${use_style_var(i => i.color_gray_24)};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: ${use_style_var(i => i.color_gray_2)};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${use_style_var(i => i.color_gray_12)};
    border: 2px solid ${use_style_var(i => i.color_gray_2)};
  }

  ::-webkit-scrollbar-corner {
    background-color: ${use_style_var(i => i.color_gray_2)};
  }
`);
