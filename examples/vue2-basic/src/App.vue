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
    <h1>Vue Example</h1>
    <HelloWorld msg="Hello Vue 3 + Vite">
      <div>a</div>
      <div>c</div>
    </HelloWorld>
    <p>So this work</p>
    <p>But why?</p>
    <p>Clean too</p>
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
</style>
