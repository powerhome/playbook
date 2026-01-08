import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// Note: TextInput excluded - alignItems is a flexbox property that doesn't apply to form inputs
testGlobalProp(
  'alignItems',
  ['start', 'center', 'end', 'baseline', 'stretch', 'flexStart', 'flexEnd'],
  (v) => `align_items_${camelToSnakeCase(v)}`,
  (size, v) => `align_items_${size}_${camelToSnakeCase(v)}`,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropResponsiveWithDefault(
  'alignItems',
  { default: 'end', xs: 'center', sm: 'end', md: 'center' },
  (v) => `align_items_${camelToSnakeCase(v)}`,
  (size, v) => `align_items_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropAbsence(
  'alignItems',
  ['align_items_start', 'align_items_center', 'align_items_end', 'align_items_baseline', 'align_items_stretch', 'align_items_flex_start', 'align_items_flex_end'],
  undefined,
  { skipNull: true }
)
