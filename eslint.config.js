import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist/', 'coverage/', 'node_modules/', 'demo/dist/']),
  js.configs.recommended,
  tseslint.configs.strict,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
]);
