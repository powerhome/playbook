import { testGlobalProp, testGlobalPropWithDefault } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'

testGlobalProp(
  'justifySelf',
  ['start', 'center', 'end', 'auto', 'stretch'],
  (v) => `justify_self_${camelToSnakeCase(v)}`,
  (size, v) => `justify_self_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropWithDefault(
  'justifySelf',
  { default: 'end', xs: 'start', sm: 'end', md: 'center' },
  (v) => `justify_self_${camelToSnakeCase(v)}`,
  (size, v) => `justify_self_${size}_${camelToSnakeCase(v)}`
)
