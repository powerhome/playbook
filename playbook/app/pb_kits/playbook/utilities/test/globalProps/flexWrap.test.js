import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// Note: TextInput excluded - flexWrap is a flexbox property that doesn't apply to form inputs
testGlobalProp(
  'flexWrap',
  ['wrap', 'nowrap', 'wrapReverse'],
  (v) => `flex_wrap_${camelToSnakeCase(v)}`,
  (size, v) => `flex_wrap_${size}_${camelToSnakeCase(v)}`,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropResponsiveWithDefault(
  'flexWrap',
  { default: 'wrap', xs: 'nowrap', sm: 'wrap', md: 'nowrap' },
  (v) => `flex_wrap_${camelToSnakeCase(v)}`,
  (size, v) => `flex_wrap_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropAbsence(
  'flexWrap',
  ['flex_wrap_wrap', 'flex_wrap_nowrap', 'flex_wrap_wrap_reverse'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
// NOTE: Using allowRenderingErrors: true because invalid types (like numbers) cause rendering errors with camelToSnakeCase
testGlobalPropInvalidValues(
  'flexWrap',
  ['invalid', 'bad_value', 'not_a_wrap_value', 'special-chars!@#'],
  ['flex_wrap_invalid', 'flex_wrap_bad_value', 'flex_wrap_not_a_wrap_value', 'flex_wrap_special-chars!@#'],
  undefined,
  { skipKnownIssues: true, allowRenderingErrors: true }
)
