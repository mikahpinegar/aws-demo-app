import react from 'eslint-plugin-react';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [...compat.extends('plugin:react/recommended', 'airbnb'), {
  plugins: {
    react,
  },

  languageOptions: {
    globals: {
      ...globals.browser,
    },

    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },

  rules: {
    'react/prop-types': [0],
    'react/jsx-filename-extension': [0],
    'react/no-array-index-key': [0],
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': [0],

    'max-len': ['error', {
      code: 150,
    }],

    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true,
    }],

    'react/function-component-definition': [2, {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    }],
  },
}];
