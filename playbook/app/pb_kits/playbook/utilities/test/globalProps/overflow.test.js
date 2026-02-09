import { testGlobalProp, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

const validValues = ['scroll', 'visible', 'hidden', 'auto']

// NOTE: TextInput excluded - overflow properties are not valid props for input elements
// Test overflow prop
testGlobalProp(
  'overflow',
  validValues,
  (v) => `overflow_${v}`,
  null,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropAbsence(
  'overflow',
  ['overflow_scroll', 'overflow_visible', 'overflow_hidden', 'overflow_auto'],
  undefined,
  { skipNull: true }
)

// Test overflowX prop
testGlobalProp(
  'overflowX',
  validValues,
  (v) => `overflow_x_${v}`,
  null,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropAbsence(
  'overflowX',
  ['overflow_x_scroll', 'overflow_x_visible', 'overflow_x_hidden', 'overflow_x_auto'],
  undefined,
  { skipNull: true }
)

// Test overflowY prop
testGlobalProp(
  'overflowY',
  validValues,
  (v) => `overflow_y_${v}`,
  null,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropAbsence(
  'overflowY',
  ['overflow_y_scroll', 'overflow_y_visible', 'overflow_y_hidden', 'overflow_y_auto'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'overflow',
  ['invalid', 'bad_value', 'not_an_overflow', 'special-chars!@#'],
  ['overflow_invalid', 'overflow_bad_value', 'overflow_not_an_overflow', 'overflow_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
