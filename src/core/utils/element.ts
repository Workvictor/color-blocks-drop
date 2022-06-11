import { css } from './css';
import { css_value_str } from './css_rule';
import { map } from './map_util';
import { observer } from './observer';

declare global {
  namespace App {
    type Children = (string | Node | null | undefined | number)[];
  }
}

const not_nullish = <T>(value: T) => value !== null && value !== undefined;

let to_html_string = (child: any) => (not_nullish(child) ? String(child) : '');

let is_node = (child: any): child is Node => (child as Node) && true;

export let stringify_children = (children: App.Children) => {
  return children.map(child => (is_node(child) ? child : to_html_string(child)));
};

function make_element<K extends keyof HTMLElementTagNameMap>(tagName: K) {
  return (children?: App.Children) => {
    const element = document.createElement(tagName);

    if (children) {
      element.append(...stringify_children(children));
    }

    return element;
  };
}

export const span = make_element('span');
export const head = make_element('head');
export const style = make_element('style');
export const slot = make_element('slot');
export const canvas = make_element('canvas');
export const ctx2d = (w = 64, h?: number) => {
  const ctx = canvas().getContext('2d');
  if (ctx) {
    ctx.canvas.width = w;
    ctx.canvas.height = h || w;
    ctx.imageSmoothingEnabled = false;
  }
  return ctx;
};

const elementNameMap = map<string, string>();

export const unitPX = (value: number) => `${value}px`;
export const unitPC = (value: number) => `${value}%`;
export const unitEM = (value: number) => `${value}em`;

type UnitFunction = typeof unitPX | typeof unitPC | typeof unitEM;

const custom_props_v2 = <T extends HTMLElement>(context: T) => {
  const $connected = observer(false);
  const $head = head();
  const $slot = slot();
  const $id = (id?: string) => {
    id && context.setAttribute('gui-id', id);
  };

  const $on_click = (cb: () => void) => (context.onclick = cb);

  const $append = (...nodes: App.Children) => {
    context.append(...stringify_children(nodes));
  };

  const $set_style = (cssText: string) => {
    context.style.cssText = cssText;
  };

  const $set_width = (width: number, unit: UnitFunction = unitPX) => {
    context.style.width = unit(width);
  };

  const $set_transform_translate = (x: number, y: number, unit: UnitFunction = unitPX) => {
    context.style.transform = `translate(${unit(x)},${unit(y)})`;
  };

  const $head_append = <T extends Node>(n: T) => $head.appendChild(n);

  const $add_css = (cssStyle: string) => $head_append(style([cssStyle]));

  const $add_host_css = (cssStyle: string) => $head_append(style([`:host{${cssStyle}}`]));

  const $inject_css = (inject: (mapper: typeof css) => ReturnType<typeof css>) => $head_append(style([inject(css)]));

  const $toggle_style = (styleElem: HTMLStyleElement, active: boolean) => {
    if (!context.shadowRoot?.styleSheets) return;
    const styleElementInSheet = Array.from(context.shadowRoot.styleSheets).find(i => i.ownerNode === styleElem);
    if (styleElementInSheet) {
      styleElementInSheet.disabled = !active;
    }
  };

  const $style = (...p: Parameters<typeof css_value_str>) => $head_append(style([css_value_str(...p)]));

  const $style_inline = (...p: Parameters<typeof css_value_str>) => {
    $set_style(css_value_str(...p));
  };

  return {
    $connected,
    $head,
    $slot,
    $id,
    $set_style,
    $on_click,
    $append,
    $set_width,
    $set_transform_translate,
    $head_append,
    $add_css,
    $add_host_css,
    $inject_css,
    $toggle_style,
    $style,
    $style_inline,
  };
};
class TCustomPropsWrap<T extends HTMLElement> {
  0 = (v: T) => custom_props_v2(v);
}

export class gui_element extends HTMLElement {
  disconnectedCallback!: () => void;
  connectedCallback!: () => void;

  $custom!: ReturnType<TCustomPropsWrap<gui_element>[0]>;

  constructor(...nodes: App.Children) {
    super();
    const self = this;
    const root = self.attachShadow({ mode: 'open' });

    self.$custom = custom_props_v2(self);

    root.append(self.$custom.$head, self.$custom.$slot);
    self.$custom.$append(...nodes);
    self.$custom.$add_host_css(css`
      display: block;
    `);

    self.disconnectedCallback = () => self.$custom.$connected.$set(false);
    self.connectedCallback = () => self.$custom.$connected.$set(true);

    self.$custom.$id(elementNameMap.get(self.tagName.toLowerCase()));
  }
}

interface GuiElementConstructor {
  new (...params: any[]): gui_element | HTMLElement;
}

const element_constructor =
  (id = 0, name_constructor = () => `ui-${id++}`) =>
  <T extends GuiElementConstructor>(element_class: T, debug_id = '', name = name_constructor()) => {
    elementNameMap.set(name, debug_id || element_class.name);
    customElements.define(name, element_class);
  };

export const define_element = element_constructor();

define_element(gui_element);
