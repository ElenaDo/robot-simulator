<template>
  <div v-if="history.length" class="container">
    <h4>History</h4>
    <ul>
      <li v-for="(step, i) in history" :key="i">
        {{step}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'PathHistory',
  props: { history: Array },
};
</script>
<style scoped>
.container {
  margin: .5em auto;
  padding: .5em 0;
  max-width: 600px;
  background-color: #cbf0ff;
  color: #122852;
  border: 1px solid #d3d3d3;
}
.container li {
  list-style: none;
  display: inline;
}
.container ul, h4{
  margin: .5em;
  padding: .2em;
}
</style>
