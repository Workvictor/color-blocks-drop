import { css } from 'src/core/utils/css';
import { define_element, gui_element } from 'src/core/utils/element';

export class gui_rect extends gui_element {
  constructor(x: number, y: number, width: number, height: number) {
    super();
    const self = this;

    self.$custom.$add_css(css`
      :host {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `);
  }
}

define_element(gui_rect, module.id);
