import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist/', 'coverage/', 'reports/', '.stryker-tmp/'] },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: { globals: { ...globals.node, ...globals.jest } },
    },
    {
        files: ['**/*.js'],
        rules: { '@typescript-eslint/no-require-imports': 'off' },
    },
);
