import { define_element, gui_element } from 'src/core/utils/element';
import { css } from 'src/core/utils/css';
import { use_style_var } from 'src/core/ui/style';

export class gui_popup extends gui_element {
  $visibility_style = this.$custom.$add_host_css(css`
    display: none;
  `);

  constructor(...nodes: App.Children) {
    super(...nodes);
    this.$custom.$add_host_css(css`
      padding: 2px 4px;
      box-shadow: 0 6px 14px 4px ${use_style_var(i => i.color_dimmer)};
      position: fixed;
      color: ${use_style_var(i => i.color_gray_40)};
    `);
    this.$toggle_visibility(true);
  }

  $toggle_visibility(visibility: boolean = true) {
    this.$custom.$toggle_style(this.$visibility_style, visibility);
  }
}

define_element(gui_popup);
