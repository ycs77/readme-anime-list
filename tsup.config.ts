import type { Options } from 'tsup'

export default <Options>{
  entry: ['index.js'],
  minify: true,
  format: ['cjs'],
}
