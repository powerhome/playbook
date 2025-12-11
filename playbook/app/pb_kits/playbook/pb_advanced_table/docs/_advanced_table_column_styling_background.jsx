import React from "react"
import AdvancedTable from '../_advanced_table'
import colors from '../../tokens/exports/_colors.module.scss'
import MOCK_DATA from "./advanced_table_mock_data.json"


const AdvancedTableColumnStylingBackground = (props) => {
  const columnDefinitions = [
    {
      accessor: "year",
      label: "Year",
      cellAccessors: ["quarter", "month", "day"],
    },
    {
      accessor: "newEnrollments",
      label: "New Enrollments",
      columnStyling:{cellBackgroundColor: colors.error_subtle, headerBackgroundColor: colors.error_subtle},
    },
    {
      accessor: "scheduledMeetings",
      label: "Scheduled Meetings",
      columnStyling:{cellBackgroundColor: colors.info_subtle},
    },
    {
      accessor: "attendanceRate",
      label: "Attendance Rate",
      columnStyling:{cellBackgroundColor: colors.info, headerBackgroundColor: colors.info, fontColor: colors.white, headerFontColor: colors.white},
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
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          tableData={MOCK_DATA}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableColumnStylingBackground