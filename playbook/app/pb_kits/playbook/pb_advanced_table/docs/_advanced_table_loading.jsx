import React, { useState } from "react"
import { AdvancedTable } from "playbook-ui"
import { Button } from "playbook-ui"
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableLoading = (props) => {

const [isloading, setIsLoading] = useState(true)

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

  return (
    <div>
      <Button marginBottom="md" 
          onClick={()=> setIsLoading(!isloading)}
          text="Toggle Loading State"
          variant="secondary"
          {...props}
      />
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          loading={isloading}
          tableData={MOCK_DATA}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableLoading
