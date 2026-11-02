import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist/', 'coverage/', 'node_modules/', 'demo/dist/']),
  js.configs.recommended,
  tseslint.configs.strict,
  {
    files: ['demo/**/*.tsx'],
    extends: [
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs.flat.recommended,
    ],
    settings: { react: { version: '19.3' } },
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
]);
