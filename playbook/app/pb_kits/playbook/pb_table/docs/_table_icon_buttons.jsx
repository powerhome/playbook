import React from 'react'
import { Table } from '../..'
import { CircleIconButton, Flex, FlexItem } from '../../'

const TableIconButtons = () => {
  return (
    <Table size="sm">
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
          <td>
            <Flex orientation="row">
              <FlexItem>
                <CircleIconButton
                    icon="trash-alt"
                    variant="link"
                />
              </FlexItem>
              <FlexItem>
                <CircleIconButton
                    icon="pencil"
                    variant="secondary"
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
          <td>
            <Flex orientation="row">
              <FlexItem>
                <CircleIconButton
                    icon="trash-alt"
                    variant="link"
                />
              </FlexItem>
              <FlexItem>
                <CircleIconButton
                    icon="pencil"
                    variant="secondary"
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
          <td>
            <Flex orientation="row">
              <FlexItem>
                <CircleIconButton
                    icon="trash-alt"
                    variant="link"
                />
              </FlexItem>
              <FlexItem>
                <CircleIconButton
                    icon="pencil"
                    variant="secondary"
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
