import { define_element } from 'src/core/utils/element';
import { css } from 'src/core/utils/css';
import { use_style_var } from 'src/core/ui/style';
import { gui_button } from './gui_button';

export class gui_button_success extends gui_button {
  constructor(...nodes: App.Children) {
    super(...nodes);
    this.$custom.$add_css(css`
      :host {
        background-color: ${use_style_var(i => i.color_success)};
        color: ${use_style_var(i => i.color_success_active)};
        box-shadow: 0 2px 0 ${use_style_var(i => i.color_success_dark)},
          inset 0 1px 2px -1px ${use_style_var(i => i.color_success_active)};
      }
    `);
  }
}

define_element(gui_button_success);
