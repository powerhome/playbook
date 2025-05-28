import React, { useState } from "react"
import AdvancedTable from '../_advanced_table'
import MOCK_DATA from "./advanced_table_mock_data_with_id.json"

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
    // multi header data
    // {
    //   label: "Enrollment Data",
    //   columns: [
    //     {
    //       accessor: "newEnrollments",
    //       label: "New Enrollments",
    //     },
    //     {
    //       accessor: "scheduledMeetings",
    //       label: "Scheduled Meetings",
    //     },
    //   ],
    // },
    // {
    //   label: "Performance Data",
    //   columns: [
    //     {
    //       accessor: "attendanceRate",
    //       label: "Attendance Rate",
    //     },
    //     {
    //       accessor: "completedClasses",
    //       label: "Completed Classes",
    //     },
    //     {
    //       accessor: "classCompletionRate",
    //       label: "Class Completion Rate",
    //     },
    //     {
    //       accessor: "graduatedStudents",
    //       label: "Graduated Students",
    //     },
    //   ],
    // },
  ]

  // const subRowHeaders = ["Quarter", "Month", "Day"]

  // const [pinnedRows, setPinnedRows] = useState({top: ["8"]})
  const [pinnedRows, setPinnedRows] = useState({top: ["8", "9", "10", "11", "12", "13", "14"]})
  // const [pinnedRows, setPinnedRows] = useState({top: ["1", "2", "3", "4", "5", "6", "7"]})
  // const [pinnedRows, setPinnedRows] = useState({top: ["14"]})

  return (
    <div>
      <Caption text="sticky at larger screens, enable toggle expansion prop" />
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          enableToggleExpansion="all"
          pinnedRows={{value: pinnedRows, onChange: setPinnedRows}}
          // responsive="none"
          tableData={MOCK_DATA}
          tableProps={{sticky: true}}
          {...props}
      >
        <AdvancedTable.Header enableSorting />
        <AdvancedTable.Body 
            // subRowHeaders={subRowHeaders}
        />
      </AdvancedTable>
      <Caption marginTop="lg" 
          text="maxHeight, stickyLeftColumn, and other props CD KPIs page has" 
      />
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          enableToggleExpansion="none"
          inlineRowLoading
          maxHeight="sm"
          pinnedRows={{value: pinnedRows, onChange: setPinnedRows}}
          stickyLeftColumn={["year"]}
          tableData={MOCK_DATA}
          tableProps={{sticky: true}}
          {...props}
      >
        <AdvancedTable.Header enableSorting />
        <AdvancedTable.Body 
            // subRowHeaders={subRowHeaders}
        />
      </AdvancedTable>
    </div>
  )
}

export default AdvancedTableRowPinning
