import { game_set_ctx, game_start } from './app/game';
import { gui_app } from './app/ui/gui_app';
import './index.css';

const app_ui = new gui_app();

document.body.append(app_ui);

game_set_ctx(app_ui);
game_start();
