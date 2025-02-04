import React from "react"
import { AdvancedTable, Caption } from "playbook-ui"
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableTablePropsStickyHeader = (props) => {
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
    sticky: true
  }

  return (
    <div>
      <Caption marginBottom="xs" 
          text="responsive table with sticky header"
      />
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          maxHeight="xs"
          tableData={MOCK_DATA}
          tableProps={tableProps}
          {...props}
      />
      <Caption marginY="xs" 
          text="non responsive table with sticky header"
      />
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

export default AdvancedTableTablePropsStickyHeader
