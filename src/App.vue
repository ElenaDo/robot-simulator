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
  components: {
  },
  mounted() {
    this.robot = new Robot();
    // this.robot.execute('0 0 NORTH AAAALAAAALAAAALAAAAL');
    // this.robot.execute('7 3 NORTH RAALALA');
    this.robot.execute('0 0 NORTH AAAAAARAAARAAALAA');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    this.vueCanvas = ctx;
    this.vueCanvas.translate(canvas.width / 2, canvas.height / 2);
    this.vueCanvas.beginPath();
    this.vueCanvas.strokeStyle = 'blue';
    this.movePath();
  },
  methods: {
    movePath() {
      const ctx = this.vueCanvas;
      this.robot.history.forEach((move, i) => {
        const action = i === 0 ? 'moveTo' : 'lineTo';
        const [x, y] = move;
        const toX = x * 20;
        const toY = y * -20;
        console.log(x, y);
        ctx[action](toX, toY);
      });
      ctx.stroke();
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
