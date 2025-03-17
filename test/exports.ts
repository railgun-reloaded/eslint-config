/**
 *
 */
function qux () { }

const foo = 1

class Foo {
  bar: number = 1

  static qux () {
    return true
  }
}

type bar = number

export type { bar }
export { foo, qux, Foo }
