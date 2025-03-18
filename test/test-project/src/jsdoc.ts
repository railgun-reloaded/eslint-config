function noJSDoc() {
  console.log('Hello World')
}

class NoJSDoc {
  state: number

  constructor (initial: number) {
    this.state = initial
  }

  increment() {
    this.state += 1
  }
}

export { noJSDoc, NoJSDoc }
