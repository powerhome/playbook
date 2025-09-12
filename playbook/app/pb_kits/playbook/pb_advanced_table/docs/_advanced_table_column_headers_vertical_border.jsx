import React from "react"
import Card from "../../pb_card/_card"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableColumnHeadersVerticalBorder = (props) => {
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

  const tableProps = {
    container: false,
    verticalBorder: true
  }
// Adjusted for testing purposes. Will revert prior to commit.
  return (
    <>
      <Card>
        <AdvancedTable
            columnDefinitions={columnDefinitions}
            tableData={MOCK_DATA}
            tableProps={tableProps}
            {...props}
        />
      </Card>
    </>
  )
}

export default AdvancedTableColumnHeadersVerticalBorder
