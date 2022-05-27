import { use_style_var } from 'src/core/ui/style';
import { css } from 'src/core/utils/css';
import { define_element, gui_element } from 'src/core/utils/element';
import main_state from '../main_state';

export class gui_canvas extends gui_element {
  constructor() {
    super();
    this.$custom.$add_css(css`
      :host,
      ::slotted(canvas) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      ::slotted(canvas) {
        background-color: ${use_style_var(i => i.color_gray_4)};
        border: 1px solid ${use_style_var(i => i.color_gray_12)};
				border-style: inset;
        border-top: none;
				image-rendering: pixelated;
      }
    `);

    const { $main_ctx } = main_state;
    this.append($main_ctx.canvas);
  }
}

define_element(gui_canvas);
