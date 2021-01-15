import React from 'react'
import { Table } from '../..'
import { Button } from '../../'

const TableOneAction = (props) => {
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
          <td>
            {' '}
            <Button
                onClick={() => alert('button clicked!')}
                text="Action"
                variant="secondary"
                {...props}
            />
            {' '}
          </td>
        </tr>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>
            {' '}
            <Button
                onClick={() => alert('button clicked!')}
                text="Action"
                variant="secondary"
                {...props}
            />
            {' '}
          </td>
        </tr>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>
            {' '}
            <Button
                onClick={() => alert('button clicked!')}
                text="Action"
                variant="secondary"
                {...props}
            />
            {' '}
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default TableOneAction
