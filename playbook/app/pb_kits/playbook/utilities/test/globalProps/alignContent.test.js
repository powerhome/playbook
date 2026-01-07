import { testGlobalProp, testGlobalPropWithDefault } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'

testGlobalProp(
  'alignContent',
  ['start', 'center', 'end', 'spaceBetween', 'spaceAround', 'spaceEvenly'],
  (v) => `align_content_${camelToSnakeCase(v)}`,
  (size, v) => `align_content_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropWithDefault(
  'alignContent',
  { default: "spaceAround", xs: "center", sm: "spaceAround", md: "center" },
  (v) => `align_content_${camelToSnakeCase(v)}`,
  (size, v) => `align_content_${size}_${camelToSnakeCase(v)}`
)
