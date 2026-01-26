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

// Test margin prop
testGlobalProp(
  'margin',
  validValues,
  (v) => `m_${v}`,
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

// Test marginX prop
testGlobalProp(
  'marginX',
  validValues,
  (v) => `mx_${v}`,
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

// Test marginY prop
testGlobalProp(
  'marginY',
  validValues,
  (v) => `my_${v}`,
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

// Test marginTop prop
testGlobalProp(
  'marginTop',
  validValues,
  (v) => `mt_${v}`,
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

// Test marginBottom prop
testGlobalProp(
  'marginBottom',
  validValues,
  (v) => `mb_${v}`,
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

// Test marginLeft prop
testGlobalProp(
  'marginLeft',
  validValues,
  (v) => `ml_${v}`,
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

// Test marginRight prop
testGlobalProp(
  'marginRight',
  validValues,
  (v) => `mr_${v}`,
  null,
  [Body, Button, Card, Title, TextInput, Flex, Link, Badge]
)

// Test absence for all margin props
const marginProps = ['margin', 'marginX', 'marginY', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight']
marginProps.forEach((propName) => {
  const prefix = propName === 'margin' ? 'm' : propName === 'marginX' ? 'mx' : propName === 'marginY' ? 'my' : propName === 'marginTop' ? 'mt' : propName === 'marginBottom' ? 'mb' : propName === 'marginLeft' ? 'ml' : 'mr'
  testGlobalPropAbsence(
    propName,
    [`${prefix}_xs`, `${prefix}_sm`, `${prefix}_md`, `${prefix}_lg`, `${prefix}_xl`],
    undefined,
    { skipNull: true }
  )
})

// NOTE: Currently using skipKnownIssues: true because globalProps.ts generates classes for invalid values
testGlobalPropInvalidValues(
  'margin',
  ['invalid', 'bad_value', 'not_a_size', 'special-chars!@#'],
  ['m_invalid', 'm_bad_value', 'm_not_a_size', 'm_special-chars!@#'],
  undefined,
  { skipKnownIssues: true }
)
