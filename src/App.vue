<template>
  <div id="app">
    <PathDisplay
      :history="robot.history"
      :facing="robot.facing"
    />
  </div>
</template>

<script>
import { Robot } from '@/robot-simulator';
import PathDisplay from './components/PathDisplay.vue';

export default {
  name: 'App',
  data: () => ({
    robot: {
      history: [],
      facing: 'NORTH',
    },
  }),
  components: {
    PathDisplay,
  },
  mounted() {
    this.robot = new Robot();
    console.log(this.robot);
    this.robot.execute('0 0 NORTH RAALALLLAALAAAA');
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
