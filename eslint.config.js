const neostandard = require('neostandard')

module.exports = [
  ...neostandard({
    ts: false,
    ignores: neostandard.resolveIgnoresFromGitignore(),
  })
]
