import { testGlobalProp, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// NOTE: TextInput excluded - numberSpacing is not a valid prop for input elements
testGlobalProp(
  'numberSpacing',
  ['tabular'],
  (v) => `ns_${v}`,
  null,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropAbsence(
  'numberSpacing',
  ['ns_tabular'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'numberSpacing',
  ['invalid', 'bad_value', 'not_tabular', 'special-chars!@#'],
  ['ns_invalid', 'ns_bad_value', 'ns_not_tabular', 'ns_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
