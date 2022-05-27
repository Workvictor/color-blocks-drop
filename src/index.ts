import { main } from './app/main';
import { gui_app } from './app/ui/gui_app';
import './index.css';

const app_ui = new gui_app();

document.body.append(app_ui);

main();
