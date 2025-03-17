# `@railgun-reloaded/eslint-config`

> Shared eslint config for railgun-reloaded projects

## Usage

Add the following to your `eslint.config.js`:

```js
module.exports = [
  ...require('@railgun-reloaded/eslint-config')(),
  // Any additional rules
]
```

## API

### `const configs = eslintConfig([opts])`

Returns a flat array of predefined config for `eslint` based on [`neostandard`](https://github.com/neostandard/neostandard)
and the [`jsdoc` plugin](https://github.com/gajus/eslint-plugin-jsdoc).
`opts` is passed to `neostandard` and allows overriding any of their options. This config 
enables TypeScript checking and does not lint any files ignored by `.gitignore`.

## Install

```bash
npm install --save-dev @railgun-reloaded/eslint-config
```

## License

[MIT](LICENSE)
