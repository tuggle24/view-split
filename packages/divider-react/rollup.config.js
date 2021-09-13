import package_ from "./package.json";
import { babel } from "@rollup/plugin-babel";

export default [
  {
    input: package_.source,
    output: {
      file: package_.main,
      format: "cjs",
    },
    plugins: [babel({ babelHelpers: "bundled" })],
    external: [/@babel\/runtime/, "react"],
  },
  {
    input: package_.source,
    output: {
      file: package_.module,
      format: "es",
    },
    plugins: [babel({ babelHelpers: "bundled" })],
    external: [/@babel\/runtime/, "react"],
  },
];
