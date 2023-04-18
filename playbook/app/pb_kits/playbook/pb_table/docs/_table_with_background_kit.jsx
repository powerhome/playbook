import React from 'react'

import Table from '../_table'
import Background from "../../pb_background/_background"

const TableWithBackgroundKit = (props) => {
  return (
    <div>
      <Table
          {...props}
      >
        <thead>
          <tr>
              <th>{'Column 1'}</th>
              <th>{'Column 2'}</th>
              <th>{'Column 3'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{'Value 1'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
          </tr>
          <Background
              backgroundColor="error_subtle"
              tag='tr'
          >
            <td>{'Value 1'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
          </Background>
          <tr>
            <td>{'Value 1'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
          </tr>
          <tr>
            <td>{'Value 1'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
          </tr>
          <Background
              backgroundColor="warning_subtle"
              tag='tr'
          >
            <td>{'Value 1'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
          </Background>
          <tr>
            <td>{'Value 1'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default TableWithBackgroundKit