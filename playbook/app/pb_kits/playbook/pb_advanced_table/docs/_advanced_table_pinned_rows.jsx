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

  const [pinnedRows, setPinnedRows] = useState({top: ["8"]})

  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          maxHeight="xs"
          pinnedRows={{value: pinnedRows, onChange: setPinnedRows}}
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
