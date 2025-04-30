import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import MOCK_DATA from "./advanced_table_mock_data_no_subrows.json"

const AdvancedTableSelectableRowsNoSubrowsReact = (props) => {
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
          onRowSelectionChange={(selectedRows) => console.log(selectedRows)}
          selectableRows
          tableData={MOCK_DATA}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableSelectableRowsNoSubrowsReact