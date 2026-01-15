import { testGlobalProp, testGlobalPropAbsence, testGlobalPropInvalidValues } from './globalPropsTestHelper'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import Card from '../../../pb_card/_card'
import Title from '../../../pb_title/_title'
import TextInput from '../../../pb_text_input/_text_input'
import Flex from '../../../pb_flex/_flex'
import Link from '../../../pb_link/_link'
import Badge from '../../../pb_badge/_badge'

const validValues = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'auto', 'initial', 'inherit']

// Test padding prop
testGlobalProp(
  'padding',
  validValues,
  (v) => `p_${v}`,
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

// Test paddingX prop
testGlobalProp(
  'paddingX',
  validValues,
  (v) => `px_${v}`,
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

// Test paddingY prop
testGlobalProp(
  'paddingY',
  validValues,
  (v) => `py_${v}`,
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

// Test paddingTop prop
testGlobalProp(
  'paddingTop',
  validValues,
  (v) => `pt_${v}`,
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

// Test paddingBottom prop
testGlobalProp(
  'paddingBottom',
  validValues,
  (v) => `pb_${v}`,
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

// Test paddingLeft prop
testGlobalProp(
  'paddingLeft',
  validValues,
  (v) => `pl_${v}`,
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

// Test paddingRight prop
testGlobalProp(
  'paddingRight',
  validValues,
  (v) => `pr_${v}`,
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

// Test absence for all padding props
const paddingProps = ['padding', 'paddingX', 'paddingY', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight']
paddingProps.forEach((propName) => {
  const prefix = propName === 'padding' ? 'p' : propName === 'paddingX' ? 'px' : propName === 'paddingY' ? 'py' : propName === 'paddingTop' ? 'pt' : propName === 'paddingBottom' ? 'pb' : propName === 'paddingLeft' ? 'pl' : 'pr'
  testGlobalPropAbsence(
    propName,
    [`${prefix}_xs`, `${prefix}_sm`, `${prefix}_md`, `${prefix}_lg`, `${prefix}_xl`],
    undefined,
    { skipNull: true }
  )
})

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'padding',
  ['invalid', 'bad_value', 'not_a_size', 'special-chars!@#'],
  ['p_invalid', 'p_bad_value', 'p_not_a_size', 'p_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
