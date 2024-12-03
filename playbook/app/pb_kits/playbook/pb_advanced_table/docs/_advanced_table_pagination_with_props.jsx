import React from "react"
import { AdvancedTable } from "playbook-ui"
import PAGINATION_MOCK_DATA from "./advanced_table_pagination_mock_data.json"

const AdvancedTablePaginationWithProps = (props) => {
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

  const paginationProps = {
    pageIndex: 1,
    pageSize: 10,
    range: 2
  }
  
  return (
    <>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          pagination
          paginationProps={paginationProps}
          tableData={PAGINATION_MOCK_DATA}
          {...props}
      />
    </>
  )
}

export default AdvancedTablePaginationWithProps
