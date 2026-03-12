import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import MOCK_DATA from "./advanced_table_mock_data.json"

import Caption from "../../pb_caption/_caption"

const sharedColumnDefinitions = [
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

const sortByColumnDefinitions = [
  {
    accessor: "year",
    label: "Year",
    cellAccessors: ["quarter", "month", "day"],
  },
  {
    accessor: "newEnrollments",
    label: "New Enrollments",
    enableSort: true,
  },
  {
    accessor: "scheduledMeetings",
    label: "Scheduled Meetings",
  },
  {
    accessor: "attendanceRate",
    label: "Attendance Rate",
    enableSort: true,
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

const sortByColumnMultiDefinitions = [
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
          {
            accessor: "newEnrollments",
            label: "New Enrollments",
            enableSort: true,
          },
          {
            accessor: "scheduledMeetings",
            label: "Scheduled Meetings",
          },
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
          {
            accessor: "completedClasses",
            label: "Completed Classes",
            enableSort: true,
          },
          {
            accessor: "classCompletionRate",
            label: "Class Completion Rate",
          },
        ],
      },
      {
        label: "Attendance",
        columns: [
          {
            accessor: "attendanceRate",
            label: "Attendance Rate",
          },
          {
            accessor: "scheduledMeetings",
            label: "Scheduled Meetings",
          },
        ],
      },
    ],
  },
]

const AdvancedTableSortParentOnly = (props) => {
  return (
    <div>
      <Caption text="Enable Sorting (first column) + sortParentOnly" />
      <AdvancedTable
          columnDefinitions={sharedColumnDefinitions}
          sortParentOnly
          tableData={MOCK_DATA}
          {...props}
      >
        <AdvancedTable.Header enableSorting />
        <AdvancedTable.Body />
      </AdvancedTable>
      <Caption marginTop="md" 
          text="Sort by column + sortParentOnly"
      />
      <AdvancedTable
          columnDefinitions={sortByColumnDefinitions}
          enableSortingRemoval
          sortParentOnly
          tableData={MOCK_DATA}
          {...props}
      >
        <AdvancedTable.Header />
        <AdvancedTable.Body />
      </AdvancedTable>
      <Caption marginTop="md" 
          text="Sort by column (multi-column) + sortParentOnly"
      />
      <AdvancedTable
          columnDefinitions={sortByColumnMultiDefinitions}
          enableSortingRemoval
          sortParentOnly
          tableData={MOCK_DATA}
          {...props}
      >
        <AdvancedTable.Header enableSorting />
        <AdvancedTable.Body />
      </AdvancedTable>
    </div>
  )
}

export default AdvancedTableSortParentOnly
