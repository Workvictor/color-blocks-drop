export const clamp = (min: number, max: number, delta: number) => Math.min(max, Math.max(min, delta));

export const random = (min = 0, max = 100) => Math.floor(clamp(min, max, min + Math.random() * max));

export const percent = (value: number, max: number = 100, min: number = 0) => value / (max - min);

export const floorPrecise = (value: number, precise: number = 100) => Math.floor(value * precise) / precise;

export const floorPreciseX1 = (value: number) => floorPrecise(value, 1);

const makeSeedSoltHash = (solt: string = '') => {
  const soltSequence = solt.trim().split('').map(i => i.charCodeAt(0));
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

