import React from "react"
import { default as AdvancedTable } from "../_advanced_table"
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableTableProps = (props) => {
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

  const tableProps = {
    container: false,
    sticky: true
  }

  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          responsive="none"
          tableData={MOCK_DATA}
          tableProps={tableProps}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableTableProps
