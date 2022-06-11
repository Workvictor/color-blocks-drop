import { define_element, gui_element } from 'src/core/utils/element';
import { use_throttle } from 'src/core/utils/use_throttle';
import { conf_game_height, conf_game_width, conf_get_scale, game_ctx } from '../game_state';
import '../../core/ui';
import {
  css_background_color,
  css_height,
  css_left,
  css_position,
  css_top,
  css_width,
  $_host,
  css_token_fixed,
  css_value_pc,
  css_value_px,
  css_transform,
  css_value_translate_pc,
  css_value_scale,
  $_slotted,
  css_token_absolute,
  css_border,
  css_token_inset,
  css_border_top,
  css_token_none,
  css_image_rendering,
  css_token_pixelated,
  css_transform_origin,
  css_token_top,
} from 'src/core/utils/css_rule';
import { css_color_gray_12, css_color_gray_4, css_color_gray_8 } from 'src/core/utils/css_constants';
import { gui_title_scene } from './gui_title_scene';

export class gui_app extends gui_element {
  constructor() {
    super();

    const self = this;

    self.$custom.$style(
      $_host(
        //
        css_position(css_token_fixed),
        css_top(0),
        css_left(css_value_pc(50)),
        css_background_color(css_color_gray_8),
        css_width(css_value_px(conf_game_width)),
        css_height(css_value_px(conf_game_height)),
        css_transform_origin(css_token_top)
      ),
      $_slotted('canvas')(
        //
        css_position(css_token_absolute),
        css_top(0),
        css_left(css_value_pc(50)),
        css_background_color(css_color_gray_4),
        css_transform(css_value_translate_pc(-50, 0)),
        css_border(css_value_px(1), css_token_inset, css_color_gray_12),
        css_border_top(css_token_none),
        css_image_rendering(css_token_pixelated)
      )
    );

    const set_scale = use_throttle<UIEvent>(300, () => {
      const scale = conf_get_scale();
      const next_style = css_transform(css_value_translate_pc(-50, 0), css_value_scale(scale));
      self.$custom.$style_inline(next_style);
    });

    set_scale();

    window.addEventListener('resize', set_scale);

    self.$custom.$append(new gui_title_scene());
    self.$custom.$append(game_ctx.canvas);

		document.title = app_title;

    if (dev_mode) {
      document.title = `dev_mode: ${app_ver} ${app_title}`;
    }
  }
}

define_element(gui_app, module.id);
