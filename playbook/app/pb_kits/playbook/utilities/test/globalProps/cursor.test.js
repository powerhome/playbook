import { testGlobalProp, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import { camelToSnakeCase } from '../../../utilities/text'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import TextInput from '../../../pb_text_input/_text_input'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

const validValues = [
  'auto', 'default', 'none', 'contextMenu', 'help', 'pointer', 'progress', 'wait', 'cell',
  'crosshair', 'text', 'verticalText', 'alias', 'copy', 'move', 'noDrop', 'notAllowed', 'grab',
  'grabbing', 'eResize', 'nResize', 'neResize', 'nwResize', 'sResize', 'seResize', 'swResize', 'wResize',
  'ewResize', 'nsResize', 'neswResize', 'nwseResize', 'colResize', 'rowResize', 'allScroll', 'zoomIn', 'zoomOut'
]

testGlobalProp(
  'cursor',
  validValues,
  (v) => `cursor_${camelToSnakeCase(v)}`,
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

testGlobalPropAbsence(
  'cursor',
  ['cursor_auto', 'cursor_pointer', 'cursor_default', 'cursor_none'],
  undefined,
  { skipNull: true }
)

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
// NOTE: Using allowRenderingErrors: true because invalid types (like numbers) cause rendering errors with camelToSnakeCase
testGlobalPropInvalidValues(
  'cursor',
  ['invalid', 'bad_value', 'not_a_cursor', 'special-chars!@#'],
  ['cursor_invalid', 'cursor_bad_value', 'cursor_not_a_cursor', 'cursor_special-chars!@#'],
  undefined,
  { skipKnownIssues: true, allowRenderingErrors: true }
)
