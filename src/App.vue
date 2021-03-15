<template>
  <div id="app">
    <canvas id="canvas" width="400" height="400">
    </canvas>
  </div>
</template>

<script>
import { Robot } from '@/robot-simulator';

export default {
  name: 'App',
  data: () => ({
    scale: 20,
  }),
  components: {
  },
  mounted() {
    this.robot = new Robot();
    this.robot.execute('0 0 NORTH RAALALLL');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    this.vueCanvas = ctx;
    this.vueCanvas.translate(canvas.width / 2, canvas.height / 2);
    this.vueCanvas.strokeStyle = 'blue';
    this.movePath();
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
        if (i === this.robot.history.length - 1) this.drawTriangle();
      };
      this.robot.history.forEach((step, i) => setTimeout(() => move(step, i), 10 * i));
    },
    drawTriangle() {
      this.vueCanvas.beginPath();
      const { x, y, facing } = this.robot;
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#canvas {
  border: 1px solid #d3d3d3;
}
</style>
