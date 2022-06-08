export const conf_shadow_alpha = 0.3;
export const conf_shadow_blur = 24;
export const conf_block_size = 16;
export const conf_grid_size = [10, 24];
export const conf_game_scale = 2;
export const game_input_timeout = 50;

export const conf_get_game_width = () => conf_grid_size[0] * conf_block_size;
export const conf_get_game_height = () => conf_grid_size[1] * conf_block_size;
