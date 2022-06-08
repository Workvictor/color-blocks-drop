import { use_style_var } from 'src/core/ui/style';
import { css } from 'src/core/utils/css';
import { define_element, gui_element } from 'src/core/utils/element';
import '../../core/ui';

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
        min-width: 1024px;
        min-height: 768px;
      }
      ::slotted(canvas) {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        background-color: ${use_style_var(i => i.color_gray_4)};
        border: 1px solid ${use_style_var(i => i.color_gray_12)};
        border-style: inset;
        border-top: none;
        image-rendering: pixelated;
      }
    `);
  }
}

define_element(gui_app);
