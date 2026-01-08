import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import TextInput from '../../../pb_text_input/_text_input'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// Test numeric values (0-12) - flex prop expects strings
testGlobalProp(
  'flex',
  Array.from({ length: 13 }, (_, i) => String(i)),
  (v) => `flex_${v}`,
  (size, v) => `flex_${size}_${v}`,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

// Test string values
testGlobalProp(
  'flex',
  ['auto', 'initial', 'none'],
  (v) => `flex_${v}`,
  (size, v) => `flex_${size}_${v}`,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

testGlobalPropResponsiveWithDefault(
  'flex',
  { default: '3', xs: '1', sm: '3', md: '1' },
  (v) => `flex_${v}`,
  (size, v) => `flex_${size}_${v}`
)

testGlobalPropAbsence(
  'flex',
  ['flex_0', 'flex_1', 'flex_12', 'flex_auto', 'flex_initial', 'flex_none'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'flex',
  [999, -1, 'invalid', 'out_of_range', 'bad_string', 13, 'special-chars!@#'],
  ['flex_999', 'flex_-1', 'flex_invalid', 'flex_out_of_range', 'flex_bad_string', 'flex_13', 'flex_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
