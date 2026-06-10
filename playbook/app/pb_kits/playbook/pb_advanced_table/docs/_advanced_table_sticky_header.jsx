import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'

const tableData = Array.from({ length: 15 }, (_, index) => ({
  year: String(2020 + index),
  newEnrollments: String(20 + index),
  scheduledMeetings: String(10 + index),
  attendanceRate: `${50 + index}%`,
  completedClasses: String(3 + index),
  classCompletionRate: `${30 + index}%`,
  graduatedStudents: String(19 + index),
}))

const AdvancedTableStickyHeader = (props) => {
  const columnDefinitions = [
    {
      accessor: "year",
      label: "Year",
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

  const tableProps = {
    sticky: true
  }

  return (
    <div style={{ maxHeight: "320px", overflowY: "auto" }}>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          responsive="none"
          tableData={tableData}
          tableProps={tableProps}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableStickyHeader
