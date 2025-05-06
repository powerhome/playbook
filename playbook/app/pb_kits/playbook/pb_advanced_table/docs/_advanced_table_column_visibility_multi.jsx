import React, { useState } from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableColumnVisibilityMulti = (props) => {
    const columnDefinitions = [
        {
          accessor: "year",
          label: "Year",
          id: "year",
          cellAccessors: ["quarter", "month", "day"],
        },
        {
          label: "Enrollment Data",
          id: "enrollmentData",
          columns: [
            {
              label: "Enrollment Stats",
              id: "enrollmentStats",
              columns: [
                {
                  accessor: "newEnrollments",
                  label: "New Enrollments",
                  id: "newEnrollments",
                },
                {
                  accessor: "scheduledMeetings",
                  label: "Scheduled Meetings",
                  id: "scheduledMeetings",
                },
              ],
            },
          ],
        },
        {
          label: "Performance Data",
          id: "performanceData",
          columns: [
            {
              label: "Completion Metrics",
              id: "completionMetrics",
              columns: [
                {
                  accessor: "completedClasses",
                  label: "Completed Classes",
                  id: "completedClasses",
                },
                {
                  accessor: "classCompletionRate",
                  label: "Class Completion Rate",
                  id: "classCompletionRate",
                },
              ],
            },
            {
              label: "Attendance",
              id: "attendance",
              columns: [
                {
                  accessor: "attendanceRate",
                  label: "Attendance Rate",
                  id: "attendanceRate",
                },
              ],
            },
          ],
        },
      ];

  const [columnVisibility, setColumnVisibility] = useState()

  const columnVisibilityControl = {
    value: columnVisibility,
    onChange: setColumnVisibility,
  }
  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          columnVisibilityControl={columnVisibilityControl}
          tableData={MOCK_DATA}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableColumnVisibilityMulti