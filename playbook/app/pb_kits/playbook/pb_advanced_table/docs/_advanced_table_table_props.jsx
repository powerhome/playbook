import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import MOCK_DATA from "./advanced_table_mock_data.json"
import Caption from "../../pb_caption/_caption"

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

  const columnDefinitionsTwo = [
    {
      accessor: "year",
      label: "Year",
      cellAccessors: ["quarter", "month", "day"],
    },
    {
      label: "Enrollment Data",
      columns: [
        {
          accessor: "newEnrollments",
          label: "New Enrollments",
        },
        {
          accessor: "scheduledMeetings",
          label: "Scheduled Meetings",
        },
      ],
    },
    {
      label: "Performance Data",
      columns: [
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
      ],
    },
  ];

  const tablePropsTwo = {
    verticalBorder: true,
  }

  const columnDefinitionsThree = [
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
  ];

  const tablePropsThree = {
    verticalBorder: true
  }

  const columnDefinitionsFour = [
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
  ];

  return (
    <div>
      <Caption text="Advanced Table Vertical Border Table Props" />
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          marginBottom="md"
          tableData={MOCK_DATA}
          tableProps={tableProps}
          {...props}
      />
      <Caption text="Advanced Table Vertical Border Multi Header" />
      <AdvancedTable
          columnDefinitions={columnDefinitionsTwo}
          marginBottom="md"
          tableData={MOCK_DATA}
          tableProps={tablePropsTwo}
          {...props}
      />
      <Caption text="Advanced Table Vertical Border Multi Header with Column Group Border Color" />
      <AdvancedTable
          columnDefinitions={columnDefinitionsThree}
          columnGroupBorderColor="text_lt_default"
          marginBottom="md"
          tableData={MOCK_DATA}
          tableProps={tablePropsThree}
          {...props}
      />
      <Caption text="Advanced Table Vertical Border Multi Header No Vertical Border" />
      <AdvancedTable
          columnDefinitions={columnDefinitionsFour}
          tableData={MOCK_DATA}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableTableProps
