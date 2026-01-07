import { testGlobalProp, testGlobalPropWithDefault } from './globalPropsTestHelper'

// Test numeric values (1-12)
testGlobalProp(
  'order',
  Array.from({ length: 12 }, (_, i) => i + 1),
  (v) => `flex_order_${v}`,
  (size, v) => `flex_order_${size}_${v}`
)

testGlobalPropWithDefault(
  'order',
  { default: 3, xs: 1, sm: 3, md: 1 },
  (v) => `flex_order_${v}`,
  (size, v) => `flex_order_${size}_${v}`
)
