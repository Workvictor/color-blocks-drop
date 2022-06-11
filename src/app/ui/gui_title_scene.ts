import { css } from 'src/core/utils/css';
import { define_element, gui_element } from 'src/core/utils/element';

export class gui_title_scene extends gui_element {
  constructor() {
    super();

    const self = this;

    self.$custom.$add_css(css`
      :host {
        position: absolute;
        top: 0;
        left: 0;
        /* background-color: #000; */
        width: 100%;
        height: 100%;
      }
    `);
  }
}

define_element(gui_title_scene, module.id);
