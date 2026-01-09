import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// Note: TextInput excluded - alignContent is a flexbox property that doesn't apply to form inputs
testGlobalProp(
  'alignContent',
  ['start', 'center', 'end', 'spaceBetween', 'spaceAround', 'spaceEvenly'],
  (v) => `align_content_${camelToSnakeCase(v)}`,
  (size, v) => `align_content_${size}_${camelToSnakeCase(v)}`,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropResponsiveWithDefault(
  'alignContent',
  { default: "spaceAround", xs: "center", sm: "spaceAround", md: "center" },
  (v) => `align_content_${camelToSnakeCase(v)}`,
  (size, v) => `align_content_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropAbsence(
  'alignContent',
  ['align_content_start', 'align_content_center', 'align_content_end', 'align_content_space_between', 'align_content_space_around', 'align_content_space_evenly'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
// NOTE: Using allowRenderingErrors: true because invalid types (like numbers) cause rendering errors with camelToSnakeCase
testGlobalPropInvalidValues(
  'alignContent',
  ['invalid', 'bad_value', 'not_an_align_value', 'special-chars!@#'],
  ['align_content_invalid', 'align_content_bad_value', 'align_content_not_an_align_value', 'align_content_special-chars!@#'],
  undefined,
  { skipKnownIssues: true, allowRenderingErrors: true }
)
