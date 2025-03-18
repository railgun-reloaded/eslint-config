const jsdoc = require('eslint-plugin-jsdoc')
const neostandard = require('neostandard')

module.exports = function eslintConfig (opts = {}) {
  const neoconf = neostandard({
    ts: true,
    ignores: neostandard.resolveIgnoresFromGitignore(),
    ...opts
  })

  // AST Contexts we want JSDoc enforced in
  const jsdocContexts = [
    'ArrowFunctionExpression',
    'ClassDeclaration',
    'ClassExpression',
    'FunctionDeclaration',
    'FunctionExpression',
    'MethodDefinition',
    'PropertyDefinition',
  ]

  const reloadedTypescriptEslint = {
    name: 'railgun-reloaded/typescript-eslint',
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
      '@typescript-eslint/consistent-type-imports': 'error', // Importing types must be done with import type
      '@typescript-eslint/consistent-type-exports': 'error', // Exporting types must be done with export type
    }
  }

  const reloadedImports = {
    name: 'railgun-reloaded/imports',
    rules: {
      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true
        }
      ], // Sorts imports within an import line, declaration sort is disabled and handled in import-x/order which has type import support
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
      ], // Sort import statements, grouped by type
      'import-x/no-extraneous-dependencies': [
        'error',
        { devDependencies: true }
      ], // Don't allow imports from packages that aren't in dependencies or dev dependencies
      'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'], // Types must be imported with `import type { TYPE_A, TYPE_B} from 'module'`
      'import-x/exports-last': 'error', // Exports must be done at end of file
      'import-x/group-exports': 'error', // Exports must be grouped in a single declaration
    }
  }

  const reloadedJSDoc = {
    name: 'railgun-reloaded/jsdoc',
    rules: {
      'jsdoc/require-jsdoc': ['error', {
        contexts: jsdocContexts
      }], // JSDoc must be present on specified contexts
      'jsdoc/require-description': ['error', {
        contexts: jsdocContexts
      }], // JSDoc must have description on specified contexts
    }
  }

  return [
    ...neoconf,
    jsdoc.configs['flat/recommended-typescript-error'],
    reloadedTypescriptEslint,
    reloadedImports,
    reloadedJSDoc,
  ]
}
