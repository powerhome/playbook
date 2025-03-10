import React from "react"
import { default as AdvancedTable } from "../_advanced_table"
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableColumnHeaders = (props) => {
  const columnDefinitions = [
    {
      accessor: "year",
      label: "Year",
      cellAccessors: ["quarter", "month", "day"],
    },
    {
      label: "Enrollment Data",
      columns: [
        {
          accessor: "newEnrollments",
          label: "New Enrollments",
        },
        {
          accessor: "scheduledMeetings",
          label: "Scheduled Meetings",
        },
      ],
    },
    {
      label: "Performance Data",
      columns: [
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
      ],
    },
  ];
  

  return (
    <>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          tableData={MOCK_DATA}
          {...props}
      />
    </>
  )
}

export default AdvancedTableColumnHeaders
