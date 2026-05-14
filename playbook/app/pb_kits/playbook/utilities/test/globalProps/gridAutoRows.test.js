import React from 'react'
import { render, screen } from '../../test-utils'

import Layout from '../../../pb_layout/_layout'

test('Global Props: gridAutoRows token values generate classes', () => {
  render(
    <Layout
        data={{ testid: 'layout-grid-auto-rows-token' }}
        display="grid"
        gridAutoRows="max-content"
    >
      {'Test'}
    </Layout>
  )

  const layout = screen.getByTestId('layout-grid-auto-rows-token')

  expect(layout).toHaveClass('grid_auto_rows_max_content')
})

test('Global Props: gridAutoRows arbitrary values render as inline styles', () => {
  render(
    <Layout
        data={{ testid: 'layout-grid-auto-rows-inline' }}
        display="grid"
        gridAutoRows="120px"
    >
      {'Test'}
    </Layout>
  )

  const layout = screen.getByTestId('layout-grid-auto-rows-inline')

  expect(layout.className).not.toContain('grid_auto_rows_120px')
  expect(layout).toHaveStyle({ gridAutoRows: '120px' })
})