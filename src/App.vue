<template>
  <div id="app">
    <h2>Robot simulator</h2>
    <InputPanel @directions="passDirections" />
    <PathHistory :history="robot.history" />
    <PathDisplay
      :history="robot.history"
      :facing="robot.facing"
    />
  </div>
</template>

<script>
import { Robot } from '@/robot-simulator';
import InputPanel from './components/InputPanel.vue';
import PathDisplay from './components/PathDisplay.vue';
import PathHistory from './components/PathHistory.vue';

export default {
  name: 'App',
  data: () => ({
    robot: {
      history: [],
      facing: 'NORTH',
    },
    directions: '',
  }),
  components: {
    PathDisplay,
    InputPanel,
    PathHistory,
  },
  mounted() {
    this.robot = new Robot();
  },
  methods: {
    passDirections(val) {
      this.robot.execute(val);
    },
  },
};
</script>

<style>
body, button, input, select {
  font-family: monospace;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#canvas {
  border: 1px solid #d3d3d3;
  max-width: 100%;
}
select{
  padding: .2em;
  border-radius: .2em;
  margin: .5em;
  border: 1px solid lightgray;
}

</style>
