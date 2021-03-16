<template>
  <div>
    <p class="instructions">Select initilal position and input the movements of a robot.<br>
        The robot can have three possible movements:
        <code>"R"</code> - turn right, <code>"L"</code> - turn left, <code>"A"</code> - advance</p>
    <div class="select-panel">
      <div>
        <span>Start X</span>
        <select v-model="selectedX">
          <option
            v-for="(number, index) in 10"
            :key="number"
            :value="index"
          >{{ index }}</option>
        </select>
      </div>
      <div>
        <span>Start Y</span>
        <select v-model="selectedY">
          <option
            v-for="(number, index) in 10"
            :key="number"
            :value="index"
          >{{ index }}</option>
        </select>
      </div>
      <div>
        <span>Facing</span>
        <select v-model="selectedFacing">
          <option
            v-for="option in facing"
            :key="option"
          >{{ option }}</option>
        </select>
      </div>
      </div>
    <div class="direction-panel">
      <input v-model="path" @keypress.prevent="keyCheck"/>
      <button @click="clear" :disabled="!path.length">clear</button>
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
    path: 'RAALAAALAAAALAARAAA',
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
    clear() {
      this.path = '';
    },
  },
};
</script>

<style scoped>
.select-panel, .direction-panel{
  max-width: 600px;
  margin: 1em auto;
  display: flex;
  justify-content: space-between;
}
.direction-panel input{
  width: 80%;
  border: 1px solid lightgray;
  border-radius: .2em;
  padding: 0 .5em;
  font-size: 1.5em;
  letter-spacing: .3em;
}

.instructions {
  max-width: 600px;
  margin: auto;
  text-align: left;
  line-height: 1.5em;
}
.instructions code{
  color: #0f7caf;
  font-weight: 600;
}

button {
  padding: .4em;
  border: 0px;
  border-radius: .2em;
  background-color: #0f7caf;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
  margin: 0 0 0 0.5em;
  transition: background-color .5s;
}
button:hover{
  background-color:#50ace2;
}
button:disabled{
  opacity: 0.5;
  background-color: #0f7caf;
}
button:focus, input:focus{
  outline: none;
}

@media (max-width: 600px) {
  .select-panel {
    max-width: 100%;
  }
}
</style>
