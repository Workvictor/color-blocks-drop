import { use_style_var } from 'src/core/ui/style';
import { css } from 'src/core/utils/css';
import { define_element, gui_element } from 'src/core/utils/element';

export class gui_panel extends gui_element {
  constructor(...nodes: App.Children) {
    super(...nodes);
    this.$custom.$add_css(css`
      :host {
        background-color: ${use_style_var(i => i.color_gray_8)};
      }
    `);
  }
}

define_element(gui_panel);
