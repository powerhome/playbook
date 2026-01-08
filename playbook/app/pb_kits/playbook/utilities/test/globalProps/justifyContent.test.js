import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// Note: TextInput excluded - justifyContent is a flexbox property that doesn't apply to form inputs
testGlobalProp(
  'justifyContent',
  ['start', 'center', 'end', 'spaceBetween', 'spaceAround', 'spaceEvenly'],
  (v) => `justify_content_${camelToSnakeCase(v)}`,
  (size, v) => `justify_content_${size}_${camelToSnakeCase(v)}`,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropResponsiveWithDefault(
  'justifyContent',
  { default: 'spaceBetween', xs: 'start', sm: 'spaceBetween', md: 'start' },
  (v) => `justify_content_${camelToSnakeCase(v)}`,
  (size, v) => `justify_content_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropAbsence(
  'justifyContent',
  ['justify_content_start', 'justify_content_center', 'justify_content_end', 'justify_content_space_between', 'justify_content_space_around', 'justify_content_space_evenly'],
  undefined,
  { skipNull: true }
)
