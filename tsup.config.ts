import type { Options } from 'tsup'

export default <Options>{
  entry: ['src/index.js'],
  minify: true,
  format: ['cjs'],
}
