import { render, screen } from '../../test-utils'
import React from 'react'
import Card from '../../../pb_card/_card'

test('Global Props: gridTemplateColumns applies inline style on Card', () => {
  render(
    <Card
        data={{ testid: 'grid-template-columns' }}
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
    >
      Test
    </Card>
  )
  expect(screen.getByTestId('grid-template-columns')).toHaveStyle({
    gridTemplateColumns: 'repeat(3, 1fr)',
  })
})

test('Global Props: gridTemplateRows applies inline style on Card', () => {
  render(
    <Card
        data={{ testid: 'grid-template-rows' }}
        display="grid"
        gridTemplateRows="59px 341px"
    >
      Test
    </Card>
  )
  expect(screen.getByTestId('grid-template-rows')).toHaveStyle({
    gridTemplateRows: '59px 341px',
  })
})

test('Global Props: grid placement props apply inline styles on Card', () => {
  render(
    <Card
        data={{ testid: 'grid-placement' }}
        gridArea="header"
        gridColumn="1 / 3"
        gridRow="2"
    >
      Test
    </Card>
  )
  const kit = screen.getByTestId('grid-placement')
  expect(kit).toHaveStyle({
    gridColumn: '1 / 3',
    gridRow: '2',
    gridArea: 'header',
  })
})

test('Global Props: grid auto track sizes apply inline styles on Card', () => {
  render(
    <Card
        data={{ testid: 'grid-auto-tracks' }}
        display="grid"
        gridAutoColumns="minmax(100px, 1fr)"
        gridAutoRows="auto"
        gridTemplateAreas="'header header' 'sidebar main'"
    >
      Test
    </Card>
  )
  const kit = screen.getByTestId('grid-auto-tracks')
  expect(kit).toHaveStyle({
    gridAutoColumns: 'minmax(100px, 1fr)',
    gridAutoRows: 'auto',
    gridTemplateAreas: "'header header' 'sidebar main'",
  })
})
