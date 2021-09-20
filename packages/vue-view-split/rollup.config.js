import vuePlugin from "rollup-plugin-vue";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import package_ from "./package.json";

export default [
  {
    input: "index.js",
    output: {
      file: package_.module,
      format: "esm",
    },
    plugins: [
      nodeResolve(),
      vuePlugin(),
      babel({ babelHelpers: "bundled", rootMode: "upward" }),
    ],
    external: ["vue"],
  },
  {
    input: "index.js",
    output: {
      file: package_.main,
      format: "cjs",
    },
    plugins: [
      nodeResolve(),
      vuePlugin(),
      babel({ babelHelpers: "bundled", rootMode: "upward" }),
    ],
    external: ["vue"],
  },
];
