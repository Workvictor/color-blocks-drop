import { define_element, gui_element } from 'src/core/utils/element';

export class gui_block extends gui_element {
  constructor(...nodes: App.Children) {
    super(...nodes);
  }
}

define_element(gui_block);
