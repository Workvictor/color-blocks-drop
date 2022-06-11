import en from './en';

export type text_locale_key = keyof typeof text_data;
export type text_data_type = typeof en;

export const text_data = {
  en,
};
