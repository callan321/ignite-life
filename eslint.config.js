import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unicorn from "eslint-plugin-unicorn";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: ["dist", "build", "node_modules", "public", ".react-router"],
  },

  // Base JS/TS/React rules
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        NodeJS: "readonly",
        React: "readonly",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      unicorn,
      prettier,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended[0].rules,

      // React
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",

      // React Hooks
      ...reactHooks.configs.recommended.rules,

      // React Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Unicorn
      "unicorn/filename-case": ["error", { cases: { kebabCase: true } }],

      // Prettier
      "prettier/prettier": ["error"],
    },
  },

  // TypeScript-specific rules
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/naming-convention": [
        "error",

        // Default identifiers
        {
          selector: "default",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },

        // Functions: camelCase or PascalCase
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
        },

        // Constants: PascalCase or UPPER_CASE or camelCase
        {
          selector: "variable",
          modifiers: ["const"],
          format: ["UPPER_CASE", "PascalCase", "camelCase"],
        },

        // All other variable-like things
        {
          selector: "variableLike",
          format: ["camelCase"],
        },

        // Types, classes, interfaces, enums
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },

        // Interfaces — no I-prefix
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: {
            regex: "^I[A-Z]",
            match: false,
          },
        },

        // Imports
        {
          selector: "import",
          format: ["camelCase", "PascalCase"],
        },
      ],
    },
  },
]);
