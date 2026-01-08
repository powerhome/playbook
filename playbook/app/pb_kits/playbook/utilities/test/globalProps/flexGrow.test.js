import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence } from './globalPropsTestHelper'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// Note: TextInput excluded - flexGrow is a flexbox property that doesn't apply to form inputs
testGlobalProp(
  'flexGrow',
  [0, 1],
  (v) => `flex_grow_${v}`,
  (size, v) => `flex_grow_${size}_${v}`,
  [Body, Button, Card, Title, Flex, Link, Badge]
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
