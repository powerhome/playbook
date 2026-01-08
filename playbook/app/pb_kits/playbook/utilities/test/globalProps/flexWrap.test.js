import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'

testGlobalProp(
  'flexWrap',
  ['wrap', 'nowrap', 'wrapReverse'],
  (v) => `flex_wrap_${camelToSnakeCase(v)}`,
  (size, v) => `flex_wrap_${size}_${camelToSnakeCase(v)}`
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
