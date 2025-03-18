const { ESLint } = require('eslint')
// const test = require('brittle')

async function getErrors (testFile) {
  // 1. Create an instance.
  const eslint = new ESLint({
    cwd: `${process.cwd()}/test/test-project`
  })

  // 2. Lint files.
  const results = await eslint.lintFiles([testFile])

  // 3. Output results
  console.log(results[0].messages)
}

getErrors('src/jsdoc.ts')
