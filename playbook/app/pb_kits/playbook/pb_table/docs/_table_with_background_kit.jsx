import React from 'react'

import Table from '../_table'
import Background from "../../pb_background/_background"

const TableWithBackgroundKit = (props) => {
  return (
    <div>
      <Table
          marginBottom="lg"
          {...props}
      >
        <thead>
          <Background
              backgroundColor="light"
              tag='tr'
          >
              <th>{'Column 1'}</th>
              <th>{'Column 2'}</th>
              <th>{'Column 3'}</th>
          </Background>
        </thead>
        <tbody>
          <tr>
            <td>{'Value 1'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
          </tr>
          <Background
              backgroundColor="light"
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
          <Background
              backgroundColor="warning_subtle"
              tag='td'
          >
              {'Value 1'}
            </Background>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
          </tr>
          <tr>
            <td>{'Value 1'}</td>
            <Background
                backgroundColor="success_subtle"
                tag='td'
            >
              {'Value 2'}
            </Background>
            <td>{'Value 3'}</td>
          </tr>
          <tr>
            <td>{'Value 1'}</td>
            <td>{'Value 2'}</td>
            <Background
                backgroundColor="info_subtle"
                tag='td'
            >
              {'Value 3'}
            </Background>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default TableWithBackgroundKit