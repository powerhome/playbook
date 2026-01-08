import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// Note: TextInput excluded - flexWrap is a flexbox property that doesn't apply to form inputs
testGlobalProp(
  'flexWrap',
  ['wrap', 'nowrap', 'wrapReverse'],
  (v) => `flex_wrap_${camelToSnakeCase(v)}`,
  (size, v) => `flex_wrap_${size}_${camelToSnakeCase(v)}`,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropResponsiveWithDefault(
  'flexWrap',
  { default: 'wrap', xs: 'nowrap', sm: 'wrap', md: 'nowrap' },
  (v) => `flex_wrap_${camelToSnakeCase(v)}`,
  (size, v) => `flex_wrap_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropAbsence(
  'flexWrap',
  ['flex_wrap_wrap', 'flex_wrap_nowrap', 'flex_wrap_wrap_reverse'],
  undefined,
  { skipNull: true }
)
