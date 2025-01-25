const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    ...[
      '@vercel/style-guide/eslint/node',
      '@vercel/style-guide/eslint/typescript',
      '@vercel/style-guide/eslint/browser',
      '@vercel/style-guide/eslint/react',
      '@vercel/style-guide/eslint/next',
    ].map(require.resolve),
    'turbo',
  ],
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
      node: {
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  // add rules configurations here
  rules: {
    'import/no-default-export': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/function-component-definition': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-sort-props': 'off',
    'react/no-array-index-key': 'off',
    camelcase: 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
  },
};
