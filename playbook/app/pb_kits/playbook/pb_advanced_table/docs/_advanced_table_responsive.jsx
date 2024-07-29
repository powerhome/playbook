import React from "react"
import { AdvancedTable } from "../.."
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableResponsive = (props) => {
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
          responsive="none"
          tableData={MOCK_DATA}
          {...props}
      />
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          responsive="scroll"
          tableData={MOCK_DATA}
          {...props}
      />
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          tableData={MOCK_DATA}
          {...props}
      >
        <AdvancedTable.Header />
        <AdvancedTable.Body />
      </AdvancedTable>
    </div>
  )
}

export default AdvancedTableResponsive
