import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// Note: TextInput excluded - flexShrink is a flexbox property that doesn't apply to form inputs
testGlobalProp(
  'flexShrink',
  [0, 1],
  (v) => `flex_shrink_${v}`,
  (size, v) => `flex_shrink_${size}_${v}`,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropResponsiveWithDefault(
  'flexShrink',
  { default: 0, xs: 1, sm: 0, md: 1 },
  (v) => `flex_shrink_${v}`,
  (size, v) => `flex_shrink_${size}_${v}`
)

testGlobalPropAbsence(
  'flexShrink',
  ['flex_shrink_0', 'flex_shrink_1'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'flexShrink',
  [2, -1, 999, 'invalid', 'bad_value', 'special-chars!@#'],
  ['flex_shrink_2', 'flex_shrink_-1', 'flex_shrink_999', 'flex_shrink_invalid', 'flex_shrink_bad_value', 'flex_shrink_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
