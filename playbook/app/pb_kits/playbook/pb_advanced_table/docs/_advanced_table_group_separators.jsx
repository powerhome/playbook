import React, { useState } from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import MOCK_DATA_GROUP_SEPARATORS from "./advanced_table_mock_data_group_separators.json"

const AdvancedTableGroupSeparators = (props) => {
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

  // Match design screenshot: 2022 → Q1 → January open; May/Q2 collapsed; 2023 open to quarters
  const [expanded, setExpanded] = useState({
    "1": true,
    "1.0": true,
    "1.0.0": true,
    "2": true,
  })

  const expandedControl = {
    onChange: setExpanded,
    value: expanded,
  }

  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          expandedControl={expandedControl}
          groupSeparators
          onRowToggleClick={(row) => {
            setExpanded({ ...expanded, [row.id]: !expanded[row.id] })
          }}
          tableData={MOCK_DATA_GROUP_SEPARATORS}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableGroupSeparators
