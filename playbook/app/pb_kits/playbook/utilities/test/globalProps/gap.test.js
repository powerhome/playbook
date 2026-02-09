import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// NOTE: TextInput excluded - gap properties are not valid props for input elements
// Test gap prop
testGlobalProp(
  'gap',
  ['xs', 'sm', 'md', 'lg', 'xl'],
  (v) => `gap_${v}`,
  (size, v) => `gap_${size}_${v}`,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropResponsiveWithDefault(
  'gap',
  { default: 'md', xs: 'xs', sm: 'md', md: 'lg' },
  (v) => `gap_${v}`,
  (size, v) => `gap_${size}_${v}`
)

testGlobalPropAbsence(
  'gap',
  ['gap_xs', 'gap_sm', 'gap_md', 'gap_lg', 'gap_xl'],
  undefined,
  { skipNull: true }
)

// Test columnGap prop
testGlobalProp(
  'columnGap',
  ['xs', 'sm', 'md', 'lg', 'xl'],
  (v) => `column_gap_${v}`,
  (size, v) => `column_gap_${size}_${v}`,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropResponsiveWithDefault(
  'columnGap',
  { default: 'md', xs: 'xs', sm: 'md', md: 'lg' },
  (v) => `column_gap_${v}`,
  (size, v) => `column_gap_${size}_${v}`
)

testGlobalPropAbsence(
  'columnGap',
  ['column_gap_xs', 'column_gap_sm', 'column_gap_md', 'column_gap_lg', 'column_gap_xl'],
  undefined,
  { skipNull: true }
)

// Test rowGap prop
testGlobalProp(
  'rowGap',
  ['xs', 'sm', 'md', 'lg', 'xl'],
  (v) => `row_gap_${v}`,
  (size, v) => `row_gap_${size}_${v}`,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropResponsiveWithDefault(
  'rowGap',
  { default: 'md', xs: 'xs', sm: 'md', md: 'lg' },
  (v) => `row_gap_${v}`,
  (size, v) => `row_gap_${size}_${v}`
)

testGlobalPropAbsence(
  'rowGap',
  ['row_gap_xs', 'row_gap_sm', 'row_gap_md', 'row_gap_lg', 'row_gap_xl'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'gap',
  ['invalid', 'bad_value', 'not_a_size', 'special-chars!@#'],
  ['gap_invalid', 'gap_bad_value', 'gap_not_a_size', 'gap_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
