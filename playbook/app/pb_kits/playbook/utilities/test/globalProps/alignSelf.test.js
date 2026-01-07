import { testGlobalProp, testGlobalPropWithDefault } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'

testGlobalProp(
  'alignSelf',
  ['start', 'center', 'end', 'stretch', 'baseline', 'auto'],
  (v) => `align_self_${camelToSnakeCase(v)}`,
  (size, v) => `align_self_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropWithDefault(
  'alignSelf',
  { default: 'end', xs: 'center', sm: 'end', md: 'center' },
  (v) => `align_self_${camelToSnakeCase(v)}`,
  (size, v) => `align_self_${size}_${camelToSnakeCase(v)}`
)
