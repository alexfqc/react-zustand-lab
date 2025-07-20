import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import { globalIgnores } from "eslint/config";

export default [
  // Ignore dist and node_modules
  globalIgnores(["dist", "node_modules"]),

  // Config for TS/TSX
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2020,
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // TypeScript recommended + strict
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs.strictTypeChecked.rules,
      ...tseslint.configs.stylisticTypeChecked.rules,

      // React Hooks recommended
      ...reactHooks.configs["recommended-latest"].rules,

      // React Refresh (for Vite HMR)
      ...reactRefresh.configs.vite.rules,

      // Prettier (disable conflicting formatting rules)
      ...prettier.rules,

      // Custom Rules
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },

  // setup for JS/JSX
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: globals.browser,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettier.rules,
    },
  },
];
