import React from "react"
import AdvancedTable from '../_advanced_table'
import { MOCK_DATA_INLINE_LOADING_EMPTY_CHILDREN } from "./_mock_data_inline_loading_empty_children"

const AdvancedTableInlineRowLoadingShowToggle = (props) => {
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
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          enableToggleExpansion="all"
          inlineRowLoading
          showToggleWithInlineRowLoading
          tableData={MOCK_DATA_INLINE_LOADING_EMPTY_CHILDREN}
          {...props}
      >
        <AdvancedTable.Header />
        <AdvancedTable.Body subRowHeaders={subRowHeaders}/>
      </AdvancedTable>
    </div>
  )
}

export default AdvancedTableInlineRowLoadingShowToggle