import type { bar } from './exports'
import { foo, qux } from './exports'

/**
 *
 */
export function foo2 (): bar {
  return qux() ?? foo
}
