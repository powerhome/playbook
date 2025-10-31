import React from "react"
import AdvancedTable from '../_advanced_table'
import Background from '../../pb_background/_background'
import MOCK_DATA from "./advanced_table_mock_data_with_id.json"

const AdvancedTablePaddingControl = (props) => {
  const columnDefinitions = [
    {
      accessor: "year",
      label: "Year",
      cellAccessors: ["quarter", "month", "day"],
    },
    {
      accessor: "newEnrollments",
      label: "New Enrollments",
      columnStyling:{cellPadding: "none"},
      customRenderer: (row, value) => (
        <Background 
            backgroundColor={row.original.newEnrollments > 20 ? "success_secondary" : "warning_secondary"}
            padding="xs" 
        >
         {value}
        </Background>
      ), 
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
      columnStyling:{cellPadding: "none", fontColor: "white"},
      customRenderer: (row, value) => (
        <Background 
            backgroundColor={"category_1"}
            padding="xs" 
        >
         {value}
        </Background>
      ), 
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
      />
    </div>
  )
}

export default AdvancedTablePaddingControl