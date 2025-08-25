import React from 'react'
import { render, screen } from '../utilities/test-utils'

import OnlineStatus from './_online_status'

const testId = 'online-status'

test('renders online status with defaults', () => {
  render(
    <OnlineStatus data={{ testid: testId }} />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_online_status_kit pb_online_status_size_sm pb_online_status_offline')
})

test('renders online status with props', () => {
  render(
    <OnlineStatus
        className="additional_class"
        dark
        data={{ testid: testId }}
        noBorder
        size="lg"
        status="online"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_online_status_kit_no_border pb_online_status_size_lg pb_online_status_online dark additional_class')
})
