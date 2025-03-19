import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import Title from '../../pb_title/_title'
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
      <Title
          size={4}
          text="Not Responsive"
          {...props}
      />
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          responsive="none"
          tableData={MOCK_DATA}
          {...props}
      />
      <Title
          paddingTop="sm"
          size={4}
          text="Responsive as Default"
          {...props}
      />
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          tableData={MOCK_DATA}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableResponsive
