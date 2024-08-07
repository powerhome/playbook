import React from 'react'
import { render, screen } from '../utilities/test-utils'

import OnlineStatus from './_online_status'

const testId = 'online-status'

test('renders online status with defaults', () => {
  render(
    <OnlineStatus data={{ testid: testId }} />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_online_status_kit_offline_size_sm')
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
  expect(kit).toHaveClass('pb_online_status_kit_online_no_border_size_lg dark additional_class')
})
