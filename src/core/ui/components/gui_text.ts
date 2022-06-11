import { text_locale_key, text_data_type, text_data } from 'src/core/ui/data/locale';
import { span } from 'src/core/utils/element';

export function gui_text(getter: (data: text_data_type) => string, fabric = span) {
  const elem = fabric();
  const locale: text_locale_key = 'en';
  elem.textContent = getter(text_data[locale]);
  return elem;
}
