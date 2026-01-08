import { testGlobalProp, testGlobalPropResponsiveWithDefault, testGlobalPropAbsence } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import TextInput from '../../../pb_text_input/_text_input'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

testGlobalProp(
  'display',
  ['block', 'inline', 'inline_block', 'flex', 'inline_flex', 'none', 'grid'],
  (v) => `display_${camelToSnakeCase(v)}`,
  (size, v) => `display_${size}_${camelToSnakeCase(v)}`,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

testGlobalPropResponsiveWithDefault(
  'display',
  { default: 'none', xs: 'block', sm: 'none', md: 'block' },
  (v) => `display_${camelToSnakeCase(v)}`,
  (size, v) => `display_${size}_${camelToSnakeCase(v)}`
)

testGlobalPropAbsence(
  'display',
  ['display_block', 'display_inline', 'display_flex', 'display_none', 'display_grid'],
  undefined,
  { skipNull: true },
)
