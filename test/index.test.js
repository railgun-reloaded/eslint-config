const { ESLint } = require('eslint')
const test = require('brittle')

async function getErrors (testFile) {
  // 1. Create an instance.
  const eslint = new ESLint({
    cwd: `${process.cwd()}/test/test-project`
  })

  // 2. Lint files.
  const results = await eslint.lintFiles([testFile])

  // 3. Output results
  return results
}

// test('railgun-reloaded/typescript-eslint', async function (assert) {
//   const output = await getErrors('src/jsdoc.ts')

//   console.log(output)
// })

// test('railgun-reloaded/imports', async function (assert) {
//   const output = await getErrors('src/jsdoc.ts')

//   console.log(output)
// })

test('railgun-reloaded/jsdoc', async function (assert) {
  const output = await getErrors('src/jsdoc.ts')

  assert.ok(
    output[0].messages[0].message === 'Missing JSDoc comment.' &&
    output[0].messages[0].nodeType === 'FunctionDeclaration',
    'Function JSDoc'
  )

  assert.pass()
})
