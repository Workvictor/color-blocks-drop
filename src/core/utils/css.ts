import { array_each } from './array_utils';

export const css = (tokens: TemplateStringsArray, ...args: (string | number)[]) => {
  let result = '';
	array_each(tokens, (token, index) => {
    result += token + (args[index] || '');
  })
  return result;
};

export const set_global_style = (styleCSS: string) => {
  const styleElem = document.createElement('style');
  styleElem.innerHTML = styleCSS;
  document.head.append(styleElem);
};
