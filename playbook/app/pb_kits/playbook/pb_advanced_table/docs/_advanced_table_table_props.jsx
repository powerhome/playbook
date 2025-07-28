import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import { Card } from "playbook-ui"
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableTableProps = (props) => {
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

  const tableProps = {
    container: false,
    verticalBorder: true
  }

  return (
    <div>
      <Card padding="md">
        <AdvancedTable
            columnDefinitions={columnDefinitions}
            tableData={MOCK_DATA}
            tableProps={tableProps}
            {...props}
            />
      </Card>

      <Card 
          marginTop="md"
          padding="none" 
      >
        <AdvancedTable
            columnDefinitions={columnDefinitions}
            tableData={MOCK_DATA}
            tableProps={tableProps}
            {...props}
        />
      </Card>
    </div>
  )
}

export default AdvancedTableTableProps
