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

  // const [rowPinning, setRowPinning] = useState({
  //   top: ["1"],
  //   // top: ["0-0-0-row"],
  //   bottom: []
  // })

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

  // const [pinnedRows, setPinnedRows] = useState({top: ["8"]})
  const [pinnedRows, setPinnedRows] = useState({top: ["8", "9", "10", "11", "12", "13", "14"]})
  // const [pinnedRows, setPinnedRows] = useState({top: ["1", "2", "3", "4", "5", "6", "7"]})
  // const [pinnedRows, setPinnedRows] = useState({top: ["14"]})

  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          enableToggleExpansion="all"
          // maxHeight="sm"
          pinnedRows={{value: pinnedRows, onChange: setPinnedRows}}
          // stickyLeftColumn={["year"]}
          tableData={MOCK_DATA}
          tableProps={{sticky: true}}
          {...props}
      >
        <AdvancedTable.Header enableSorting />
        <AdvancedTable.Body />
      </AdvancedTable>
    </div>
  )
}

export default AdvancedTableRowPinning
