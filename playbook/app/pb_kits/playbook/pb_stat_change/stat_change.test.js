import React from 'react'
import { render, screen } from '../utilities/test-utils'

import StatChange from './_stat_change'

test('it renders each status', () => {
    render(
      <StatChange
          change="increase"
          value="28.4"
      />
    )

    const kit = screen.getByText('28.4%')
    expect(kit).toHaveClass(`pb_body_kit_positive`)
})

test('it renders preset icon', () => {
    render(
      <StatChange
          change="increase"
          id="preset-icon"
          value="28.4"
      />
    )

    const kit = document.querySelector('#preset-icon')
    const icon = kit.querySelector(".pb_custom_icon")
    expect(icon).toBeInTheDocument()
})

test('it renders custom icon', () => {
    render(
      <StatChange
          icon="chart-line-down"
          id="custom-icon"
          value={6.1}
      />

    )

    const kit = document.querySelector('#custom-icon')
    const icon = kit.querySelector(".pb_custom_icon")
    expect(icon).toBeInTheDocument()
})