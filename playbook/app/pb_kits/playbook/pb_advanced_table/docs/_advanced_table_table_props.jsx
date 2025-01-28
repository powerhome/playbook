import React from "react"
import { AdvancedTable } from "playbook-ui"
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

  const tablePropsStickyHeader = {
    sticky: true
  }

  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          tableData={MOCK_DATA}
          tableProps={tableProps}
          {...props}
      />
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          marginTop="lg"
          maxHeight="xs"
          tableData={MOCK_DATA}
          tableProps={tablePropsStickyHeader}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableTableProps
