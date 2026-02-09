import React from 'react'
import { testGlobalProp, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import { render, screen } from '../../test-utils'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

const validSizes = ['xs', 'sm', 'md', 'lg', 'xl']

// NOTE: TextInput excluded - positioning props are not valid for input elements
// Test bottom prop with string values
testGlobalProp(
  'bottom',
  validSizes,
  (v) => `bottom_${v}`,
  null,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

// Test bottom prop with object values (inset) - tested separately due to object value complexity
test('Global Props: bottom returns proper class name with object values (inset)', () => {
  const testCases = [
    { value: { value: 'md', inset: true }, expected: 'bottom_md_inset' },
    { value: { value: 'lg', inset: false }, expected: 'bottom_lg' },
    { value: { value: 'sm', inset: true }, expected: 'bottom_sm_inset' }
  ]
  
  testCases.forEach(({ value, expected }) => {
    const testId = `body-bottom-object-${value.value}-${value.inset}`
    render(
      <Body
          bottom={value}
          data={{ testid: testId }}
          text="Hi"
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(expected)
  })
})

testGlobalPropAbsence(
  'bottom',
  ['bottom_xs', 'bottom_sm', 'bottom_md', 'bottom_lg', 'bottom_xl'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'bottom',
  ['invalid', 'bad_value', 'not_a_size', 'special-chars!@#'],
  ['bottom_invalid', 'bottom_bad_value', 'bottom_not_a_size', 'bottom_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
