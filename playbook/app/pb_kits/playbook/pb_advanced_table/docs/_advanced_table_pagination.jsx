import React from "react"
import { default as AdvancedTable } from "../_advanced_table"
import PAGINATION_MOCK_DATA from "./advanced_table_pagination_mock_data.json"

const AdvancedTablePagination = (props) => {
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

  return (
    <>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          pagination
          responsive="none"
          tableData={PAGINATION_MOCK_DATA}
          {...props}
      />
    </>
  )
}

export default AdvancedTablePagination
