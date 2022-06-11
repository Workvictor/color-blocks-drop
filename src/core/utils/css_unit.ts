import { join_space } from './join';

export const unit_px = 'px';
export const unit_pc = '%';
export const unit_nm = '';
export const unit_rm = 'rem';
export const unit_em = 'em';
export const unit_fr = 'fr';
export const unit_ss = 's';
export type CssUnit =
  | typeof unit_px
  | typeof unit_pc
  | typeof unit_rm
  | typeof unit_nm
  | typeof unit_em
  | typeof unit_ss
  | typeof unit_fr;

/**
 * join space
 */
export const value_unit_pick =
  (unit: CssUnit) =>
  (...values: (number | string)[]) =>
    join_space(...values.map(i => i + unit));
