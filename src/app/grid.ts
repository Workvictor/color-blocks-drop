import { get_style_var } from 'src/core/ui/style';
import { array_fill } from 'src/core/utils/array';
import { canvas_clear } from 'src/core/utils/canvas';
import { ctx2d } from 'src/core/utils/element';
import { raf } from 'src/core/utils/raf';
import { color_block_draw } from './color_block';
import { game_stop, game_stop_update } from './game';
import { conf_block_size, conf_get_game_height, conf_get_game_width, conf_grid_size } from './game_config';
import { shape_clear, shape_randomize } from './shape';

let grid_data: number[][] = [];
let grid_width = conf_get_game_width();
let grid_height = conf_get_game_height();
let layer_bg = ctx2d(grid_width, grid_height)!;
let layer_limit = ctx2d(grid_width, 1)!;
let layer_merge = ctx2d(grid_width, grid_height)!;
let layer_animation = ctx2d(grid_width, grid_height)!;
let row_limit_top = conf_grid_size[1] - 20;
let layer_animation_pos_y = 0;

for (let row = 0; row < conf_grid_size[1]; row++) {
  grid_data[row] = [];
  for (let col = 0; col < conf_grid_size[0]; col++) {
    grid_data[row][col] = -1;
  }
}

layer_limit.strokeStyle = get_style_var(i => i.color_primary_active);
layer_bg.strokeStyle = get_style_var(i => i.color_gray_2);
layer_bg.fillStyle = get_style_var(i => i.color_gray_4);

const layer_limit_redraw = () => {
  layer_limit.moveTo(0, 0);
  layer_limit.lineTo(conf_grid_size[0] * conf_block_size, 0);
  layer_limit.stroke();
};

const layer_bg_redraw = () => {
  const cell_size = conf_block_size;

  layer_bg.fillRect(0, 0, grid_width, grid_height);

  for (let row = 1; row < conf_grid_size[1]; row++) {
    const y = row * cell_size;
    layer_bg.moveTo(0, y);
    layer_bg.lineTo(conf_grid_size[0] * cell_size, y);
  }

  for (let col = 1; col < conf_grid_size[0]; col++) {
    const x = col * cell_size;
    layer_bg.moveTo(x, 0);
    layer_bg.lineTo(x, conf_grid_size[1] * cell_size);
  }

  layer_bg.stroke();
};

layer_bg_redraw();
layer_limit_redraw();

const layer_redraw = (layer: CTX, start_row = 0, end_row = grid_data.length) => {
  canvas_clear(layer);

  for (let row = start_row; row < end_row; row++) {
    for (let col = 0; col < grid_data[row].length; col++) {
      const id = grid_data[row][col];
      if (id >= 0) {
        color_block_draw(layer, id, col, row);
      }
    }
  }
};

const grid_is_fulfilled = () => {
  for (let col = 0, length = grid_data[row_limit_top].length; col < length; col++) {
    if (grid_data[row_limit_top][col] >= 0) return true;
  }
  return false;
};

const grid_is_collides_here = (row: number, col: number) => {
  return [grid_data[row] === undefined, grid_data[row]?.[col] === undefined, grid_data[row]?.[col] >= 0].some(Boolean);
};

export const grid_collides = (shape_data: number[][], shape_pos_x: number, shape_pos_y: number) => {
  for (let length = shape_data.length, row = 0; row < length; row++) {
    for (let col = 0; col < length; col++) {
      const shape_collides = shape_data[row][col];
      const grid_collides = grid_is_collides_here(shape_pos_y + row, shape_pos_x + col);
      if (shape_collides && grid_collides) return true;
    }
  }
  return false;
};

const animate_fulfilled_rows = async (fulfilled_rows: number[]) => {
  const rows_count = fulfilled_rows.length;

  if (!rows_count) return Promise.resolve();

  const start_row = fulfilled_rows[0];
  const end_row = fulfilled_rows[rows_count - 1];
  const animation_height = conf_block_size * rows_count;
  const bounce_reduction = 0.6; // Jumpion The bouncy one
  const gravity = 0.98;

  // draw top rows for animation
  layer_redraw(layer_animation, 0, start_row);
  // redraw bottom rows
  layer_redraw(layer_merge, end_row + 1);

  // delete and renew data
  const new_grid_data = array_fill(rows_count, []).map(() => array_fill(conf_grid_size[0], -1));
  grid_data.splice(start_row, rows_count);
  grid_data.unshift(...new_grid_data);

  let speed_y = 0;
  let bouncing_count = 4;
  let prev_time = performance.now();
  let time_passed = 0;

  return new Promise<void>(resolve => {
    const animation_loop = (time_now: number) => {
      if (bouncing_count <= 0) {
        layer_animation_pos_y = 0;
        canvas_clear(layer_animation);
        return resolve();
      }

      raf(animation_loop);

      time_passed = time_now - prev_time;
      prev_time = time_now;

      speed_y += gravity * time_passed;

      // animate top rows by frame
      layer_animation_pos_y += (speed_y / 1000) * time_passed;

      if (layer_animation_pos_y >= animation_height) {
        layer_animation_pos_y = animation_height;

        speed_y = -(speed_y * bounce_reduction);

        bouncing_count--;
      }
    };

    raf(animation_loop);
  });
};

export const grid_merge = async (shape_data: number[][], x: number, y: number, color_id: number) => {
  const check_this_rows_after_merge = new Set<number>();

  for (let row = 0; row < shape_data.length; row++) {
    for (let col = 0; col < shape_data.length; col++) {
      const gridX = col + x;
      const gridY = row + y;
      if (shape_data[row][col]) {
        grid_data[gridY][gridX] = color_id;
        color_block_draw(layer_merge, color_id, gridX, gridY);
        check_this_rows_after_merge.add(gridY);
      }
    }
  }

  const fulfilled_rows: number[] = [];

  check_this_rows_after_merge.forEach(row => {
    if (grid_data[row].every(i => i >= 0)) {
      fulfilled_rows.push(row);
    }
  });

  if (grid_is_fulfilled()) return game_stop();

  game_stop_update(true);

  shape_clear();

  await animate_fulfilled_rows(fulfilled_rows);

  shape_randomize();

  layer_redraw(layer_merge);

  game_stop_update(false);
};

export const grid_draw = (ctx: CTX) => {
  ctx.drawImage(layer_bg.canvas, 0, 0);
  ctx.drawImage(layer_limit.canvas, 0, row_limit_top * conf_block_size);
  ctx.drawImage(layer_merge.canvas, 0, 0);
  ctx.drawImage(layer_animation.canvas, 0, layer_animation_pos_y);
};

// export class Grid {
//   size = new Vector(10, 24);

//   rowLimitTop = 0;

//   width: number;

//   height: number;

//   private data: number[][] = [];

//   private limitLayer: CanvasRenderingContext2D;

//   private mergeLayer: CanvasRenderingContext2D;

//   private animationLayer: CanvasRenderingContext2D;

//   private backgroundLayer: CanvasRenderingContext2D;

//   private animationLayerY = 0;

//   constructor() {
//     this.width = conf_grid_size[0] * conf_block_size;
//     this.height = conf_grid_size[1] * conf_block_size;
//     this.backgroundLayer = ctx2d(this.width, this.height)!;
//     this.mergeLayer = ctx2d(this.width, this.height)!;
//     this.limitLayer = ctx2d(this.width, 1)!;
//     this.animationLayer = ctx2d(this.width, this.height)!;
//     this.rowLimitTop = conf_grid_size[1] - 20;

//     for (let row = 0; row < conf_grid_size[1]; row++) {
//       this.data[row] = [];
//       for (let col = 0; col < conf_grid_size[0]; col++) {
//         this.data[row][col] = -1;
//       }
//     }

//     this.limitLayer.strokeStyle = get_style_var(i => i.color_primary_active);
//     this.backgroundLayer.strokeStyle = get_style_var(i => i.color_gray_2);
//     this.backgroundLayer.fillStyle = get_style_var(i => i.color_gray_4);

//     this.redrawBackgroundLayer();
//     this.redrawLimitLayer();
//   }

//   private redrawLimitLayer = () => {
//     const { limitLayer } = this;
//     limitLayer.moveTo(0, 0);
//     limitLayer.lineTo(conf_grid_size[0] * conf_block_size, 0);
//     limitLayer.stroke();
//   };

//   private redrawBackgroundLayer = () => {
//     const cellSize = conf_block_size;
//     const { backgroundLayer } = this;

//     backgroundLayer.fillRect(0, 0, this.width, this.height);

//     for (let row = 1; row < conf_grid_size[1]; row++) {
//       const y = row * cellSize;
//       backgroundLayer.moveTo(0, y);
//       backgroundLayer.lineTo(conf_grid_size[0] * cellSize, y);
//     }

//     for (let col = 1; col < conf_grid_size[0]; col++) {
//       const x = col * cellSize;
//       backgroundLayer.moveTo(x, 0);
//       backgroundLayer.lineTo(x, conf_grid_size[1] * cellSize);
//     }

//     backgroundLayer.stroke();
//   };

//   isCollideHere = (row: number, col: number) => {
//     const { data } = this;
//     return [data[row] === undefined, data[row]?.[col] === undefined, data[row]?.[col] >= 0].some(Boolean);
//   };

//   drawBackgroundLayer = (ctx: CanvasRenderingContext2D) => {
//     const { backgroundLayer, mergeLayer, limitLayer, rowLimitTop, animationLayer } = this;
//     ctx.drawImage(backgroundLayer.canvas, 0, 0);
//     ctx.drawImage(limitLayer.canvas, 0, rowLimitTop * conf_block_size);
//     ctx.drawImage(mergeLayer.canvas, 0, 0);
//     ctx.drawImage(animationLayer.canvas, 0, this.animationLayerY);
//   };

//   redrawMergeLayer = (outputLayer = this.mergeLayer, startRow = 0, endRow = this.data.length) => {
//     const { data } = this;

//     canvas_clear(outputLayer);

//     for (let row = startRow; row < endRow; row++) {
//       for (let col = 0; col < data[row].length; col++) {
//         const id = data[row][col];
//         if (id >= 0) {
//           shape_draw_by_id(outputLayer, id, col, row);
//         }
//       }
//     }
//   };

//   draw = (ctx: CanvasRenderingContext2D) => {
//     this.drawBackgroundLayer(ctx);
//   };

//   checkOutOfBoundsBlocks = () => {
//     const { data, rowLimitTop } = this;
//     for (let col = 0, length = data[rowLimitTop].length; col < length; col++) {
//       if (data[rowLimitTop][col] >= 0) return game_stop();
//     }
//   };

//   merge = async (shapeData: number[][], offset: Vector, id: number) => {
//     const { mergeLayer, data, redrawMergeLayer } = this;
//     const checkThisRowsAfterMerge = new Set<number>();

//     for (let row = 0; row < shapeData.length; row++) {
//       for (let col = 0; col < shapeData.length; col++) {
//         const gridX = col + offset.x;
//         const gridY = row + offset.y;
//         if (shapeData[row][col]) {
//           data[gridY][gridX] = id;
//           shape_draw_by_id(mergeLayer, id, gridX, gridY);
//           checkThisRowsAfterMerge.add(gridY);
//         }
//       }
//     }

//     const fulfilledRows: number[] = [];

//     checkThisRowsAfterMerge.forEach(row => {
//       if (data[row].every(i => i >= 0)) {
//         fulfilledRows.push(row);
//       }
//     });

//     this.checkOutOfBoundsBlocks();

//     game_stop_update(true);

//     game.shapeController.shape.clearCtx();

//     await this.animateFulfilledRows(fulfilledRows);

//     game.shapeController.shape.randomize();

//     redrawMergeLayer();

//     game.setUpdateLoopPause(false);
//   };

//   animateFulfilledRows = async (fulfilledRows: number[]) => {
//     const { mergeLayer, data, animationLayer, redrawMergeLayer } = this;

//     const rowsCount = fulfilledRows.length;

//     if (!rowsCount) return Promise.resolve();

//     const startRow = fulfilledRows[0];
//     const endRow = fulfilledRows[rowsCount - 1];
//     const animationLength = conf_block_size * rowsCount;
//     const bounceReduction = 0.6; // Jumpion The bouncy one
//     const gravity = 0.98;
//     let speedY = 0;
//     let bouncingCount = 4;
//     // draw top rows for animation
//     redrawMergeLayer(animationLayer, 0, startRow);
//     // redraw bottom rows
//     redrawMergeLayer(mergeLayer, endRow + 1);

//     // delete and renew data
//     const new_grid_data = array_fill(rowsCount, []).map(() => array_fill(conf_grid_size[0], -1));
//     data.splice(startRow, rowsCount);
//     data.unshift(...new_grid_data);

//     let prevTime = performance.now();
//     let timePassed = 0;
//     return new Promise<void>(resolve => {
//       const animationLoop = (animationTime: number) => {
//         if (bouncingCount <= 0) {
//           this.animationLayerY = 0;
//           canvas_clear(animationLayer);
//           return resolve();
//         }

//         raf(animationLoop);

//         timePassed = animationTime - prevTime;
//         prevTime = animationTime;

//         speedY += gravity * timePassed;

//         // animate top rows by frame
//         this.animationLayerY += (speedY / 1000) * timePassed;

//         if (this.animationLayerY >= animationLength) {
//           this.animationLayerY = animationLength;

//           speedY = -(speedY * bounceReduction);

//           bouncingCount--;
//         }
//       };

//       raf(animationLoop);
//     });
//   };
// }
