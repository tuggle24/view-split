import package_ from "./package.json";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
  {
    input: package_.source,
    output: {
      file: package_.module,
      format: "es",
    },
    plugins: [
      nodeResolve(),
      babel({ babelHelpers: "bundled", rootMode: "upward" }),
    ],
    external: ["react"],
  },
  {
    input: package_.source,
    output: {
      file: package_.main,
      format: "cjs",
    },
    plugins: [
      nodeResolve(),
      babel({ babelHelpers: "bundled", rootMode: "upward" }),
    ],
    external: ["react"],
  },
];
