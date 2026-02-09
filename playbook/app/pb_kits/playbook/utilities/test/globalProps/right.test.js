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
// Test right prop with string values
testGlobalProp(
  'right',
  validSizes,
  (v) => `right_${v}`,
  null,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

// Test right prop with object values (inset) - tested separately due to object value complexity
test('Global Props: right returns proper class name with object values (inset)', () => {
  const testCases = [
    { value: { value: 'md', inset: true }, expected: 'right_md_inset' },
    { value: { value: 'lg', inset: false }, expected: 'right_lg' },
    { value: { value: 'sm', inset: true }, expected: 'right_sm_inset' }
  ]
  
  testCases.forEach(({ value, expected }) => {
    const testId = `body-right-object-${value.value}-${value.inset}`
    render(
      <Body
          data={{ testid: testId }}
          right={value}
          text="Hi"
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(expected)
  })
})

testGlobalPropAbsence(
  'right',
  ['right_xs', 'right_sm', 'right_md', 'right_lg', 'right_xl'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'right',
  ['invalid', 'bad_value', 'not_a_size', 'special-chars!@#'],
  ['right_invalid', 'right_bad_value', 'right_not_a_size', 'right_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
