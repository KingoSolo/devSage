import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

// Workaround to get __dirname in ESM
const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // editor/jsconfig alias -> project src
      '@': resolve(__dirname, 'src'),
      // allow imports like `components/...` if code uses them
      components: resolve(__dirname, 'src/components'),
    },
  },
})
