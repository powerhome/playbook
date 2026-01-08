import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'

testGlobalProp(
  'alignContent',
  ['start', 'center', 'end', 'spaceBetween', 'spaceAround', 'spaceEvenly'],
  (v) => `align_content_${camelToSnakeCase(v)}`,
  (size, v) => `align_content_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropResponsiveWithDefault(
  'alignContent',
  { default: "spaceAround", xs: "center", sm: "spaceAround", md: "center" },
  (v) => `align_content_${camelToSnakeCase(v)}`,
  (size, v) => `align_content_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropAbsence(
  'alignContent',
  ['align_content_start', 'align_content_center', 'align_content_end', 'align_content_space_between', 'align_content_space_around', 'align_content_space_evenly'],
  undefined,
  { skipNull: true }
)
