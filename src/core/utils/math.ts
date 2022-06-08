export const math_flip = (value: number) => -(value + Math.sign(value));

export const math_clamp = (min: number, max: number, delta: number) => Math.min(max, Math.max(min, delta));

export const math_random = (min = 0, max = 100) => Math.floor(math_clamp(min, max, min + Math.random() * max));

const makeSeedSoltHash = (solt: string = '') => {
  const soltSequence = solt
    .trim()
    .split('')
    .map(i => i.charCodeAt(0));
  const soltStart = `0.${soltSequence.reduce((acc, cur) => acc + cur, 0)}`;
  const soltNumber = Number(soltSequence.reduce((acc, i) => acc + i, soltStart));
  return Math.sin(soltNumber).toString().slice(2);
};

const makeSeedGen = (solt: string) => {
  const soltHashArray = makeSeedSoltHash(solt).split('');
  const getNextValue = () => {
    let res = 0;
    let soltValue = 1;
    while (res === 0) {
      soltValue = Number(soltHashArray.shift());
      res = Math.abs(Math.sin(soltValue));
      if (soltHashArray.length === 0) {
        soltHashArray.push(...(res || 1).toString().slice(2).split(''));
      }
    }
    return res;
  };
  return getNextValue;
};
