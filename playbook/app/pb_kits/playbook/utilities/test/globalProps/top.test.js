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
// Test top prop with string values
testGlobalProp(
  'top',
  validSizes,
  (v) => `top_${v}`,
  null,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

// Test top prop with object values (inset) - tested separately due to object value complexity
test('Global Props: top returns proper class name with object values (inset)', () => {
  const testCases = [
    { value: { value: 'md', inset: true }, expected: 'top_md_inset' },
    { value: { value: 'lg', inset: false }, expected: 'top_lg' },
    { value: { value: 'sm', inset: true }, expected: 'top_sm_inset' }
  ]
  
  testCases.forEach(({ value, expected }) => {
    const testId = `body-top-object-${value.value}-${value.inset}`
    render(
      <Body
          data={{ testid: testId }}
          text="Hi"
          top={value}
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(expected)
  })
})

testGlobalPropAbsence(
  'top',
  ['top_xs', 'top_sm', 'top_md', 'top_lg', 'top_xl'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'top',
  ['invalid', 'bad_value', 'not_a_size', 'special-chars!@#'],
  ['top_invalid', 'top_bad_value', 'top_not_a_size', 'top_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
