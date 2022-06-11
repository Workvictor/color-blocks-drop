import { gui_block } from 'src/core/ui/components/gui_block';
import { gui_button_primary } from 'src/core/ui/components/gui_button_primary';
import { gui_text } from 'src/core/ui/components/gui_text';
import { css } from 'src/core/utils/css';
import { css_color_gray_8, css_color_gray_8_05 } from 'src/core/utils/css_constants';
import { define_element, gui_element } from 'src/core/utils/element';
import { enum_game_scene, event_game_pause_on, event_game_start, gs_scene } from '../game_state';

export class gui_title_scene extends gui_element {
  constructor() {
    super();

    const self = this;

    gs_scene.$subscribe(scene => {
      const ind = scene === enum_game_scene.title ? 1 : 0;
      self.$custom.$set_style(css`
        z-index: ${ind};
      `);
    });

    self.$custom.$add_css(css`
      :host {
        position: absolute;
        top: 0;
        left: 0;
        background-color: ${css_color_gray_8_05};
        width: 100%;
        height: 100%;
        z-index: 1;
				backdrop-filter: blur(10px);
      }
    `);

    const menu = new gui_block();
    menu.$custom.$add_css(css`
      :host {
        background-color: ${css_color_gray_8};
        width: 12rem;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
      }
    `);

    const play_btn = new gui_button_primary(gui_text(i => i['txt-0']));
    play_btn.$custom.$on_click(() => {
      gs_scene.$set(enum_game_scene.game);
      event_game_start.$broadcast();
    });

    const pause_btn = new gui_button_primary(gui_text(i => i['txt-4']));
    pause_btn.$custom.$on_click(() => {
      gs_scene.$set(enum_game_scene.title);
      event_game_pause_on.$broadcast();
    });

    menu.$custom.$append(play_btn, pause_btn);
    self.$custom.$append(menu);
  }
}

define_element(gui_title_scene, module.id);
