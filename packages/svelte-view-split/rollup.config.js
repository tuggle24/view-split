import svelte from "rollup-plugin-svelte";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import package_ from "./package.json";

export default [
  {
    input: "index.js",
    output: [{ file: package_.module, format: "es" }],
    plugins: [
      svelte(),
      nodeResolve(),
      babel({ babelHelpers: "bundled", rootMode: "upward" }),
    ],
    external: [/^svelte/],
  },
  {
    input: "index.js",
    output: [{ file: package_.main, format: "cjs" }],
    plugins: [
      svelte(),
      nodeResolve(),
      babel({ babelHelpers: "bundled", rootMode: "upward" }),
    ],
    external: [/^svelte/],
  },
];
