import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// NOTE: TextInput excluded - textAlign is not a valid prop for input elements
testGlobalProp(
  'textAlign',
  ['start', 'end', 'left', 'right', 'center', 'justify', 'justifyAll', 'matchParent'],
  (v) => `text_align_${v}`,
  (size, v) => `text_align_${size}_${camelToSnakeCase(v)}`,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropResponsiveWithDefault(
  'textAlign',
  { default: 'center', xs: 'left', sm: 'center', md: 'right' },
  (v) => `text_align_${camelToSnakeCase(v)}`,
  (size, v) => `text_align_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropAbsence(
  'textAlign',
  ['text_align_start', 'text_align_end', 'text_align_center', 'text_align_left', 'text_align_right'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'textAlign',
  ['invalid', 'bad_value', 'not_an_alignment', 'special-chars!@#'],
  ['text_align_invalid', 'text_align_bad_value', 'text_align_not_an_alignment', 'text_align_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
