import React from 'react'
import { Table } from '../..'
import { Button } from '../../'

const TableOneAction = () => {
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
            <Button
                onClick={() => alert('button clicked!')}
                paddingLeft="none"
                text="Tetriary Action"
                variant="link"
            />
            <Button
                onClick={() => alert('button clicked!')}
                text="Secondary Action"
                variant="secondary"
            />
          </td>
        </tr>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>
            <Button
                onClick={() => alert('button clicked!')}
                paddingLeft="none"
                text="Tetriary Action"
                variant="link"
            />
            <Button
                onClick={() => alert('button clicked!')}
                text="Secondary Action"
                variant="secondary"
            />
          </td>
        </tr>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>
            <Button
                onClick={() => alert('button clicked!')}
                paddingLeft="none"
                text="Tetriary Action"
                variant="link"
            />
            <Button
                onClick={() => alert('button clicked!')}
                text="Secondary Action"
                variant="secondary"
            />
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default TableOneAction
