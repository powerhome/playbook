import { testGlobalProp, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// NOTE: TextInput excluded - width properties are not valid props for input elements
// Test width prop
testGlobalProp(
  'width',
  ['100%', '50%', '25%', 'auto', '100px'],
  (v) => `width_${v.replace('%', '_percent')}`,
  null,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropAbsence(
  'width',
  ['width_100_percent', 'width_50_percent', 'width_auto', 'width_100px'],
  undefined,
  { skipNull: true }
)

// Test minWidth prop
testGlobalProp(
  'minWidth',
  ['100%', '50%', '25%', 'auto', '100px'],
  (v) => `min_width_${v.replace('%', '_percent')}`,
  null,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropAbsence(
  'minWidth',
  ['min_width_100_percent', 'min_width_50_percent', 'min_width_auto', 'min_width_100px'],
  undefined,
  { skipNull: true }
)

// Test maxWidth prop
testGlobalProp(
  'maxWidth',
  ['100%', '50%', '25%', 'auto', '100px'],
  (v) => `max_width_${v.replace('%', '_percent')}`,
  null,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropAbsence(
  'maxWidth',
  ['max_width_100_percent', 'max_width_50_percent', 'max_width_auto', 'max_width_100px'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'width',
  ['invalid', 'bad_value', 'not_a_width', 'special-chars!@#'],
  ['width_invalid', 'width_bad_value', 'width_not_a_width', 'width_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
