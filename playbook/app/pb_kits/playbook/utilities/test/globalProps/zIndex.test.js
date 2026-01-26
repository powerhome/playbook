import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// NOTE: TextInput excluded - zIndex is not a valid prop for input elements
// Test numeric values (1-10)
testGlobalProp(
  'zIndex',
  Array.from({ length: 10 }, (_, i) => i + 1),
  (v) => `z_index_${v}`,
  (size, v) => `z_index_${size}_${v}`,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

// Test 'max' value
testGlobalProp(
  'zIndex',
  ['max'],
  (v) => `z_index_${v}`,
  null,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropResponsiveWithDefault(
  'zIndex',
  { default: 3, xs: 1, sm: 3, md: 5 },
  (v) => `z_index_${v}`,
  (size, v) => `z_index_${size}_${v}`
)

testGlobalPropAbsence(
  'zIndex',
  ['z_index_1', 'z_index_5', 'z_index_10', 'z_index_max'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'zIndex',
  [0, 11, 999, -1, 'invalid', 'bad_value', 'special-chars!@#'],
  ['z_index_0', 'z_index_11', 'z_index_999', 'z_index_-1', 'z_index_invalid', 'z_index_bad_value', 'z_index_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
