import React from 'react'
import Table from '../_table'

const TableDiv = (props) => {
  return (
    <Table
        size="sm"
        {...props}
    >
      <div className="thead">
        <div className="tr">
          <div className="th">{'Column 1'}</div>
          <div className="th">{'Column 2'}</div>
          <div className="th">{'Column 3'}</div>
          <div className="th">{'Column 4'}</div>
          <div className="th">{'Column 5'}</div>
        </div>
      </div>
      <div className="tbody">
        <div className="tr">
          <div className="td">{'Value 1'}</div>
          <div className="td">{'Value 2'}</div>
          <div className="td">{'Value 3'}</div>
          <div className="td">{'Value 4'}</div>
          <div className="td">{'Value 5'}</div>
        </div>
        <div className="tr">
          <div className="td">{'Value 1'}</div>
          <div className="td">{'Value 2'}</div>
          <div className="td">{'Value 3'}</div>
          <div className="td">{'Value 4'}</div>
          <div className="td">{'Value 5'}</div>
        </div>
        <div className="tr">
          <div className="td">{'Value 1'}</div>
          <div className="td">{'Value 2'}</div>
          <div className="td">{'Value 3'}</div>
          <div className="td">{'Value 4'}</div>
          <div className="td">{'Value 5'}</div>
        </div>
      </div>
    </Table>
  )
}

export default TableDiv
