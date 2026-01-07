import { testGlobalProp, testGlobalPropWithDefault } from './globalPropsTestHelper'

testGlobalProp(
  'flexGrow',
  [0, 1],
  (v) => `flex_grow_${v}`,
  (size, v) => `flex_grow_${size}_${v}`
)

testGlobalPropWithDefault(
  'flexGrow',
  { default: 1, xs: 0, sm: 1, md: 0 },
  (v) => `flex_grow_${v}`,
  (size, v) => `flex_grow_${size}_${v}`
)
