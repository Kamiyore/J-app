// eslint.config.js
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: [
            'node_modules/',
            'dist/',
            'build/',
            '.next/',
            '**/.next/**',
            'my-app/.next/**',
            'my-app/.turbo/**',
            'my-app/node_modules/**',
            'backend/dist/**',
            'backend/generated/**',
            'backend/**/*.js',
        ],
    },
    ...tseslint.configs.recommended,
    {
        rules: {
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
        },
    },
);
