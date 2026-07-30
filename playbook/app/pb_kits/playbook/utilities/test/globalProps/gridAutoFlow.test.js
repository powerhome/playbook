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
  'gridAutoFlow',
  ['row', 'column', 'dense', 'rowDense', 'columnDense'],
  (v) => `grid_auto_flow_${camelToSnakeCase(v)}`,
  (size, v) => `grid_auto_flow_${size}_${camelToSnakeCase(v)}`,
  kits
)

testGlobalPropResponsiveWithDefault(
  'gridAutoFlow',
  { default: 'row', xs: 'column', sm: 'dense', md: 'rowDense' },
  (v) => `grid_auto_flow_${camelToSnakeCase(v)}`,
  (size, v) => `grid_auto_flow_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropAbsence(
  'gridAutoFlow',
  ['grid_auto_flow_row', 'grid_auto_flow_column', 'grid_auto_flow_dense', 'grid_auto_flow_row_dense', 'grid_auto_flow_column_dense'],
  undefined,
  { skipNull: true }
)

testGlobalPropInvalidValues(
  'gridAutoFlow',
  ['invalid', 'bad_value', 'not_a_flow_value', 'special-chars!@#'],
  ['grid_auto_flow_invalid', 'grid_auto_flow_bad_value', 'grid_auto_flow_not_a_flow_value', 'grid_auto_flow_special-chars!@#'],
  undefined,
  { skipKnownIssues: true, allowRenderingErrors: true }
)
