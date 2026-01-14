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
  'shadow',
  ['none', 'deep', 'deeper', 'deepest'],
  (v) => `shadow_${v}`,
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

testGlobalPropAbsence(
  'shadow',
  ['shadow_none', 'shadow_deep', 'shadow_deeper', 'shadow_deepest'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'shadow',
  ['invalid', 'bad_value', 'not_a_shadow', 'special-chars!@#'],
  ['shadow_invalid', 'shadow_bad_value', 'shadow_not_a_shadow', 'shadow_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
