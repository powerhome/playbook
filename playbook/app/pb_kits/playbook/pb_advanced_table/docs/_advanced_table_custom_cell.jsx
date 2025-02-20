import React from "react"
import { AdvancedTable, Pill, Body, Flex, Detail, Caption, Badge, Title } from "playbook-ui"
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableCustomCell = (props) => {
  const columnDefinitions = [
    {
      accessor: "year",
      label: "Year",
      cellAccessors: ["quarter", "month", "day"],
      customRenderer: (row, value) => (
        <Flex>
          <Title size={4}
              text={value} 
          />
          <Badge dark
              marginLeft="xxs"
              text={row.original.newEnrollments > 20 ? "High" : "Low"}
              variant="neutral"
          />
        </Flex>
      ), 
    },
    {
      accessor: "newEnrollments",
      label: "New Enrollments",
      customRenderer: (row, value) => (
        <Pill text={value} 
            variant="success"    
        />
      ), 
    },
    {
      accessor: "scheduledMeetings",
      label: "Scheduled Meetings",
      customRenderer: (row, value) => <Body><a href="#">{value}</a></Body>, 
    },
    {
      accessor: "attendanceRate",
      label: "Attendance Rate",
      customRenderer: (row, value) => (
        <Flex alignItems="end" 
            orientation="column"
        >
          <Detail bold 
              color="default" 
              text={value} 
          />
          <Caption size="xs">{row.original.graduatedStudents}</Caption>
        </Flex>
      ),
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
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          enableToggleExpansion="all"
          responsive="none"
          tableData={MOCK_DATA}
          {...props}
      >
        <AdvancedTable.Header enableSorting />
        <AdvancedTable.Body />
      </AdvancedTable>
    </div>
  )
}

export default AdvancedTableCustomCell
