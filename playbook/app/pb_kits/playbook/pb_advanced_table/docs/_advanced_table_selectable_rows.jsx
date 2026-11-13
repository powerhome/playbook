/* eslint-disable no-console */
import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import Caption from '../../pb_caption/_caption'
import Title from '../../pb_title/_title'

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
          { accessor: "newEnrollments", label: "New Enrollments" },
          { accessor: "scheduledMeetings", label: "Scheduled Meetings" },
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
          { accessor: "completedClasses", label: "Completed Classes" },
          { accessor: "classCompletionRate", label: "Class Completion Rate" },
        ],
      },
      {
        label: "Attendance",
        columns: [
          { accessor: "attendanceRate", label: "Attendance Rate" },
          { accessor: "graduatedStudents", label: "Graduated Students" },
        ],
      },
    ],
  },
]

const subRowHeaders = ["Quarter", "Month", "Day"]
const months = ["January", "April", "July", "October", "December"]

const buildTableData = (tableId) => (
  Array.from({ length: 5 }, (_, index) => {
    const year = 2020 + index

    return {
      id: `${tableId}-${year}`,
      year: String(year),
      quarter: `Q${(index % 4) + 1}`,
      month: months[index],
      day: String(index + 1),
      newEnrollments: String(20 + index),
      scheduledMeetings: String(10 + index),
      attendanceRate: `${50 + index}%`,
      completedClasses: String(3 + index),
      classCompletionRate: `${30 + index}%`,
      graduatedStudents: String(19 + index),
    }
  })
)

const buildTableDataSubrows = (tableId) => (
  Array.from({ length: 5 }, (_, index) => {
    const year = 2020 + index
    const quarter = `Q${(index % 4) + 1}`

    return {
      id: `${tableId}-${year}`,
      year: String(year),
      quarter,
      month: months[index],
      day: String(index + 1),
      newEnrollments: String(20 + index),
      scheduledMeetings: String(10 + index),
      attendanceRate: `${50 + index}%`,
      completedClasses: String(3 + index),
      classCompletionRate: `${30 + index}%`,
      graduatedStudents: String(19 + index),
      children: [
        {
          id: `${tableId}-${year}-q${(index % 4) + 1}`,
          quarter,
          month: months[index],
          day: String(index + 1),
        },
      ],
    }
  })
)

const standardAllData = buildTableDataSubrows("standard_multi_column_all")
const standardNoneData = buildTableData("standard_multi_column_none")
const segmentedAllData = buildTableDataSubrows("segmented_multi_column_all")
const segmentedNoneData = buildTableData("segmented_multi_column_none")

const AdvancedTableSelectableRows = (props) => (
  <div>
    <Title
        marginBottom="sm"
        size={4}
        tag="h4"
        text="Standard AdvancedTable"
    />

    <Caption
        text="Multi-column headers with selectable rows and expandable subrows — Standard / Enable Toggle Expansion All"
    />
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        enableToggleExpansion="all"
        marginBottom="md"
        onRowSelectionChange={(selectedRows) => console.log(selectedRows)}
        selectableRows
        subRowHeaders={subRowHeaders}
        tableData={standardAllData}
        {...props}
    />

    <Caption
        text="Multi-column headers with selectable rows — Standard / Enable Toggle Expansion None"
    />
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        enableToggleExpansion="none"
        onRowSelectionChange={(selectedRows) => console.log(selectedRows)}
        selectableRows
        tableData={standardNoneData}
        {...props}
    />

    <Title
        marginBottom="sm"
        marginTop="xl"
        size={4}
        tag="h4"
        text="Segmented AdvancedTable"
    />

    <Caption
        text="Multi-column headers with selectable rows and expandable subrows — Subcomponent / Enable Toggle Expansion All"
    />
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        enableToggleExpansion="all"
        marginBottom="md"
        onRowSelectionChange={(selectedRows) => console.log(selectedRows)}
        selectableRows
        tableData={segmentedAllData}
        {...props}
    >
      <AdvancedTable.Header />
      <AdvancedTable.Body subRowHeaders={subRowHeaders} />
    </AdvancedTable>

    <Caption
        text="Multi-column headers with selectable rows — Subcomponent / Enable Toggle Expansion None"
    />
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        enableToggleExpansion="none"
        onRowSelectionChange={(selectedRows) => console.log(selectedRows)}
        selectableRows
        tableData={segmentedNoneData}
        {...props}
    >
      <AdvancedTable.Header />
      <AdvancedTable.Body subRowHeaders={subRowHeaders} />
    </AdvancedTable>
  </div>
)

export default AdvancedTableSelectableRows
