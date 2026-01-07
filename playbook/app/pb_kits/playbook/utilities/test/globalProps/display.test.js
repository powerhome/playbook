import { testGlobalProp, testGlobalPropWithDefault } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'

testGlobalProp(
  'display',
  ['block', 'inline', 'inline_block', 'flex', 'inline_flex', 'none', 'grid'],
  (v) => `display_${camelToSnakeCase(v)}`,
  (size, v) => `display_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropWithDefault(
  'display',
  { default: 'none', xs: 'block', sm: 'none', md: 'block' },
  (v) => `display_${camelToSnakeCase(v)}`,
  (size, v) => `display_${size}_${camelToSnakeCase(v)}`
)
