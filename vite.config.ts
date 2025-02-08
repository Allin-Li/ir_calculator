import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { THEMES } from './src/constants/themes'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: 'theme-inject',
      transform(code, id) {
        if (id.endsWith('style.css')) {
          return {
            code: `
              @import "tailwindcss";
              @plugin "daisyui" {
                themes: ${THEMES.LIGHT} --default, ${THEMES.DARK};
              }
            `,
            map: null
          }
        }
      }
    }
  ],
  base: './',
})

