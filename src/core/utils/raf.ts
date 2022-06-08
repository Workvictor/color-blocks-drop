export const raf = requestAnimationFrame;

export const raf_timeout = (cb: () => void, drop_timeout = 500) => {
  let drop_time = Date.now();
  const loop = () => {
    raf(loop);
    const date_now = Date.now();
    if (drop_time > date_now) return;
    drop_time = date_now + drop_timeout;
		cb();
  };
	raf(loop);
};
