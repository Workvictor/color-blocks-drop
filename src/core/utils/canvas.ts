export const canvas_wh = (ctx: CanvasRenderingContext2D): [number, number] => [ctx.canvas.width, ctx.canvas.height];

export const canvas_clear = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ...canvas_wh(ctx));
};
