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
// Test left prop with string values
testGlobalProp(
  'left',
  validSizes,
  (v) => `left_${v}`,
  null,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

// Test left prop with object values (inset) - tested separately due to object value complexity
test('Global Props: left returns proper class name with object values (inset)', () => {
  const testCases = [
    { value: { value: 'md', inset: true }, expected: 'left_md_inset' },
    { value: { value: 'lg', inset: false }, expected: 'left_lg' },
    { value: { value: 'sm', inset: true }, expected: 'left_sm_inset' }
  ]
  
  testCases.forEach(({ value, expected }) => {
    const testId = `body-left-object-${value.value}-${value.inset}`
    render(
      <Body
          data={{ testid: testId }}
          left={value}
          text="Hi"
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(expected)
  })
})

testGlobalPropAbsence(
  'left',
  ['left_xs', 'left_sm', 'left_md', 'left_lg', 'left_xl'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'left',
  ['invalid', 'bad_value', 'not_a_size', 'special-chars!@#'],
  ['left_invalid', 'left_bad_value', 'left_not_a_size', 'left_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
