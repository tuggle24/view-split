import svelte from "rollup-plugin-svelte";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import pkg from "./package.json";

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

export default {
  input: "lib/index.js",
  output: [
    { file: pkg.module, format: "es" },
    { file: pkg.main, format: "cjs", name },
  ],
  plugins: [svelte(), nodeResolve()],
  external: [/^svelte/],
};
