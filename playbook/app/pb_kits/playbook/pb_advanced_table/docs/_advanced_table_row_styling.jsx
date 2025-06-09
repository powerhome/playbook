import React from "react"
import AdvancedTable from '../_advanced_table'
import MOCK_DATA from "./advanced_table_mock_data_with_id.json"
import { colors } from "playbook-ui"

const AdvancedTableRowStyling = (props) => {
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

const rowStyling = [
  {
    rowId: "1",
    backgroundColor: colors.warning,
  },
  {
    rowId: "8",
    backgroundColor: colors.category_1,
    fontColor: colors.white,
    expandButtonColor: colors.white,
  },
];

  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          rowStyling={rowStyling}
          tableData={MOCK_DATA}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableRowStyling