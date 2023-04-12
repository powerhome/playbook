import React from 'react'

import Table from '../_table'
import Background from "../../pb_background/_background"

const TableWithBackgroundKit = (props) => {
  return (
    <Table
        {...props}
    >
      <thead>
      <tr>
          <th>{'Column 1'}</th>
          <th>{'Column 2'}</th>
          <th>{'Column 3'}</th>
          <th>{'Column 4'}</th>
          <th>{'Column 5'}</th>
      </tr>
      </thead>
      <tbody>
        <Background
            backgroundColor="success"
            tag='tr'
        >
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>{'Value 5'}</td>
        </Background>
        <Background
            backgroundColor="warning"
            tag='tr'
        >
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>{'Value 5'}</td>
        </Background>
        <Background
            backgroundColor="info"
            tag='tr'
        >
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>{'Value 5'}</td>
        </Background>
      </tbody>
    </Table>
  )
}

export default TableWithBackgroundKit