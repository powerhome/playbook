import React from "react"
import { AdvancedTable } from "../../"
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableCollapsibleTrail = (props) => {
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
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          tableData={MOCK_DATA}
          {...props}
      >
        <AdvancedTable.Header />
        <AdvancedTable.Body collapsibleTrail={false} />
      </AdvancedTable>
    </div>
  )
}

export default AdvancedTableCollapsibleTrail