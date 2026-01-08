import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence } from './globalPropsTestHelper'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import TextInput from '../../../pb_text_input/_text_input'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// Test numeric values (1-12)
testGlobalProp(
  'order',
  Array.from({ length: 12 }, (_, i) => i + 1),
  (v) => `flex_order_${v}`,
  (size, v) => `flex_order_${size}_${v}`,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
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
