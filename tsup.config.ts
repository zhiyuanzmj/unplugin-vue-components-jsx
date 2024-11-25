import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/volar.ts'],
  format: ['cjs', 'esm'],
  splitting: true,
  clean: true,
  dts: true,
  shims: true,
})
