import vuePlugin from "rollup-plugin-vue";

export default [
  {
    input: "src/SplitPane.vue",
    output: {
      file: "dist/SplitPane.js",
      format: "esm",
    },
    plugins: [vuePlugin()],
    external: ["vue"],
  },
];
