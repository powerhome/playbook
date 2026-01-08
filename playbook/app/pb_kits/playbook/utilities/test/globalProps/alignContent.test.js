import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// Note: TextInput excluded - alignContent is a flexbox property that doesn't apply to form inputs
testGlobalProp(
  'alignContent',
  ['start', 'center', 'end', 'spaceBetween', 'spaceAround', 'spaceEvenly'],
  (v) => `align_content_${camelToSnakeCase(v)}`,
  (size, v) => `align_content_${size}_${camelToSnakeCase(v)}`,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropResponsiveWithDefault(
  'alignContent',
  { default: "spaceAround", xs: "center", sm: "spaceAround", md: "center" },
  (v) => `align_content_${camelToSnakeCase(v)}`,
  (size, v) => `align_content_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropAbsence(
  'alignContent',
  ['align_content_start', 'align_content_center', 'align_content_end', 'align_content_space_between', 'align_content_space_around', 'align_content_space_evenly'],
  undefined,
  { skipNull: true }
)
