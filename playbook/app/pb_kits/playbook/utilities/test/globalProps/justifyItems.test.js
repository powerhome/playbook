import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

const kits = [Body, Button, Card, Title, Flex, Link, Badge]

testGlobalProp(
  'justifyItems',
  ['start', 'center', 'end', 'stretch'],
  (v) => `justify_items_${camelToSnakeCase(v)}`,
  (size, v) => `justify_items_${size}_${camelToSnakeCase(v)}`,
  kits
)

testGlobalPropResponsiveWithDefault(
  'justifyItems',
  { default: 'start', xs: 'center', sm: 'end', md: 'stretch' },
  (v) => `justify_items_${camelToSnakeCase(v)}`,
  (size, v) => `justify_items_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropAbsence(
  'justifyItems',
  ['justify_items_start', 'justify_items_center', 'justify_items_end', 'justify_items_stretch'],
  undefined,
  { skipNull: true }
)

testGlobalPropInvalidValues(
  'justifyItems',
  ['invalid', 'bad_value', 'not_a_justify_value', 'special-chars!@#'],
  ['justify_items_invalid', 'justify_items_bad_value', 'justify_items_not_a_justify_value', 'justify_items_special-chars!@#'],
  undefined,
  { skipKnownIssues: true, allowRenderingErrors: true }
)
