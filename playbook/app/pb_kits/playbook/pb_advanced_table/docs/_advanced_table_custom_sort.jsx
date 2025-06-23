import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableCustomSort = (props) => {
  const columnDefinitions = [
    {
      accessor: "year",
      label: "Year",
      id: "year",
      cellAccessors: ["quarter", "month", "day"],
    },
    {
      accessor: "newEnrollments",
      id: "newEnrollments",
      label: "New Enrollments",
    },
    {
      accessor: "scheduledMeetings",
      id: "scheduledMeetings",
      label: "Scheduled Meetings",
    },
    {
      accessor: "attendanceRate",
      id: "attendanceRate",
      label: "Attendance Rate",
    },
    {
      accessor: "completedClasses",
      id: "completedClasses",
      label: "Completed Classes",
    },
    {
      accessor: "classCompletionRate",
      id: "classCompletionRate",
      label: "Class Completion Rate",
    },
    {
      accessor: "graduatedStudents",
      id: "graduatedStudents",
      label: "Graduated Students",
    },
  ]

//Render the subRow header rows
const subRowHeaders = ["Quarter", "Month", "Day"]

  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          customSort
          enableToggleExpansion="all"
          onCustomSortClick={(subrows)=>{console.log("Custom sort clicked", subrows)}}
          tableData={MOCK_DATA}
          {...props}
      >
        <AdvancedTable.Header enableSorting />
        <AdvancedTable.Body subRowHeaders={subRowHeaders} />
      </AdvancedTable>
    </div>
  )
}

export default AdvancedTableCustomSort
