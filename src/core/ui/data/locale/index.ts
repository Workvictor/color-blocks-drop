import RU from './ru';

export type text_locale_key = keyof typeof text_data;
export type text_data_type = typeof RU;

export const text_data = {
  RU,
};
