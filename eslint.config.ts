import { fileURLToPath } from "url";
import path from "path";
import vueEslintParser from "vue-eslint-parser";
import vuePlugin from "eslint-plugin-vue";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from 'eslint-config-prettier'

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
      // Core rules
      "no-console": "warn",
      "no-debugger": "error",

      // TypeScript rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-non-null-assertion": "error"
    }
  },
  {
    files: ["**/*.vue"],
    ...prettier,
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
      ...prettier.rules,
      ...vuePlugin.configs.base.rules,
      ...vuePlugin.configs["vue3-essential"].rules,
      ...vuePlugin.configs["vue3-strongly-recommended"].rules,
      ...vuePlugin.configs["vue3-recommended"].rules,

      "vue/comment-directive": "off",
      "vue/multi-word-component-names": "off",

      "vue/html-self-closing": "off",
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/multiline-html-element-newline": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/html-indent": "off",
      "vue/html-quotes": "off"
    }
  }
];
