import { testGlobalProp, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import TextInput from '../../../pb_text_input/_text_input'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

testGlobalProp(
  'position',
  ['relative', 'absolute', 'fixed', 'sticky'],
  (v) => `position_${v}`,
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

testGlobalPropAbsence(
  'position',
  ['position_relative', 'position_absolute', 'position_fixed', 'position_sticky'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'position',
  ['invalid', 'bad_value', 'not_a_position', 'static', 'special-chars!@#'],
  ['position_invalid', 'position_bad_value', 'position_not_a_position', 'position_static', 'position_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
