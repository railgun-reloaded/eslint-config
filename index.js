const jsdoc = require('eslint-plugin-jsdoc')
const neostandard = require('neostandard')

module.exports = function eslintConfig(opts = {}) {
  const neoconf = neostandard({
    ts: true,
    ignores: neostandard.resolveIgnoresFromGitignore(),
    ...opts
  })

  return [
    ...neoconf,
    jsdoc.configs['flat/recommended-typescript'],
    {
      plugins: {
        '@typescript-eslint': neostandard.plugins['typescript-eslint'].plugin
      },
      languageOptions: {
        parser: neostandard.plugins['typescript-eslint'].parser,
        parserOptions: {
          project: true
        }
      },
      rules: {
        'sort-imports': [
          'error',
          {
            ignoreDeclarationSort: true
          }
        ],
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/consistent-type-exports': 'error',
        'import-x/no-extraneous-dependencies': [
          'error',
          { devDependencies: true }
        ],
        'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        'import-x/exports-last': 'error',
        'import-x/group-exports': 'error',
        'import-x/order': [
          'error',
          {
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
              orderImportKind: 'asc'
            },
            'newlines-between': 'always'
          }
        ]
      }
    }
  ]
}
