import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/dollar/',
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@assets', replacement: path.resolve(__dirname, 'src', 'assets') },
      { find: '@components', replacement: path.resolve(__dirname, 'src', 'components') },
      { find: '@services', replacement: path.resolve(__dirname, 'src', 'services') }
    ]
  }
})
