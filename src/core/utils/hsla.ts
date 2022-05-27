export class HSLA extends Array<number> {
  $hue = (offset: number) => {
    this[0] = (this.h + offset) % 361;
    return new HSLA(...this);
  };

  $saturate = (offset: number) => {
    this[1] = (this.s + offset) % 101;
    return new HSLA(...this);
  };

  $light = (offset: number) => {
    this[2] = (this.l + offset) % 101;
    return new HSLA(...this);
  };

  $alpha = (offset: number) => {
    this[3] = (this.a + offset) % 101;
    return new HSLA(...this);
  };

  $list = (count: number) => {
    return new Array<HSLA>(count).fill(this);
  };

  get h() {
    return this[0] || 0;
  }

  get s() {
    return this[1] || 0;
  }

  get l() {
    return this[2] || 0;
  }

  get a() {
    return this[3] || 1;
  }

  get $value() {
    const { h, s, l, a } = this;
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  }
}
