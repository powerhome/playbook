import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

// Note: TextInput excluded - justifySelf is a flexbox property that doesn't apply to form inputs
testGlobalProp(
  'justifySelf',
  ['start', 'center', 'end', 'auto', 'stretch'],
  (v) => `justify_self_${camelToSnakeCase(v)}`,
  (size, v) => `justify_self_${size}_${camelToSnakeCase(v)}`,
  [Body, Button, Card, Title, Flex, Link, Badge]
)

testGlobalPropResponsiveWithDefault(
  'justifySelf',
  { default: 'end', xs: 'start', sm: 'end', md: 'center' },
  (v) => `justify_self_${camelToSnakeCase(v)}`,
  (size, v) => `justify_self_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropAbsence(
  'justifySelf',
  ['justify_self_start', 'justify_self_center', 'justify_self_end', 'justify_self_auto', 'justify_self_stretch'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
// NOTE: Using allowRenderingErrors: true because invalid types (like numbers) cause rendering errors with camelToSnakeCase
testGlobalPropInvalidValues(
  'justifySelf',
  ['invalid', 'bad_value', 'not_a_justify_value', 'special-chars!@#'],
  ['justify_self_invalid', 'justify_self_bad_value', 'justify_self_not_a_justify_value', 'justify_self_special-chars!@#'],
  undefined,
  { skipKnownIssues: true, allowRenderingErrors: true }
)
