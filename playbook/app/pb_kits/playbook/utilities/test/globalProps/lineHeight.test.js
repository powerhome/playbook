import { testGlobalProp, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// NOTE: TextInput excluded - lineHeight is not a valid prop for input elements
testGlobalProp(
  'lineHeight',
  ['loosest', 'looser', 'loose', 'normal', 'tight', 'tighter', 'tightest'],
  (v) => `line_height_${v}`,
  null,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropAbsence(
  'lineHeight',
  ['line_height_loosest', 'line_height_looser', 'line_height_loose', 'line_height_normal', 'line_height_tight', 'line_height_tighter', 'line_height_tightest'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'lineHeight',
  ['invalid', 'bad_value', 'not_a_line_height', 'special-chars!@#'],
  ['line_height_invalid', 'line_height_bad_value', 'line_height_not_a_line_height', 'line_height_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
