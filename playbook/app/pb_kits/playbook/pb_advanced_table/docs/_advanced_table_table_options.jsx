import React from "react"
import { AdvancedTable } from "../../"
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableTableOptions = (props) => {
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

  const tableOptions = {
    initialState: {
        sorting: [
          {
            id: "year",
            desc: true,
          },
        ],
      },
  }

  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          tableData={MOCK_DATA}
          tableOptions={tableOptions}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableTableOptions
