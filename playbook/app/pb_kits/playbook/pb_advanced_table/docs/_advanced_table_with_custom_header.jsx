import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import Icon from "../../pb_icon/_icon"
import Flex from "../../pb_flex/_flex"
import Caption from "../../pb_caption/_caption"
import Tooltip from "../../pb_tooltip/_tooltip"
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableWithCustomHeader = (props) => {
  const columnDefinitions = [
    {
      accessor: "year",
      label: "Year",
      cellAccessors: ["quarter", "month", "day"],
    },
    {
      accessor: "newEnrollments",
      label: "New Enrollments",
      header: () => (
        <Flex alignItems="center" 
            justifyContent="center"
        >
          <Caption marginRight="xs">New Enrollments</Caption>
          <Tooltip placement="top" 
              text="Whoa. I'm a Tooltip" 
              zIndex={10}
          >
            <Icon cursor="pointer" 
                icon="info"
                size="xs" 
            />
          </Tooltip>
        </Flex>
      ),
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
  ];

  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          tableData={MOCK_DATA}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableWithCustomHeader
