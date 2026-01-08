import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'

testGlobalProp(
  'alignItems',
  ['start', 'center', 'end', 'baseline', 'stretch', 'flexStart', 'flexEnd'],
  (v) => `align_items_${camelToSnakeCase(v)}`,
  (size, v) => `align_items_${size}_${camelToSnakeCase(v)}`
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
