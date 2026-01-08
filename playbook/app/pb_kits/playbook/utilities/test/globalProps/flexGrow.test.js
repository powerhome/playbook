import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence } from './globalPropsTestHelper'

testGlobalProp(
  'flexGrow',
  [0, 1],
  (v) => `flex_grow_${v}`,
  (size, v) => `flex_grow_${size}_${v}`
)

testGlobalPropResponsiveWithDefault(
  'flexGrow',
  { default: 1, xs: 0, sm: 1, md: 0 },
  (v) => `flex_grow_${v}`,
  (size, v) => `flex_grow_${size}_${v}`
)

testGlobalPropAbsence(
  'flexGrow',
  ['flex_grow_0', 'flex_grow_1'],
  undefined,
  { skipNull: true }
)
