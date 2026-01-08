import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'

testGlobalProp(
  'display',
  ['block', 'inline', 'inline_block', 'flex', 'inline_flex', 'none', 'grid'],
  (v) => `display_${camelToSnakeCase(v)}`,
  (size, v) => `display_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropResponsiveWithDefault(
  'display',
  { default: 'none', xs: 'block', sm: 'none', md: 'block' },
  (v) => `display_${camelToSnakeCase(v)}`,
  (size, v) => `display_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropAbsence(
  'display',
  ['display_block', 'display_inline', 'display_flex', 'display_none', 'display_grid'],
  undefined,
  { skipNull: true },
)
