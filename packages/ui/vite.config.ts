import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*'],
      exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
      outDir: ['lib', 'es'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ElixUI',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        if (format === 'es') {
          return 'index.js'
        }
        return 'index.js'
      },
    },
    rollupOptions: {
      external: ['vue', '@vue/shared'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: '.',
          dir: 'es',
          exports: 'named',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) return 'style.css'
            return 'assets/[name][extname]'
          },
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: '.',
          dir: 'lib',
          exports: 'named',
        },
      ],
    },
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})

