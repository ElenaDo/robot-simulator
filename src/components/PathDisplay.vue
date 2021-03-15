<template>
  <div>
    <canvas id="canvas" width="400" height="400">
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
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    this.vueCanvas = ctx;
    this.vueCanvas.translate(canvas.width / 2, canvas.height / 2);
    this.vueCanvas.strokeStyle = 'blue';
    this.movePath();
  },
  watch: {
    history: {
      handler: 'movePath',
      immediate: true,
    },
  },
  methods: {
    movePath() {
      const ctx = this.vueCanvas;
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
      this.history.forEach((step, i) => setTimeout(() => move(step, i), 10 * i));
    },
    drawTriangle() {
      this.vueCanvas.beginPath();
      const { history, facing } = this;
      const [x, y] = history[history.length - 1];
      const side = 15;
      const scaledX = x * this.scale;
      const scaledY = y * this.scale;
      this.vueCanvas.moveTo(scaledX, -scaledY);
      switch (facing) {
        case 'EAST':
          this.vueCanvas.moveTo(scaledX, -scaledY - side / 2);
          this.vueCanvas.lineTo(scaledX + side, -scaledY);
          this.vueCanvas.lineTo(scaledX, -scaledY + side / 2);
          break;
        case 'WEST':
          this.vueCanvas.lineTo(scaledX, -scaledY - side / 2);
          this.vueCanvas.lineTo(scaledX - side, -scaledY);
          this.vueCanvas.lineTo(scaledX, -scaledY + side / 2);
          break;
        case 'SOUTH':
          this.vueCanvas.lineTo(scaledX + side / 2, -scaledY);
          this.vueCanvas.lineTo(scaledX, -scaledY + side);
          this.vueCanvas.lineTo(scaledX - side / 2, -scaledY);
          break;
        default: // NORTH
          this.vueCanvas.lineTo(scaledX + side / 2, -scaledY);
          this.vueCanvas.lineTo(scaledX, -scaledY - side);
          this.vueCanvas.lineTo(scaledX - side / 2, -scaledY);
      }
      this.vueCanvas.fill();
    },
  },
};
</script>
