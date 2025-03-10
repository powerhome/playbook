import { renderKit } from '../utilities/test-utils'

import Map from '../../pb_map/_map'

/* See these resources for more testing info:
  - https://github.com/testing-library/jest-dom#usage for useage and examples
  - https://jestjs.io/docs/en/using-matchers
*/

test('generated scaffold test - update me', () => {
  const props = {
    data: { testid: 'default' }
  }

  const kit = renderKit(Map , props)
  expect(kit).toBeInTheDocument()
})
