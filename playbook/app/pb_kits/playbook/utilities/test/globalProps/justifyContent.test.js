import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'

testGlobalProp(
  'justifyContent',
  ['start', 'center', 'end', 'spaceBetween', 'spaceAround', 'spaceEvenly'],
  (v) => `justify_content_${camelToSnakeCase(v)}`,
  (size, v) => `justify_content_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropResponsiveWithDefault(
  'justifyContent',
  { default: 'spaceBetween', xs: 'start', sm: 'spaceBetween', md: 'start' },
  (v) => `justify_content_${camelToSnakeCase(v)}`,
  (size, v) => `justify_content_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropAbsence(
  'justifyContent',
  ['justify_content_start', 'justify_content_center', 'justify_content_end', 'justify_content_space_between', 'justify_content_space_around', 'justify_content_space_evenly'],
  undefined,
  { skipNull: true }
)
