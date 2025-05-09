import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableColumnVisibilityCustom = (props) => {
  const columnDefinitions = [
    {
      accessor: "year",
      label: "Year",
      cellAccessors: ["quarter", "month", "day"],
      id: "year"
    },
    {
      accessor: "newEnrollments",
      label: "New Enrollments",
      id: "newEnrollments"
    },
    {
      accessor: "scheduledMeetings",
      label: "Scheduled Meetings",
      id: "scheduledMeetings"
    },
    {
      accessor: "attendanceRate",
      label: "Attendance Rate",
      id: "attendanceRate"
    },
    {
      accessor: "completedClasses",
      label: "Completed Classes",
      id: "completedClasses"
    },
    {
      accessor: "classCompletionRate",
      label: "Class Completion Rate",
      id: "classCompletionRate"
    },
    {
      accessor: "graduatedStudents",
      label: "Graduated Students",
      id: "graduatedStudents"
    },
  ]

  const columnVisibilityControl = {
    // This is the list of column ids that will be included in the column visibility control
    includeIds:["newEnrollments", "scheduledMeetings", "attendanceRate", "completedClasses"],
  }

  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          columnVisibilityControl={columnVisibilityControl}
          tableData={MOCK_DATA}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableColumnVisibilityCustom