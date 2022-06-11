import { CSSKeys } from './css_rule';

const create_grid_style = (column_gap: number, row_gap: number, tmp_col?: string): CSSKeys => ({
  $display: i => i.v.$display.$grid,
  $row_gap: i => i.r.$value_px(row_gap),
  $column_gap: i => i.r.$value_px(column_gap),
  $grid_template_columns: i => tmp_col || i.v.$token.$none,
});

const primary: CSSKeys = {
  $background_color: i => i.v.$color.$primary,
  $color: i => i.v.$color.$accent,
};

const carved: CSSKeys = {
  $border_radius: i => i.v.$border.$radius,
  $box_shadow: i => i.v.$shadow.$carve,
  $padding: i => i.r.$value_px(3, 2),
};

const panel: CSSKeys = {
  $background_color: i => i.v.$color.$grey[2],
  $border_radius: i => i.v.$border.$radius,
  $box_shadow: i => i.v.$shadow.$panel,
  $box_sizing: i => i.v.$box_sizing.$border_box,
  $position: i => i.v.$position.$relative,
};

const elevated_panel: CSSKeys = {
  ...panel,
  $box_shadow: i => i.r.$join_comma(i.v.$shadow.$elevated, i.v.$shadow.$panel),
};

const marble_light: CSSKeys = {
  // $background_image: i => i.v.$img.$marble_light,
  $background_repeat: i => i.v.$background_repeat.$repeat,
};
