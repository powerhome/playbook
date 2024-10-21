import { ensureAccessible, renderKit } from '../utilities/test-utils'

import { Link } from 'playbook-ui'

/* See these resources for more testing info:
  - https://github.com/testing-library/jest-dom#usage for useage and examples
  - https://jestjs.io/docs/en/using-matchers
*/

const props = {
  data: { testid: 'default' }
}

test('generated scaffold test - update me', () => {
  const kit = renderKit(Link , props)
  expect(kit).toBeInTheDocument()
})

it("should be accessible", async () => {
  ensureAccessible(Link, props)
})
