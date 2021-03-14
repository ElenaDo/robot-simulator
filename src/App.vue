<template>
  <div id="app">
    <canvas id="canvas">
    </canvas>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  mounted() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    this.vueCanvas = ctx;
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
  width: 600px;
  height: 400px;
  border: 1px solid #d3d3d3;
}
</style>
