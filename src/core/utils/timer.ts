export const timer = (timeout: number) => {
  let drop_time = performance.now();

  return (time_shift = drop_time) => {
    let time_now: number = performance.now();
    drop_time = time_shift;
    if (drop_time > time_now) return false;
    drop_time = time_now + timeout;
    return true;
  };
};
