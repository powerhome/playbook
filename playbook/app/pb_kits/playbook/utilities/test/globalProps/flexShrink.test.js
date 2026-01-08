import { testGlobalProp, testGlobalPropWithDefault, testGlobalPropAbsence } from './globalPropsTestHelper'

testGlobalProp(
  'flexShrink',
  [0, 1],
  (v) => `flex_shrink_${v}`,
  (size, v) => `flex_shrink_${size}_${v}`
)

testGlobalPropWithDefault(
  'flexShrink',
  { default: 0, xs: 1, sm: 0, md: 1 },
  (v) => `flex_shrink_${v}`,
  (size, v) => `flex_shrink_${size}_${v}`
)

testGlobalPropAbsence(
  'flexShrink',
  ['flex_shrink_0', 'flex_shrink_1'],
  undefined,
  { skipNull: true }
)
