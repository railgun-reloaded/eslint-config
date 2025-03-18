const { ESLint } = require('eslint')
const test = require('brittle')

async function getErrors (testFiles) {
  // 1. Create an instance.
  const eslint = new ESLint({
    cwd: `${process.cwd()}/test/test-project`
  })

  // 2. Lint files.
  const results = await eslint.lintFiles(testFiles)

  // 3. Return results
  return results
}

test('imports', async function (assert) {
  const [exportsOutput, importsOutput] = await getErrors(['src/imports/exports.ts', 'src/imports/imports.ts'])

  assert.ok(
    exportsOutput.messages[0].message === 'Type export a is not a value and should be exported using `export type`.',
    'Explicit type export'
  )

  assert.ok(
    importsOutput.messages[0].message === 'Imports "d" are only used as type.',
    'Explicit type import'
  )

  assert.ok(
    importsOutput.messages[1].message === 'There should be at least one empty line between import groups',
    'Space import groups'
  )

  assert.ok(
    importsOutput.messages[2].message === "Member 'b' of the import declaration should be sorted alphabetically.",
    'Sort import declaration'
  )

  assert.ok(
    importsOutput.messages[3].message === '`eslint` import should occur before import of `./exports`',
    'Group imports'
  )
})

test('jsdoc', async function (assert) {
  const [output] = await getErrors(['src/jsdoc.ts'])

  assert.ok(
    output.messages[0].message === 'Missing JSDoc comment.' &&
    output.messages[0].nodeType === 'FunctionDeclaration',
    'FunctionDeclaration JSDoc'
  )

  assert.ok(
    output.messages[1].message === 'Missing JSDoc comment.' &&
    output.messages[1].nodeType === 'ClassDeclaration',
    'ClassDeclaration JSDoc'
  )

  assert.ok(
    output.messages[2].message === 'Missing JSDoc comment.' &&
    output.messages[2].nodeType === 'PropertyDefinition',
    'PropertyDefinition JSDoc'
  )

  assert.ok(
    output.messages[3].message === 'Missing JSDoc comment.' &&
    output.messages[3].nodeType === 'FunctionExpression',
    'FunctionExpression JSDoc (class constructor)'
  )

  assert.ok(
    output.messages[4].message === 'Missing JSDoc comment.' &&
    output.messages[4].nodeType === 'FunctionExpression',
    'FunctionExpression JSDoc (class function)'
  )
})
