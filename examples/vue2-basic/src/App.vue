<script>
import HelloWorld from "divider-vue";
const onDrag = (sizes) => {
  console.log("In app:", sizes);
};
export default {
  components: {
    HelloWorld,
  },
  data() {
    return {
      options: { onDrag },
    };
  },
};
</script>

<template>
  <div id="app">
    <h1 class="title">Vue Example</h1>
    <HelloWorld :options="options">
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
  background-color: rgb(182, 255, 212);
  /* height: 100%; */
}

.split-view {
  display: flex;
  /* height: 60vh; */
}

.divider {
  background-color: rgb(156, 70, 255);
}
</style>
