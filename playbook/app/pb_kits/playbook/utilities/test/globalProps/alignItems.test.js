import { testGlobalProp, testGlobalPropWithDefault } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'

testGlobalProp(
  'alignItems',
  ['start', 'center', 'end', 'baseline', 'stretch', 'flexStart', 'flexEnd'],
  (v) => `align_items_${camelToSnakeCase(v)}`,
  (size, v) => `align_items_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropWithDefault(
  'alignItems',
  { default: 'end', xs: 'center', sm: 'end', md: 'center' },
  (v) => `align_items_${camelToSnakeCase(v)}`,
  (size, v) => `align_items_${size}_${camelToSnakeCase(v)}`
)
