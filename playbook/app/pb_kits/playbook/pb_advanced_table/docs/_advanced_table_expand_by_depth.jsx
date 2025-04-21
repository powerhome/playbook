import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableExpandByDepth = (props) => {
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

  const expandByDepth = [
    {
        depth: 0,
        label: "Year",
    },
    {
        depth: 1,
        label: "Quarter",
    },
    {
        depth: 2,
        label: "Month",
    }
  ]

  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          expandByDepth={expandByDepth}
          tableData={MOCK_DATA}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableExpandByDepth