<script>
import HelloWorld from "divider-vue";
export default {
  components: {
    HelloWorld,
  },
};
</script>

<template>
  <div>
    <h1 class="title">Vue Example</h1>
    <HelloWorld msg="Hello Vue 3 + Vite">
      <div class="panel">a</div>
      <div class="panel">c</div>
      <div class="panel">f</div>
      <div class="panel">g</div>
      <div class="panel">dt</div>
    </HelloWorld>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.title {
  color: #42b983;
}

.panel {
  background-color: #42b983;
  height: 70vh;
}
</style>
