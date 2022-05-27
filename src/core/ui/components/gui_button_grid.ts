import { define_element, gui_element } from 'src/core/utils/element';
import { css } from 'src/core/utils/css';
import { use_style_var } from 'src/core/ui/style';

export class gui_button_grid extends gui_element {
  constructor(...nodes: App.Children) {
    super(...nodes);
    this.$custom.$add_css(css`
      :host {
        padding: 2px;
        display: inline-flex;
        row-gap: 2px;
        column-gap: 2px;
        background-color: ${use_style_var(i => i.color_gray_2)};
      }
    `);
  }
}

define_element(gui_button_grid);
