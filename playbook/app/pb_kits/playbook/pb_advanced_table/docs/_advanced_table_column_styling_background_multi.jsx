import React from "react"
import AdvancedTable from '../_advanced_table'
import colors from '../../tokens/exports/_colors.module.scss'
import MOCK_DATA from "./advanced_table_mock_data.json"


const AdvancedTableColumnStylingBackgroundMulti = (props) => {
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
          label: "Enrollment Stats",
          columns: [
            {
              accessor: "newEnrollments",
              label: "New Enrollments",
              columnStyling:{cellBackgroundColor: colors.error_subtle, headerBackgroundColor: colors.error_subtle},
            },
            {
              accessor: "scheduledMeetings",
              label: "Scheduled Meetings",
            },
          ],
        },
      ],
    },
    {
      label: "Performance Data",
      columns: [
        {
          label: "Completion Metrics",
          columns: [
            {
              accessor: "completedClasses",
              label: "Completed Classes",
              columnStyling:{cellBackgroundColor: colors.info, headerBackgroundColor: colors.info, fontColor: colors.white, headerFontColor: colors.white},
            },
            {
              accessor: "classCompletionRate",
              label: "Class Completion Rate",
            },
          ],
        },
        {
          label: "Attendance",
          columns: [
            {
              accessor: "attendanceRate",
              label: "Attendance Rate",
              columnStyling:{cellBackgroundColor: colors.info_subtle},
            },
            {
              accessor: "scheduledMeetings",
              label: "Scheduled Meetings",
            },
          ],
        },
      ],
    },
  ];


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

export default AdvancedTableColumnStylingBackgroundMulti