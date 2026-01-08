import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence } from './globalPropsTestHelper'

// Test numeric values (1-12)
testGlobalProp(
  'order',
  Array.from({ length: 12 }, (_, i) => i + 1),
  (v) => `flex_order_${v}`,
  (size, v) => `flex_order_${size}_${v}`
)

testGlobalPropResponsiveWithDefault(
  'order',
  { default: 3, xs: 1, sm: 3, md: 1 },
  (v) => `flex_order_${v}`,
  (size, v) => `flex_order_${size}_${v}`
)

testGlobalPropAbsence(
  'order',
  ['flex_order_1', 'flex_order_3', 'flex_order_12'],
  undefined,
  { skipNull: true }
)
