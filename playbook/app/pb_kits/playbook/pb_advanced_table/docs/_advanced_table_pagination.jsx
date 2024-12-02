import React from "react"
import { AdvancedTable } from "playbook-ui"
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

  const paginationProps = {
    paginate: true,
    pageIndex: 1,
    pageSize: 20
  }
  return (
    <>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          paginationProps={paginationProps}
          tableData={PAGINATION_MOCK_DATA}
          {...props}
      />
    </>
  )
}

export default AdvancedTablePagination
