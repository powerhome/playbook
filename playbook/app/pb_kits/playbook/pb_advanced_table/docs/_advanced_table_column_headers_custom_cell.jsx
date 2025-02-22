import React from "react"
import { AdvancedTable, Pill } from "playbook-ui"
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableColumnHeadersCustomCell = (props) => {
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
          customRenderer: (row, value) => (
            <Pill text={value} 
                variant="success" 
            />
          ),
        },
        {
          accessor: "scheduledMeetings",
          label: "Scheduled Meetings",
          customRenderer: (row, value) => (
            <Pill text={value} 
                variant="info" 
            />
          ),
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
          customRenderer: (row, value) => (
            <Pill text={value} 
                variant="error" 
            />
          ),
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

export default AdvancedTableColumnHeadersCustomCell
