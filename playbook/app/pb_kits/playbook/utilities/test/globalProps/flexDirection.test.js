import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'

testGlobalProp(
  'flexDirection',
  ['row', 'column', 'columnReverse'],
  (v) => `flex_direction_${camelToSnakeCase(v)}`,
  (size, v) => `flex_direction_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropResponsiveWithDefault(
  'flexDirection',
  { default: 'column', xs: 'row', sm: 'column', md: 'row' },
  (v) => `flex_direction_${camelToSnakeCase(v)}`,
  (size, v) => `flex_direction_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropAbsence(
  'flexDirection',
  ['flex_direction_row', 'flex_direction_column', 'flex_direction_column_reverse'],
  undefined,
  { skipNull: true }
)
