import React from "react"
import AdvancedTable from '../_advanced_table'
import colors from '../../tokens/exports/_colors.module.scss'
// tokens/exports/_colors.module.scss'
import MOCK_DATA from "./advanced_table_mock_data.json"


const AdvancedTableColumnStyling = (props) => {
  const columnDefinitions = [
    {
      accessor: "year",
      label: "Year",
      cellAccessors: ["quarter", "month", "day"],
    },
    {
      accessor: "newEnrollments",
      label: "New Enrollments",
      columnStyling:{headerAlignment: "left", cellAlignment: "left"},
    },
    {
      accessor: "scheduledMeetings",
      label: "Scheduled Meetings",
      columnStyling:{headerAlignment: "center", cellAlignment: "center"},
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
      columnStyling:{fontColor: colors.data_8},
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

export default AdvancedTableColumnStyling