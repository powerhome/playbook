import React from 'react'
import PropTypes from 'prop-types'

import Table from '../_table'
import Background from "../../pb_background/_background"

const TableWithBackgroundKit = (props) => {
  return (
    <div>
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
      <div>
        <Table
            paddingTop="sm"
            {...props}
        >
          <colgroup>
            <Background
                backgroundColor="error_subtle"
                tag='col'
            />
            <col/>
            <Background
                backgroundColor="warning_subtle"
                tag='col'
            />
          </colgroup>
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
            <tr>
              <td>{'Value 1'}</td>
              <td>{'Value 2'}</td>
              <td>{'Value 3'}</td>
            </tr>
          </tbody>
        </Table>
        </div>
    </div>
  )
}

TableWithBackgroundKit.propTypes = {
  dark: PropTypes.bool,
}

export default TableWithBackgroundKit
