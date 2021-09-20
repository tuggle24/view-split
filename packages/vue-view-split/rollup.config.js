import vuePlugin from "rollup-plugin-vue";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
  {
    input: "index.vue",
    output: {
      file: "dist/vue-view-split.esm.js",
      format: "esm",
    },
    plugins: [nodeResolve(), vuePlugin()],
    external: ["vue"],
  },
];
