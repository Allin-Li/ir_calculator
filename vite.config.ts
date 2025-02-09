import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { THEMES, DEFAULT_THEME } from './src/constants/themes'

export default defineConfig({
  plugins: [
    {
      name: 'theme-inject',
      transform(code: string, id: string): { code: string; map: null } | undefined {
        if (id.endsWith('style.css')) {
          const daisyuiThemes = [DEFAULT_THEME, THEMES.DARK].join(', ');
          const injectedCode = `@plugin "daisyui" {
  themes: ${daisyuiThemes};
}`;
          const modifiedCode = code + '\n' + injectedCode;
          return {
            code: modifiedCode,
            map: null,
          };
        }
        return undefined;
      },
      enforce: 'pre',
    },
    tailwindcss(),
    vue(),
  ],
  base: './',
});
