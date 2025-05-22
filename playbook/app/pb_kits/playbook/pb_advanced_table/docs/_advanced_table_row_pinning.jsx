import React, { useState } from "react"
import AdvancedTable from '../_advanced_table'
import MOCK_DATA from "./advanced_table_mock_data_with_id.json"

const AdvancedTableRowPinning = (props) => {
  const columnDefinitions = [
    {
      accessor: "year",
      label: "Year",
      cellAccessors: ["quarter", "month", "day"],
    },
    {
      accessor: "newEnrollments",
      label: "New Enrollments",
    },
    {
      accessor: "scheduledMeetings",
      label: "Scheduled Meetings",
    },
    {
      accessor: "attendanceRate",
      label: "Attendance Rate",
    },
    {
      accessor: "completedClasses",
      label: "Completed Classes",
    },
    {
      accessor: "classCompletionRate",
      label: "Class Completion Rate",
    },
    {
      accessor: "graduatedStudents",
      label: "Graduated Students",
    },
  ]

  // const [rowPinning, setRowPinning] = useState<RowPinningState>({
  //   top: ["1"],
  //   bottom: [],
  //  // bottom: ["5"]
  // })

  const [rowPinning, setRowPinning] = useState({
    top: ["1"],
    // top: ["0-0-0-row"],
    bottom: []
  })

  // const handleRowPinningChange = (newPinningState) => {
  //   setRowPinning(newPinningState)
  //   console.log("Row pinning changed:", newPinningState)
  // }

  // const handleRowPinningChange = (newPinningState) => {
  //   if (typeof newPinningState === 'function') {
  //     setRowPinning(prev => newPinningState(prev));
  //   } else {
  //     setRowPinning(newPinningState);
  //   }
  //   console.log("Row pinning changed:", newPinningState);
  // };


  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          enableRowPinning
          keepPinnedRows
          // rowPinning={["1"]}
          rowPinning={rowPinning}
          // rowPinningControl={{
          //   value: rowPinning,
          //   onChange: handleRowPinningChange
          // }}
          setRowPinning={setRowPinning}
          // setRowPinning={handleRowPinningChange}
          tableData={MOCK_DATA}
          {...props}
      >
        <AdvancedTable.Header enableSorting />
        <AdvancedTable.Body />
      </AdvancedTable>
    </div>
  )
}

export default AdvancedTableRowPinning
