import React from "react"
import { AdvancedTable } from "playbook-ui"
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableStickyHeaderResponsive = (props) => {
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
          htmlOptions={{style: { maxHeight: "100vh" }}}
          tableData={MOCK_DATA}
          tableProps={{sticky:true}}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableStickyHeaderResponsive
