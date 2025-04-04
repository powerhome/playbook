import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableDropdownHeader = (props) => {
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

  const dropdownHeaderOptions = [
    {
      label: "Year",
      value: "Year",
      handleOnClick: () => {
        console.log("Year clicked")
      }
    },
    {
      label: "Quarter",
      value: "Quarter",
      handleOnClick: () => {
        console.log("Quarter clicked")
      }
    },
    {
      label: "Month",
      value: "Month",
      handleOnClick: () => {
        console.log("Month clicked")
      },
    },
    {
      label: "Week",
      value: "Week",
      handleOnClick: () => {
        console.log("Week clicked")
      }
    },
  ]


  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          dropdownHeader={dropdownHeaderOptions}
          tableData={MOCK_DATA}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableDropdownHeader
