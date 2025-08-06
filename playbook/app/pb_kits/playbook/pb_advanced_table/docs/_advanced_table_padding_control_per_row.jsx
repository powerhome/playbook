import React from "react"
import AdvancedTable from '../_advanced_table'
import MOCK_DATA from "./advanced_table_mock_data_with_id.json"

const AdvancedTablePaddingControlPerRow = (props) => {
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

const rowStyling = [
  {
    rowId: "1",
    cellPadding:"md"
  },
];

  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          rowStyling={rowStyling}
          tableData={MOCK_DATA}
          {...props}
      />
    </div>
  )
}

export default AdvancedTablePaddingControlPerRow