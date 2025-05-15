import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
// import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  { ignores: ["dist", "ignores"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      // prettier: eslintPluginPrettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "prettier/prettier": [
        "warn",
        {
          arrowParens: "always",
          tabWidth: 2,
          endOfLine: "auto",
          useTabs: false,
          printWidth: 120,
        },
      ],
      "no-console": "error",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
];
