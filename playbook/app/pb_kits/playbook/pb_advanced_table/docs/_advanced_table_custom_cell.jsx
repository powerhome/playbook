import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import Pill from "../../pb_pill/_pill"
import Body from "../../pb_body/_body"
import Flex from "../../pb_flex/_flex"
import Detail from "../../pb_detail/_detail"
import Caption from "../../pb_caption/_caption"
import Badge from "../../pb_badge/_badge"
import Title from "../../pb_title/_title"
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
