import React from "react"
import AdvancedTable from "../_advanced_table"
import MOCK_DATA from "./advanced_table_mock_data.json"

/**
 * Kit doc: compares fixed width, floor-only, TanStack band, and min/preferred/max band.
 */
const AdvancedTableColumnStylingWidth = (props) => {
  const columnDefinitions = [
    {
      accessor: "year",
      label: "Year (fixed)",
      cellAccessors: ["quarter", "month", "day"],
      // width alone locks min + max to the same value (128px).
      columnStyling: { width: 128 },
    },
    {
      accessor: "newEnrollments",
      label: "Enrollments (floor)",
      columnStyling: { minWidth: 160 },
    },
    {
      accessor: "scheduledMeetings",
      label: "Meetings (TanStack band)",
      size: 200,
      minSize: 160,
      maxSize: 240,
    },
    {
      accessor: "attendanceRate",
      label: "Attendance (min / pref / max)",
      columnStyling: { minWidth: 108, width: 124, maxWidth: 168 },
    },
    {
      accessor: "completedClasses",
      label: "Completed",
    },
    {
      accessor: "classCompletionRate",
      label: "Completion %",
    },
    {
      accessor: "graduatedStudents",
      label: "Graduated",
    },
  ]

  return (
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        tableData={MOCK_DATA}
        {...props}
    />
  )
}

export default AdvancedTableColumnStylingWidth
