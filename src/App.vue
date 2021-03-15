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
    // this.robot.execute('0 3 NORTH RAALALLL');
    this.robot.execute('0 0 NORTH RAAAALRRAAAALAARAARAAAAAA');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    this.vueCanvas = ctx;
    this.vueCanvas.translate(canvas.width / 2, canvas.height / 2);
    this.vueCanvas.strokeStyle = 'blue';
    this.movePath();
    // this.vueCanvas.beginPath();
  },
  methods: {
    movePath() {
      const ctx = this.vueCanvas;
      let prevX;
      let prevY;
      const move = (step) => {
        ctx.beginPath();
        const [x, y] = step;
        const toX = x * this.scale;
        const toY = y * -this.scale;
        if (prevX) ctx.moveTo(prevX, prevY);
        else ctx.moveTo(toX, toY);
        ctx.lineTo(toX, toY);
        prevX = toX;
        prevY = toY;
        ctx.stroke();
      };
      this.robot.history.forEach((step, i) => setTimeout(() => move(step, i), 100 * i));
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
