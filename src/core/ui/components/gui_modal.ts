import { define_element } from 'src/core/utils/element';
import { css } from 'src/core/utils/css';
import { gui_popup } from './gui_popup';
import { gui_block } from './gui_block';
import { gui_button } from './gui_button';
import { gui_button_grid } from './gui_button_grid';
import { Observer } from 'src/core/utils/observer';
import { gui_text } from './gui_text';
import { gui_button_primary } from './gui_button_primary';
import { gui_button_success } from './gui_button_success';
import { use_style_var } from 'src/core/ui/style';

export class gui_modal extends gui_popup {
  $header = new gui_block();
  $title = new gui_block();
  $body = new gui_block();
  $footer = new gui_block();

  $close_btn = new gui_button_primary('X');
  $ok_btn = new gui_button_success(gui_text(i => i['txt-1']));
  $cancel_btn = new gui_button(gui_text(i => i['txt-2']));

  constructor(public $visibility: Observer<boolean>, ...nodes: App.Children) {
    super();

    this.$visibility.$subscribe(visible => {
      this.$toggle_visibility(!visible);
    });

    this.$custom.$add_host_css(css`
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0;
      border: 2px solid ${use_style_var(i => i.color_gray_2)};
			width: 220px;
    `);
    this.$header.$custom.$add_host_css(css`
      display: flex;
      justify-content: space-between;
    `);
    this.$title.$custom.$add_host_css(css`
      padding: 4px 4px 0 8px;
    `);
    this.$body.$custom.$add_host_css(css`
      padding: 8px;
    `);
    this.$footer.$custom.$add_host_css(css`
      margin: 0 -2px -2px -2px;
      display: flex;
      justify-content: space-between;
    `);

    const close_btn_cnt = new gui_button_grid(this.$close_btn);
    close_btn_cnt.$custom.$add_host_css(css`
      margin: -2px -2px 0 0;
    `);

    this.$close_btn.$custom.$on_click(() => {
      this.$visibility.$set(false);
    });
    this.$cancel_btn.$custom.$on_click(() => {
      this.$visibility.$set(false);
    });
    const cancel_btn_cnt = new gui_button_grid(this.$cancel_btn);
    const ok_btn_cnt = new gui_button_grid(this.$ok_btn);

    this.$header.$custom.$append(this.$title, close_btn_cnt);
    this.$footer.$custom.$append(cancel_btn_cnt, ok_btn_cnt);
    this.$body.$custom.$append(...nodes);
    this.$custom.$append(this.$header, this.$body, this.$footer);
  }
}

define_element(gui_modal);
