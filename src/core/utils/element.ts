import { css } from './css';
import { Observer } from './observer';

declare global {
  namespace App {
    type Children = (string | Node | null | undefined | number)[];
  }
}

const not_nullish = <T>(value: T) => value !== null && value !== undefined;

export const stringify_children = (children: App.Children) => {
  const result: (string | Node)[] = [];

  for (let i = 0; i < children.length; i++) {
    if (not_nullish(children[i])) {
      if (children[i] instanceof Node) {
        result.push(children[i] as Node);
        continue;
      }
      result.push(String(children[i]));
    }
  }

  return result;
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

const elementNameMap = new Map<string, string>();

export const unitPX = (value: number) => `${value}px`;
export const unitPC = (value: number) => `${value}%`;
export const unitEM = (value: number) => `${value}em`;

type UnitFunction = typeof unitPX | typeof unitPC | typeof unitEM;

class custom_props<T extends HTMLElement> {
  $connected = new Observer(false);
  $head = head();
  $slot = slot();
  $name = '';

  constructor(private context: T) {}

  $on_click(cb: () => void) {
    this.context.onclick = cb;
  }

  $append(...nodes: App.Children) {
    this.context.append(...stringify_children(nodes));
  }

  $setStyle(cssText: string) {
    this.context.style.cssText = cssText;
  }

  $set_width(width: number, unit: UnitFunction = unitPX) {
    this.context.style.width = unit(width);
  }

  $set_transform_translate(x: number, y: number, unit: UnitFunction = unitPX) {
    this.context.style.transform = `translate(${unit(x)},${unit(y)})`;
  }

  private $head_append = <T extends Node>(n: T) => this.$head.appendChild(n);

  $add_css(cssStyle: string) {
    return this.$head_append(style([cssStyle]));
  }

  $add_host_css(cssStyle: string) {
    return this.$head_append(style([`:host{${cssStyle}}`]));
  }

  $inject_css(inject: (mapper: typeof css) => ReturnType<typeof css>) {
    return this.$head_append(style([inject(css)]));
  }

  $toggle_style(styleElem: HTMLStyleElement, active: boolean) {
    if (!this.context.shadowRoot) return;
    if (!this.context.shadowRoot.styleSheets) return;
    const styleElementInSheet = Array.from(this.context.shadowRoot.styleSheets).find(i => i.ownerNode === styleElem);
    if (!styleElementInSheet) return;
    styleElementInSheet.disabled = !active;
  }
}

export class gui_element extends HTMLElement {
  connectedCallback() {
    this.$custom.$connected.$set(true);
  }

  disconnectedCallback() {
    this.$custom.$connected.$set(false);
  }

  $custom = new custom_props(this);

  constructor(...nodes: App.Children) {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.append(this.$custom.$head, this.$custom.$slot);
    this.$custom.$append(...nodes);

    this.$custom.$add_host_css(css`
      display: block;
    `);

    const constructorName = elementNameMap.get(this.tagName.toLowerCase()) + this.$custom.$name;
    this.setAttribute('gui-name', constructorName);
  }
}

interface GuiElementConstructor {
  new (...params: any[]): gui_element | HTMLElement;
}

const element_constructor =
  (id = 0, name_constructor = () => `ui-${id++}`) =>
  <T extends GuiElementConstructor>(element_class: T, name = name_constructor()) => {
    elementNameMap.set(name, element_class.name);
    customElements.define(name, element_class);
  };

export const define_element = element_constructor();

define_element(gui_element);

export const element_class_factory =
  <T extends GuiElementConstructor>(element: T) =>
  (...params: ConstructorParameters<typeof element>) =>
    new element(...params);
