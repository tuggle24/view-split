import vuePlugin from "rollup-plugin-vue";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
  {
    input: "src/SplitPane.vue",
    output: {
      file: "dist/SplitPane.js",
      format: "esm",
    },
    plugins: [nodeResolve(), vuePlugin()],
    external: ["vue"],
  },
];
