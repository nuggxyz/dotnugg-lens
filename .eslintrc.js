/** @format */

module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'prettier',
        'import',
        'unused-imports',
        'react-hooks',
    ],
    rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        // 'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/prop-types': 'off',
        'react/display-name': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'prettier/prettier': 'warn',
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        ],
        'no-unused-vars': 'off',
        // '@typescript-eslint/no-unused-vars': ['error'],
        // 'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'off',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
        // 'import/resolver': {
        //     'babel-module': {},
        // },
        'import/order': [
            'warn',
            {
                pathGroups: [
                    {
                        pattern: '@src/*',
                        group: 'internal',
                        // position: 'after',
                    },
                ],
                'newlines-between': 'always',
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'object',
                ],
            },
        ],
    },
};
