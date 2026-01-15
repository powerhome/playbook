import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// NOTE: TextInput excluded - verticalAlign is not a valid prop for input elements
testGlobalProp(
  'verticalAlign',
  ['baseline', 'super', 'top', 'middle', 'bottom', 'sub', 'text-top', 'text-bottom'],
  (v) => `vertical_align_${v}`,
  (size, v) => `vertical_align_${size}_${v}`,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropResponsiveWithDefault(
  'verticalAlign',
  { default: 'middle', xs: 'top', sm: 'middle', md: 'bottom' },
  (v) => `vertical_align_${v}`,
  (size, v) => `vertical_align_${size}_${v}`
)

testGlobalPropAbsence(
  'verticalAlign',
  ['vertical_align_baseline', 'vertical_align_top', 'vertical_align_middle', 'vertical_align_bottom'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'verticalAlign',
  ['invalid', 'bad_value', 'not_an_alignment', 'special-chars!@#'],
  ['vertical_align_invalid', 'vertical_align_bad_value', 'vertical_align_not_an_alignment', 'vertical_align_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
