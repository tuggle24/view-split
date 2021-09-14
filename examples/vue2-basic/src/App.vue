<script>
import HelloWorld from "divider-vue";
export default {
  components: {
    HelloWorld,
  },
};
</script>

<template>
  <div id="app">
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
  margin-top: 60px;
  height: 70vh;
}
.title {
  color: #42b983;
  margin-bottom: 40px;
  text-align: center;
}

.panel {
  background-color: #42b983;
  /* height: 70vh; */
}
</style>
