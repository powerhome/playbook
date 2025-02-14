import React, { useState } from "react"
import { AdvancedTable, Button, Caption } from "playbook-ui"
import MOCK_DATA from "./advanced_table_mock_data.json"
import PAGINATION_MOCK_DATA from "./advanced_table_pagination_mock_data.json"

const AdvancedTableFullscreen = (props) => {
  const [fullscreenToggle, setFullscreenToggle] = useState(null)

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
    sticky: true
  }

  return (
    <div>
      <Caption text="Smaller table showcasing button + icon activation and fullscreen scss (light + dark mode)" />
      <Button
          marginBottom="sm"
          onClick={() => fullscreenToggle?.()}
          text="Fullscreen"
          variant="secondary"
      />
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          fullscreenable
          getFullscreenControls={({ toggleFullscreen }) => setFullscreenToggle(() => toggleFullscreen)}
          tableData={MOCK_DATA}
          {...props}
      >
          <AdvancedTable.Header enableSorting />
          <AdvancedTable.Body />
      </AdvancedTable>
      <Caption 
          marginTop="xl" 
          text="Larger table mimicking NetSalesKPI table" 
      />
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          fullscreenable
          responsive="none"
          tableData={PAGINATION_MOCK_DATA}
          tableProps={tableProps}
          {...props}
      >
          <AdvancedTable.Header enableSorting />
          <AdvancedTable.Body />
      </AdvancedTable>
    </div>
  )
}

export default AdvancedTableFullscreen
