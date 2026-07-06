import React, { useState } from "react"
import AdvancedTable from '../_advanced_table'
import MOCK_DATA_WITH_ID from "./advanced_table_mock_data_with_id.json"
import Caption from "../../pb_caption/_caption"

const AdvancedTableRowPinning = (props) => {
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

  const [pinnedRowsTop, setPinnedRowsTop] = useState({top: ["8"]})
  const [pinnedRowsBottom, setPinnedRowsBottom] = useState({bottom: ["8"]})

  return (
    <div>
      <Caption text="Pinned Rows Top" />
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          maxHeight="xs"
          pinnedRows={{value: pinnedRowsTop, onChange: setPinnedRowsTop}}
          tableData={MOCK_DATA_WITH_ID}
          tableProps={{sticky: true}}
          {...props}
      >
        <AdvancedTable.Header enableSorting />
        <AdvancedTable.Body />
      </AdvancedTable>
      <Caption marginTop="md"
          text="Pinned Rows Bottom"
      />
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          maxHeight="xs"
          pinnedRows={{value: pinnedRowsBottom, onChange: setPinnedRowsBottom}}
          tableData={MOCK_DATA_WITH_ID}
          tableProps={{sticky: true}}
          {...props}
      >
        <AdvancedTable.Header enableSorting />
        <AdvancedTable.Body />
      </AdvancedTable>
    </div>
  )
}

export default AdvancedTableRowPinning
