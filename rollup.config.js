import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';
import babel from '@rollup/plugin-babel';
import bundleSize from 'rollup-plugin-bundle-size';
import babelConfig from './rollup-babel-config';
import rimraf from 'rimraf';
import { customAlphabet } from 'nanoid';
// import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;
const buildDirectory = production ? 'dist' : 'public/build';
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 6);

export default {
  input: 'src/app.js',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    file: `${buildDirectory}/bundle.js`,
  },
  plugins: [
    production && cleanUpDist(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE),
    }),

    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance

      css: css => {
        css.write('bundle.css', !production);
      },
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: importee =>
        importee === 'svelte' || importee.startsWith('svelte/'),
      mainFields: ['main', 'module'],
    }),
    commonjs(),

    // importing JSON
    json(),

    // Babel for IE11 config
    babel(babelConfig),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    // production && terser(), //not working on azure devops...
    production &&
      copy({
        targets: [{ src: ['public/*', '!public/build'], dest: 'dist' }],
      }),
    production && generateIndexHtml(),
    production && bundleSize(),
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

        require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
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
    },
  };
}

function generateIndexHtml() {
  const hash = nanoid();
  return {
    generateBundle(output, bundle) {
      bundle['bundle.js'].fileName = `bundle.${hash}.js`;
      bundle['bundle.css'].fileName = `bundle.${hash}.css`;
      this.emitFile({
        type: 'asset',
        fileName: 'index.html',
        source: `<!DOCTYPE html>
<html lang="en">
	<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />

	<title>My Bad!</title>

  <link rel="icon" type="image/png" href="/favicon.ico" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css" integrity="sha256-BJ/G+e+y7bQdrYkS2RBTyNfBHpA9IuGaPmf9htub5MQ=" crossorigin="anonymous" />
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
