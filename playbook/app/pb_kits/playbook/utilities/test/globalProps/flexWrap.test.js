import { testGlobalProp, testGlobalPropWithDefault } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'

testGlobalProp(
  'flexWrap',
  ['wrap', 'nowrap', 'wrapReverse'],
  (v) => `flex_wrap_${camelToSnakeCase(v)}`,
  (size, v) => `flex_wrap_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropWithDefault(
  'flexWrap',
  { default: 'wrap', xs: 'nowrap', sm: 'wrap', md: 'nowrap' },
  (v) => `flex_wrap_${camelToSnakeCase(v)}`,
  (size, v) => `flex_wrap_${size}_${camelToSnakeCase(v)}`
)
