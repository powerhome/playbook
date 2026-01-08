import { testGlobalProp, testGlobalPropAbsence } from './globalPropsTestHelper'

testGlobalProp(
  'truncate',
  [1, 2, 3, 4, 5],
  (v) => `truncate_${v}`
)

testGlobalPropAbsence(
  'truncate',
  ['truncate_0', 'truncate_1', 'truncate_2', 'truncate_3', 'truncate_4', 'truncate_5'],
  undefined,
  { excludeZero: true, skipNull: true }
)
