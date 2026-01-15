import { testGlobalProp, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// NOTE: TextInput excluded - borderRadius is not a valid prop for input elements
testGlobalProp(
  'borderRadius',
  ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'rounded'],
  (v) => `border_radius_${v}`,
  null,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropAbsence(
  'borderRadius',
  ['border_radius_none', 'border_radius_xs', 'border_radius_sm', 'border_radius_md', 'border_radius_lg', 'border_radius_xl', 'border_radius_rounded'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'borderRadius',
  ['invalid', 'bad_value', 'not_a_radius', 'special-chars!@#'],
  ['border_radius_invalid', 'border_radius_bad_value', 'border_radius_not_a_radius', 'border_radius_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
