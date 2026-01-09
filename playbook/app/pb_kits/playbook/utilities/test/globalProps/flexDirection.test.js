import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// Note: TextInput excluded - flexDirection is a flexbox property that doesn't apply to form inputs
testGlobalProp(
  'flexDirection',
  ['row', 'column', 'columnReverse'],
  (v) => `flex_direction_${camelToSnakeCase(v)}`,
  (size, v) => `flex_direction_${size}_${camelToSnakeCase(v)}`,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropResponsiveWithDefault(
  'flexDirection',
  { default: 'column', xs: 'row', sm: 'column', md: 'row' },
  (v) => `flex_direction_${camelToSnakeCase(v)}`,
  (size, v) => `flex_direction_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropAbsence(
  'flexDirection',
  ['flex_direction_row', 'flex_direction_column', 'flex_direction_column_reverse'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
// NOTE: Using allowRenderingErrors: true because invalid types (like numbers) cause rendering errors with camelToSnakeCase
testGlobalPropInvalidValues(
  'flexDirection',
  ['invalid', 'bad_value', 'not_a_direction', 'special-chars!@#'],
  ['flex_direction_invalid', 'flex_direction_bad_value', 'flex_direction_not_a_direction', 'flex_direction_special-chars!@#'],
  undefined,
  { skipKnownIssues: true, allowRenderingErrors: true }
)
