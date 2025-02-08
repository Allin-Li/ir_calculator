import { fileURLToPath } from "url";
import path from "path";
import vueEslintParser from "vue-eslint-parser";
import vuePlugin from "eslint-plugin-vue";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/dist-ssr/**",
      "**/coverage/**",
      "**/src-tauri/**",
      "eslint.config.ts"
    ]
  },
  {
    files: ["**/*.{ts,tsx,vue}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
        tsconfigRootDir: __dirname,
        extraFileExtensions: [".vue"],
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    rules: {
      "no-console": "warn",
      "no-debugger": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error"
    }
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: tsParser,
        project: path.join(__dirname, "tsconfig.json"),
        tsconfigRootDir: __dirname,
        extraFileExtensions: [".vue"],
        sourceType: "module"
      }
    },
    plugins: {
      vue: vuePlugin
    },
    rules: {
      "vue/multi-word-component-names": "off",
      // Vue 3 essential rules
      "vue/no-unused-components": "error",
      "vue/require-v-for-key": "error",
      "vue/valid-template-root": "error",
      // Vue 3 strongly recommended rules
      "vue/attribute-hyphenation": "error",
      "vue/component-definition-name-casing": ["error", "PascalCase"],
      "vue/v-bind-style": "error",
      // Vue 3 recommended rules
      "vue/component-tags-order": ["error", {
        order: ["script", "template", "style"]
      }],
      "vue/no-v-html": "error"
    }
  }
];
