export const timer = (timeout: number) => {
  let prev_time = performance.now();

  return (time_shift = prev_time) => {
    let time_now: number = performance.now();
    prev_time = time_shift;		
    if (prev_time > time_now) return false;
    prev_time = time_now + timeout;
    return true;
  };
};
