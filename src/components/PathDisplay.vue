<template>
  <div>
    <canvas ref="canvas" width="600" height="600">
    </canvas>
  </div>
</template>

<script>

export default {
  name: 'PathDisplay',
  props: {
    history: {
      type: Array,
      required: true,
    },
    facing: {
      type: String,
      required: true,
    },
    scale: {
      type: [Number, String],
      default: 20,
    },
  },
  data: () => ({
  }),
  mounted() {
    const { canvas } = this.$refs;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.strokeStyle = '#0f7caf';
    this.ctx = ctx;
    this.movePath();
  },
  watch: {
    history: {
      handler: 'movePath',
    },
  },
  methods: {
    clear() {
      const { ctx } = this;
      const { width } = ctx.canvas;
      const halfWidth = width / 2;
      ctx.clearRect(-halfWidth, -halfWidth, width, width);
    },
    movePath() {
      this.clear();
      const { ctx } = this;
      let prevX;
      let prevY;
      const move = (step, i) => {
        ctx.beginPath();
        const [x, y] = step;
        const toX = x * this.scale;
        const toY = y * -this.scale;
        if (prevX !== undefined) ctx.moveTo(prevX, prevY);
        else ctx.moveTo(toX, toY);
        if (i !== 0) ctx.lineTo(toX, toY);
        prevX = toX;
        prevY = toY;
        ctx.stroke();
        if (i === this.history.length - 1) this.drawTriangle();
      };
      this.history.forEach((step, i) => setTimeout(() => move(step, i), 30 * i));
    },
    drawTriangle() {
      const { ctx } = this;
      ctx.fillStyle = '#0f7caf';
      ctx.beginPath();
      const { history, facing } = this;
      const [x, y] = history[history.length - 1];
      const side = 15;
      const scaledX = x * this.scale;
      const scaledY = y * this.scale;
      ctx.moveTo(scaledX, -scaledY);
      switch (facing) {
        case 'EAST':
          ctx.moveTo(scaledX, -scaledY - side / 2);
          ctx.lineTo(scaledX + side, -scaledY);
          ctx.lineTo(scaledX, -scaledY + side / 2);
          break;
        case 'WEST':
          ctx.lineTo(scaledX, -scaledY - side / 2);
          ctx.lineTo(scaledX - side, -scaledY);
          ctx.lineTo(scaledX, -scaledY + side / 2);
          break;
        case 'SOUTH':
          ctx.lineTo(scaledX + side / 2, -scaledY);
          ctx.lineTo(scaledX, -scaledY + side);
          ctx.lineTo(scaledX - side / 2, -scaledY);
          break;
        default: // NORTH
          ctx.lineTo(scaledX + side / 2, -scaledY);
          ctx.lineTo(scaledX, -scaledY - side);
          ctx.lineTo(scaledX - side / 2, -scaledY);
      }
      ctx.fill();
    },
  },
};
</script>

<style scoped>
canvas {
  border: 1px solid #d3d3d3;
  max-width: 100%;
}
</style>
