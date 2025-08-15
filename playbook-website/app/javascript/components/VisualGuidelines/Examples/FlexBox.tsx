import React from 'react'
import { Pill, Table } from 'playbook-ui'
import Example from '../Templates/Example'

const SCREEN_SIZES = ['xs', 'sm', 'md', 'lg', 'xl']

const PROPS = {
  flexDirection: ['row', 'column', 'rowReverse', 'columnReverse'],
  flexWrap: ['wrap', 'nowrap', 'wrapReverse'],
  justifyContent: ['start', 'end', 'center', 'spaceBetween', 'spaceAround', 'spaceEvenly'],
  justifySelf: ['start', 'end', 'center', 'auto', 'stretch'],
  alignItems: ['flexStart', 'flexEnd', 'start', 'end', 'center', 'stretch', 'baseline'],
  alignContent: ['start', 'end', 'center', 'spaceBetween', 'spaceAround', 'spaceEvenly'],
  alignSelf: ['start', 'end', 'center', 'auto', 'stretch', 'baseline'],
  flex: ['none', 'initial', 'auto', '1'],
  flexGrow: ['0', '1'],
  flexShrink: ['0', '1'],
  order: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'none'],
  gap: ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
  columnGap: ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
  rowGap: ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
}
const TABLE_HEADERS = ['Props', 'Screen Sizes', 'Values']

let buildPillElement = (value, propName) => (
  <Pill
    key={`${propName}-${value}`}
    text={value}
    textTransform="none"
    variant="warning"
  />
)

const FlexBox = ({example}: {example: string}) => (
  <Example
    example={example}
    customChildren={true}
    title='Flex Box'
  >
    <Table>
      <thead>
        <tr>
          { TABLE_HEADERS.map((header, idx) => (
            <th key={`${header}-${idx}`}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        { Object.keys(PROPS).map((propName: string, idx) => (
          <tr key={`${propName}-${idx}`}>
            <td>
              <Pill
                text={propName}
                textTransform="none"
              />
            </td>
            <td>
              { SCREEN_SIZES.map((value) => (
                buildPillElement(value, propName)
              ))}
            </td>
            <td>
              { PROPS[propName].map((value) => (
                buildPillElement(value, propName)
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Example>
)

export default FlexBox
