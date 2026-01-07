import { testGlobalProp, testGlobalPropWithDefault } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'

testGlobalProp(
  'justifyContent',
  ['start', 'center', 'end', 'spaceBetween', 'spaceAround', 'spaceEvenly'],
  (v) => `justify_content_${camelToSnakeCase(v)}`,
  (size, v) => `justify_content_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropWithDefault(
  'justifyContent',
  { default: 'spaceBetween', xs: 'start', sm: 'spaceBetween', md: 'start' },
  (v) => `justify_content_${camelToSnakeCase(v)}`,
  (size, v) => `justify_content_${size}_${camelToSnakeCase(v)}`
)
