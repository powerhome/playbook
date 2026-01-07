import { testGlobalProp } from './globalPropsTestHelper'

testGlobalProp(
  'truncate',
  [1, 2, 3, 4, 5],
  (v) => `truncate_${v}`
)
