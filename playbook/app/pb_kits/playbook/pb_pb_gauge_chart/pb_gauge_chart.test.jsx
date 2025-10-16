import React from 'react'
import { render, screen } from '../utilities/test-utils'

import { PbGaugeChart } from 'playbook-ui'

/* See these resources for more testing info:
  - https://github.com/testing-library/jest-dom#usage for useage and examples
  - https://jestjs.io/docs/en/using-matchers
*/

test('generated scaffold test - update me', () => {
  const props = {
    data: { testid: 'default' }
  }

  render(<PbGaugeChart {...props} />)
    expect(screen.getByTestId('default')).toBeInTheDocument()
})
