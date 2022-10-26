import React from 'react'

import Table from '../_table'

import CircleIconButton from '../../pb_circle_icon_button/_circle_icon_button'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'

const TableIconButtons = (props) => {
  return (
    <Table
        size="sm"
        {...props}
    >
      <thead>
        <tr>
          <th>{'Column 1'}</th>
          <th>{'Column 2'}</th>
          <th>{'Column 3'}</th>
          <th>{'Column 4'}</th>
          <th>{''}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td align="right">
            <Flex
                justifyContent="end"
                orientation="row"
            >
              <FlexItem>
                <CircleIconButton
                    icon="trash-alt"
                    variant="link"
                    {...props}
                />
              </FlexItem>
              <FlexItem>
                <CircleIconButton
                    icon="pencil"
                    variant="secondary"
                    {...props}
                />
              </FlexItem>
            </Flex>
          </td>
        </tr>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td align="right">
            <Flex 
                justifyContent="end"
                orientation="row"
            >
              <FlexItem>
                <CircleIconButton
                    icon="trash-alt"
                    variant="link"
                    {...props}
                />
              </FlexItem>
              <FlexItem>
                <CircleIconButton
                    icon="pencil"
                    variant="secondary"
                    {...props}
                />
              </FlexItem>
            </Flex>
          </td>
        </tr>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value lk'}</td>
          <td align="right">
            <Flex 
                justifyContent="end"
                orientation="row"
            >
              <FlexItem>
                <CircleIconButton
                    icon="trash-alt"
                    variant="link"
                    {...props}
                />
              </FlexItem>
              <FlexItem>
                <CircleIconButton
                    icon="pencil"
                    variant="secondary"
                    {...props}
                />
              </FlexItem>
            </Flex>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default TableIconButtons
