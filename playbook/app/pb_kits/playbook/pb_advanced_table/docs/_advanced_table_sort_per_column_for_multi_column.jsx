import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableSortPerColumnForMultiColumn = (props) => {
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
              enableSort: true,
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
              enableSort: true,
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
          enableSortingRemoval
          tableData={MOCK_DATA}
          {...props}
      >
        <AdvancedTable.Header enableSorting />
        <AdvancedTable.Body />
      </AdvancedTable>
    </div>
  )
}

export default AdvancedTableSortPerColumnForMultiColumn;
