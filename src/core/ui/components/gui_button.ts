import { define_element, gui_element } from 'src/core/utils/element';
import { css } from 'src/core/utils/css';
import { use_style_var } from 'src/core/ui/style';

export class gui_button extends gui_element {
  private $activeButtonStyleFilter = css`
    filter: ${use_style_var(i => i.filter_bright_2)};
  `;

  constructor(...nodes: App.Children) {
    super(...nodes);
    this.$custom.$add_css(css`
      :host {
        display: inline-block;
        text-align: center;
        color: inherit;
        font-size: inherit;
        outline: none;
        line-height: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        background-color: ${use_style_var(i => i.color_gray_24)};
        color: ${use_style_var(i => i.color_gray_72)};
        border: none;
        height: auto;
        padding: 0.5rem 1rem;
        filter: var(--ftr-norm);
        transform: translateY(-2px);
        will-change: contents;
        transition: ${use_style_var(i=>i.transition_xs)};
        box-shadow: 0 2px 0 ${use_style_var(i => i.color_gray_8)},
          inset 0 1px 2px -1px ${use_style_var(i => i.color_gray_54)};
      }

      :host(:hover) {
        ${this.$activeButtonStyleFilter}
      }

      :host(:active) {
        box-shadow: 0 0 0 transparent, inset 0 0 2px ${use_style_var(i => i.color_gray_2)};
        transform: translateY(0px);
      }
    `);
  }
}

define_element(gui_button);
