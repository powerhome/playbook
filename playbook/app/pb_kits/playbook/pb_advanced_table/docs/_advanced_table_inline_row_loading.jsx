import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import Caption from '../../pb_caption/_caption'
import { MOCK_DATA_INLINE_LOADING } from "./_mock_data_inline_loading"
import { MOCK_DATA_INLINE_LOADING_EMPTY_CHILDREN } from "./_mock_data_inline_loading_empty_children"

const AdvancedTableInlineRowLoading = (props) => {
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

  //Render the subRow header rows
  const subRowHeaders = ["Quarter", "Month", "Day"]


  return (
    <div>
      <Caption>Inline Row Loading</Caption>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          enableToggleExpansion="all"
          inlineRowLoading
          marginBottom="md"
          tableData={MOCK_DATA_INLINE_LOADING}
          {...props}
      >
        <AdvancedTable.Header />
        <AdvancedTable.Body subRowHeaders={subRowHeaders}/>
      </AdvancedTable>
      <Caption>Inline Row Loading with Persist Toggle Expansion Button</Caption>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          enableToggleExpansion="all"
          inlineRowLoading
          persistToggleExpansionButton
          tableData={MOCK_DATA_INLINE_LOADING_EMPTY_CHILDREN}
          {...props}
      >
        <AdvancedTable.Header />
        <AdvancedTable.Body subRowHeaders={subRowHeaders}/>
      </AdvancedTable>
    </div>
  )
}

export default AdvancedTableInlineRowLoading