import vuePlugin from "rollup-plugin-vue";

export default [
  {
    input: "src/HelloWorld.vue",
    output: {
      file: "dist/HelloWorld.js",
      format: "esm",
    },
    plugins: [vuePlugin()],
    external: ["vue"],
  },
];
