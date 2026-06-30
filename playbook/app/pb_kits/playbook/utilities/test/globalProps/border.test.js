import React from 'react'
import { render, screen } from '../../test-utils'
import { testGlobalProp, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

const borderClass = (v) => (v === 'none' ? 'border_none' : `border_${v}`)

const borderValidValues = [
  'none',
  'default',
  'active',
  'default_thick',
  'default_thicker',
  'active_thick',
  'active_thicker',
]

testGlobalProp(
  'border',
  borderValidValues,
  borderClass,
  null,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

test('Global Props: borderTop / borderX generate expected classes', () => {
  render(
    <Body borderTop="default"
        borderX="default"
        borderY="default"
        data={{ testid: 'border-sides' }}
        text="Hi"
    />
  )
  const el = screen.getByTestId('border-sides')
  expect(el).toHaveClass('border_top_default')
  expect(el).toHaveClass('border_x_default')
})

testGlobalPropAbsence(
  'border',
  [
    'border_none',
    'border_default',
    'border_top_none',
    'border_top_default',
    'border_x_default',
    'border_y_default',
  ],
  undefined,
  { skipNull: true }
)

testGlobalPropInvalidValues(
  'border',
  ['invalid', 'bad', 'special!@#'],
  ['border_invalid', 'border_bad', 'border_special!@#'],
  undefined,
  { skipKnownIssues: true }
)