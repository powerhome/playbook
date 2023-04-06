import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: './index.js',
  output: {
    file: 'dist/my-library.min.js',
    format: 'iife',
    name: 'MyLibrary',
    sourcemap: true,
  },
  plugins: [resolve(), commonjs(), terser()],
};