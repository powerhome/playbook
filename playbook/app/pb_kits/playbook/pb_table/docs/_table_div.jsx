import React from 'react'
import Table from '../_table'

const TableDiv = (props) => {
  return (
    <Table
        size="sm"
        tag="div"
        {...props}
    >
      <div className="pb_table_thead">
        <div className="pb_table_tr">
          <div className="pb_table_th">{'Column 1'}</div>
          <div className="pb_table_th">{'Column 2'}</div>
          <div className="pb_table_th">{'Column 3'}</div>
          <div className="pb_table_th">{'Column 4'}</div>
          <div className="pb_table_th">{'Column 5'}</div>
        </div>
      </div>
      <div className="pb_table_tbody">
        <div className="pb_table_tr">
          <div className="pb_table_td">{'Value 1'}</div>
          <div className="pb_table_td">{'Value 2'}</div>
          <div className="pb_table_td">{'Value 3'}</div>
          <div className="pb_table_td">{'Value 4'}</div>
          <div className="pb_table_td">{'Value 5'}</div>
        </div>
        <div className="pb_table_tr">
          <div className="pb_table_td">{'Value 1'}</div>
          <div className="pb_table_td">{'Value 2'}</div>
          <div className="pb_table_td">{'Value 3'}</div>
          <div className="pb_table_td">{'Value 4'}</div>
          <div className="pb_table_td">{'Value 5'}</div>
        </div>
        <div className="pb_table_tr">
          <div className="pb_table_td">{'Value 1'}</div>
          <div className="pb_table_td">{'Value 2'}</div>
          <div className="pb_table_td">{'Value 3'}</div>
          <div className="pb_table_td">{'Value 4'}</div>
          <div className="pb_table_td">{'Value 5'}</div>
        </div>
      </div>
    </Table>
  )
}

export default TableDiv
