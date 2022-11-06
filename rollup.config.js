import { defineConfig } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import del from "rollup-plugin-delete";
import { copyFileSync, rmSync } from "fs";

const name = "m2s";

const input = "src/index.ts";

const plugins = [
  del({ targets: "dist/*", runOnce: true }),
  commonjs(),
  nodeResolve(),
  typescript({
    check: true,
    useTsconfigDeclarationDir: true,
    tsconfig: "tsconfig.json",
  }),
];

const globals = {
  morphdom: "morphdom",
};

export default [
  ...["cjs", "es", "esm", "umd", "iife"].map((format) =>
    defineConfig({
      input,
      output: {
        file:
          format === "cjs"
            ? `dist/${name}.js`
            : format === "es"
            ? `dist/${name}.mjs`
            : `dist/${name}-${format}.js`,
        format,
        name,
        globals,
      },
      plugins,
    })
  ),
  ...["umd", "iife"].map((format) =>
    defineConfig({
      input,
      output: {
        file: `dist/${name}-${format}.min.js`,
        format,
        name,
        globals,
      },
      plugins: [
        ...plugins,
        terser({
          compress: {
            ecma: 2015,
            pure_getters: true,
          },
          safari10: true,
        }),
        {
          name: "copy-types",
          closeBundle() {
            copyFileSync("./dist/src/index.d.ts", "./dist/m2s.d.ts");
            rmSync("./dist/src", { recursive: true, force: true });
          },
        },
      ],
      treeshake: {
        moduleSideEffects: false,
      },
    })
  ),
];
