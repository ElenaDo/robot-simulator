<template>
  <div>
    <div>
      <span>Select X</span>
      <select v-model="selectedX">
        <option
          v-for="(number, index) in 10"
          :key="number"
          :value="index"
        >{{ index }}</option>
      </select>
      <span>Select Y</span>
      <select v-model="selectedY">
        <option
          v-for="(number, index) in 10"
          :key="number"
          :value="index"
        >{{ index }}</option>
      </select>
      <span>Facing</span>
      <select v-model="selectedFacing">
        <option
          v-for="option in facing"
          :key="option"
        >{{ option }}</option>
      </select>
      </div>
    <div>
      <input size="50" v-model="path" @keypress.prevent="keyCheck"/>
      <button @click="passDirections">execute</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputPanel',
  data: () => ({
    selectedX: 0,
    selectedY: 0,
    selectedFacing: 'NORTH',
    facing: [
      'NORTH',
      'EAST',
      'SOUTH',
      'WEST',
    ],
    path: 'RAALALLLAALAAAALAAAAAAALAAAA',
  }),
  methods: {
    passDirections() {
      const directions = `${this.selectedX} ${this.selectedY} ${this.selectedFacing} ${this.path}`;
      this.$emit('directions', directions);
    },
    keyCheck(event) {
      const allowed = ['A', 'L', 'R'];
      const key = event.key.toUpperCase();
      const { selectionStart, selectionEnd } = event.target;
      if (allowed.includes(key)) {
        this.path = this.path.slice(0, selectionStart) + key + this.path.slice(selectionEnd);
      }
    },
  },
};
</script>
