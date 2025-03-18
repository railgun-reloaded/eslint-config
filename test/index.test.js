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

test('railgun-reloaded/jsdoc', async function (assert) {
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
