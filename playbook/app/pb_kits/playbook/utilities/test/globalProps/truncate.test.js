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
  'truncate',
  [1, 2, 3, 4, 5],
  (v) => `truncate_${v}`,
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

testGlobalPropAbsence(
  'truncate',
  ['truncate_0', 'truncate_1', 'truncate_2', 'truncate_3', 'truncate_4', 'truncate_5'],
  undefined,
  { excludeZero: true, skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'truncate',
  [0, 6, 999, -1, 'invalid', 'bad_value', 'special-chars!@#'],
  ['truncate_0', 'truncate_6', 'truncate_999', 'truncate_-1', 'truncate_invalid', 'truncate_bad_value', 'truncate_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
