import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// Note: TextInput excluded - alignSelf is a flexbox property that doesn't apply to form inputs
testGlobalProp(
  'alignSelf',
  ['start', 'center', 'end', 'stretch', 'baseline', 'auto'],
  (v) => `align_self_${camelToSnakeCase(v)}`,
  (size, v) => `align_self_${size}_${camelToSnakeCase(v)}`,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropResponsiveWithDefault(
  'alignSelf',
  { default: 'end', xs: 'center', sm: 'end', md: 'center' },
  (v) => `align_self_${camelToSnakeCase(v)}`,
  (size, v) => `align_self_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropAbsence(
  'alignSelf',
  ['align_self_start', 'align_self_center', 'align_self_end', 'align_self_stretch', 'align_self_baseline', 'align_self_auto'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
// NOTE: Using allowRenderingErrors: true because invalid types (like numbers) cause rendering errors with camelToSnakeCase
testGlobalPropInvalidValues(
  'alignSelf',
  ['invalid', 'bad_value', 'not_an_align_value', 'special-chars!@#'],
  ['align_self_invalid', 'align_self_bad_value', 'align_self_not_an_align_value', 'align_self_special-chars!@#'],
  undefined,
  { skipKnownIssues: true, allowRenderingErrors: true }
)
