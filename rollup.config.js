import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "bin/tnc.ts",
  output: {
    file: "bundle/tnc.cjs",
    format: "cjs",
    sourcemap: true,
  },
  plugins: [nodeResolve(), commonjs(), json(), typescript(), terser()],
};
