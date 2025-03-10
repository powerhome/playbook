import React from "react"
import { default as AdvancedTable } from "../_advanced_table"
import { default as Pill } from "../../pb_pill/_pill"
import { default as Body } from "../../pb_body/_body"
import { default as Flex } from "../../pb_flex/_flex"
import { default as Detail } from "../../pb_detail/_detail"
import { default as Caption } from "../../pb_caption/_caption"
import { default as Badge } from "../../pb_badge/_badge"
import { default as Title } from "../../pb_title/_title"
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
