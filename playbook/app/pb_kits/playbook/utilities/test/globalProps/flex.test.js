import { testGlobalProp, testGlobalPropWithDefault } from './globalPropsTestHelper'

// Test numeric values (0-12) - flex prop expects strings
testGlobalProp(
  'flex',
  Array.from({ length: 13 }, (_, i) => String(i)),
  (v) => `flex_${v}`,
  (size, v) => `flex_${size}_${v}`
)

// Test string values
testGlobalProp(
  'flex',
  ['auto', 'initial', 'none'],
  (v) => `flex_${v}`,
  (size, v) => `flex_${size}_${v}`
)

testGlobalPropWithDefault(
  'flex',
  { default: '3', xs: '1', sm: '3', md: '1' },
  (v) => `flex_${v}`,
  (size, v) => `flex_${size}_${v}`
)
