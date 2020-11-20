export default {
  extensions: ['.js', '.cjs', '.mjs', '.html', '.svelte'],
  babelHelpers: 'runtime',
  exclude: ['node_modules/@babel/**', 'node_modules/core-js/**'],
  compact: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: ['> 0.25%, not dead', 'ie >= 11'],
        useBuiltIns: 'usage',
        forceAllTransforms: true,
        corejs: 3,
      },
    ],
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-arrow-functions',
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules: true,
      },
    ],
  ],
};
