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
  'dark',
  [true],
  () => 'dark',
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

testGlobalPropAbsence(
  'dark',
  ['dark'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'dark',
  ['invalid', 'bad_value', 123, 'true', 'false'],
  ['dark_invalid', 'dark_bad_value', 'dark_123', 'dark_true', 'dark_false'],
  undefined,
  { skipKnownIssues: true }
)
