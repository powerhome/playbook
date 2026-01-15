import { testGlobalProp, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

const validHeightValues = ['auto', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl']

// NOTE: TextInput excluded - height properties are not valid props for input elements
// Test height prop
testGlobalProp(
  'height',
  validHeightValues,
  (v) => `height_${v}`,
  null,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropAbsence(
  'height',
  ['height_auto', 'height_xs', 'height_sm', 'height_md', 'height_lg', 'height_xl', 'height_xxl', 'height_xxxl'],
  undefined,
  { skipNull: true }
)

// Test minHeight prop
testGlobalProp(
  'minHeight',
  validHeightValues,
  (v) => `min_height_${v}`,
  null,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropAbsence(
  'minHeight',
  ['min_height_auto', 'min_height_xs', 'min_height_sm', 'min_height_md', 'min_height_lg', 'min_height_xl', 'min_height_xxl', 'min_height_xxxl'],
  undefined,
  { skipNull: true }
)

// Test maxHeight prop
testGlobalProp(
  'maxHeight',
  validHeightValues,
  (v) => `max_height_${v}`,
  null,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropAbsence(
  'maxHeight',
  ['max_height_auto', 'max_height_xs', 'max_height_sm', 'max_height_md', 'max_height_lg', 'max_height_xl', 'max_height_xxl', 'max_height_xxxl'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'height',
  ['invalid', 'bad_value', 'not_a_height', 'special-chars!@#', '100px', '50%'],
  ['height_invalid', 'height_bad_value', 'height_not_a_height', 'height_special-chars!@#', 'height_100px', 'height_50_percent'],
  undefined,
  { skipKnownIssues: true }
)
