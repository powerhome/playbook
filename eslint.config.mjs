import babelParser from '@babel/eslint-parser'
import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

const files = ['**/*.{js,jsx,ts,tsx}']
const kitFiles = ['playbook/**/*.{js,jsx,ts,tsx}']
const tsFiles = ['**/*.{ts,tsx}']

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.*',
      '**/*.d.ts',
      '**/coverage/**',
      '**/doc/**',
      '**/spec/dummy/**',
      '**/vendor/**',
      'playbook/flow-typed/**',
      'playbook/fonts/**',
      'playbook/dist/**',
      'playbook-website/**',
    ],
  },
  {
    files,
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          parserOpts: { plugins: ['jsx'] },
        },
      },
      globals: { ...globals.browser, ...globals.node, ...globals.mocha },
    },
    linterOptions: { reportUnusedDisableDirectives: false },
    plugins: { react, 'react-hooks': reactHooks },
    settings: { react: { version: 'detect' } },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      // Keep the existing Hooks checks without enabling new compiler rules.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-console': 'warn',
      'no-extra-semi': 'error',
      'no-inner-declarations': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-undef': 'off',
      'no-restricted-globals': ['warn', { name: 'moment' }],
      // ESLint 9 checks catch bindings by default; ESLint 6/7 did not.
      'no-unused-vars': ['error', { caughtErrors: 'none' }],
      'no-use-before-define': ['error', { functions: true, classes: true }],
      'react/forbid-prop-types': 'error',
      'react/jsx-boolean-value': 'error',
      'react/jsx-closing-bracket-location': 'warn',
      'react/jsx-curly-spacing': 'error',
      'react/jsx-handler-names': 'error',
      'react/jsx-indent-props': 'error',
      'react/jsx-max-props-per-line': 'error',
      'react/jsx-no-bind': 'off',
      'react/jsx-no-literals': 'warn',
      'react/jsx-no-undef': ['error', { allowGlobals: true }],
      'react/jsx-pascal-case': 'error',
      'react/jsx-sort-props': 'error',
      'react/jsx-wrap-multilines': 'error',
      'react/no-danger': 'warn',
      'react/no-did-mount-set-state': 'error',
      'react/no-did-update-set-state': 'error',
      'react/no-multi-comp': 'warn',
      'react/no-set-state': 'warn',
      'react/prefer-es6-class': 'error',
      'react/prop-types': 'warn',
      'react/self-closing-comp': 'error',
      'react/sort-comp': 'warn',
    },
  },
  {
    files: kitFiles,
    languageOptions: { globals: { expect: 'readonly', jest: 'readonly' } },
    rules: {
      'no-undef': 'error',
      'no-restricted-globals': 'warn',
      'no-use-before-define': ['warn', { functions: true, classes: true }],
    },
  },
  {
    files: tsFiles,
    languageOptions: { parser: tsParser },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs['eslint-recommended'].overrides[0].rules,
      ...tsPlugin.configs.recommended.rules,
      'no-use-before-define': 'off',
      '@typescript-eslint/no-array-constructor': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-use-before-define': ['error', { functions: true, classes: true }],
    },
  },
  {
    files: ['playbook/**/*.{ts,tsx}'],
    rules: { '@typescript-eslint/explicit-module-boundary-types': 'warn' },
  },
]
