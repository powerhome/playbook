import { testGlobalProp, testGlobalPropWithDefault, testGlobalPropAbsence } from './globalPropsTestHelper'
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

testGlobalPropAbsence(
  'alignSelf',
  ['align_self_start', 'align_self_center', 'align_self_end', 'align_self_stretch', 'align_self_baseline', 'align_self_auto'],
  undefined,
  { skipNull: true }
)
