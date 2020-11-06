import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import copy from "rollup-plugin-copy";
import { customAlphabet } from "nanoid";
const rimraf = require('rimraf');

const production = !process.env.ROLLUP_WATCH;
const buildDirectory = production ? 'dist' : 'public/build';
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6);

export default {
  input: "src/main.js",
  output: {
    sourcemap: !production,
    format: "iife",
    name: "app",
    file: `${buildDirectory}/bundle.js`,
  },
  plugins: [
	production && cleanUpDist(),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE),
    }),

    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance

      css: (css) => {
        css.write("bundle.css", !production);
      },
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: (importee) =>
        importee === "svelte" || importee.startsWith("svelte/"),
      mainFields: ["main", "module"],
    }),
    commonjs(),

    // importing JSON
    json(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
    production && copy({
      targets: [{ src: ["public/*", '!public/build'], dest: "dist" }],
    }),
    production && generateIndexHtml(),
  ],
  watch: {
    clearScreen: false,
  },
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        });
      }
    },
  };
}

function cleanUpDist() {
	return {
		buildStart() {
			rimraf.sync('dist');
		}
	};
}

function generateIndexHtml() {
  const hash = nanoid();
  return {
    generateBundle(output, bundle) {
      bundle["bundle.js"].fileName = `bundle.${hash}.js`;
      bundle["bundle.css"].fileName = `bundle.${hash}.css`;
      this.emitFile({
        type: "asset",
        fileName: "index.html",
        source: `<!DOCTYPE html>
<html lang="en">
	<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1" />

	<title>My Bad!</title>

	<link rel="icon" type="image/png" href="/favicon.ico" />
	<link rel="stylesheet" href="/global.css" />
	<link rel="stylesheet" href="/bundle.${hash}.css" />

	<script defer src="/bundle.${hash}.js"></script>
	</head>

	<body></body>
</html>`,
      });
    },
  };
}
