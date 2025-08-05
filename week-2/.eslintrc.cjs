module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react-hooks', 'react-refresh', 'import'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        importPlugin.configs.recommended,
        importPlugin.configs.typescript,
        'plugin:react-hooks/recommended',
        'plugin:react-refresh/recommended',
        'prettier'
    ],
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'object',
                    'type'
                ],
                pathGroups: [
                    {
                        pattern: '@/**',
                        group: 'internal',
                        position: 'before'
                    }
                ],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                }
            }
        ],
        'import/no-unresolved': 'error',
        'import/named': 'error',
        'import/no-cycle': 'warn'
    },
    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json'
            }
        }
    },
    ignorePatterns: [
        '**/dist/**',
        '**/node_modules/**',
        '**/*.config.js',
        '**/*.config.ts'
    ],
};
