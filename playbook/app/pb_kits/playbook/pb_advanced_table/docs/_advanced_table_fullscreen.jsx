import React, { useState } from "react"
import AdvancedTable from '../_advanced_table'
import Flex from '../../pb_flex/_flex'
import Button from '../../pb_button/_button'
import MOCK_DATA from "./advanced_table_mock_data.json"
import PAGINATION_MOCK_DATA from "./advanced_table_pagination_mock_data.json"

const AdvancedTableFullscreen = (props) => {
  const [fullscreenToggleSmall, setFullscreenToggleSmall] = useState(null)
  const [fullscreenToggleLarge, setFullscreenToggleLarge] = useState(null)

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
      <Flex justify="end">
          <Button
              marginBottom="sm"
              onClick={() => fullscreenToggleSmall?.()}
              text="Fullscreen Small Table"
              variant="secondary"
          />
      </Flex>
      <AdvancedTable
          allowFullScreen
          columnDefinitions={columnDefinitions}
          fullScreenControl={({ toggleFullscreen }) => setFullscreenToggleSmall(() => toggleFullscreen)}
          tableData={MOCK_DATA}
          {...props}
      >
          <AdvancedTable.Header enableSorting />
          <AdvancedTable.Body />
      </AdvancedTable>
      <Flex justify="end">
          <Button
              marginY="sm"
              onClick={() => fullscreenToggleLarge?.()}
              text="Fullscreen Large Table"
              variant="secondary"
          />
      </Flex>
      <AdvancedTable
          allowFullScreen
          columnDefinitions={columnDefinitions}
          fullScreenControl={({ toggleFullscreen }) => setFullscreenToggleLarge(() => toggleFullscreen)}
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