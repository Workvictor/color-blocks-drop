import { use_style_var } from 'src/core/ui/style';
import { css } from 'src/core/utils/css';
import { define_element, gui_element } from 'src/core/utils/element';
import '../../core/ui';
import { gui_canvas } from './gui_canvas';

export class gui_app extends gui_element {
  constructor() {
    super();
    this.$custom.$add_css(css`
      :host {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: ${use_style_var(i => i.color_gray_8)};
      }
    `);
    this.$custom.$append(new gui_canvas());
  }
}

define_element(gui_app);
