import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import Icon from "../../pb_icon/_icon"
import Flex from "../../pb_flex/_flex"
import Caption from "../../pb_caption/_caption"
import Tooltip from "../../pb_tooltip/_tooltip"
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableWithCustomHeaderMultiHeader = (props) => {

const columnDefinitions = [
    {
      accessor: "year",
      label: "Year",
      id: "year",
      cellAccessors: ["quarter", "month", "day"],
    },
    {
      label: "Enrollment Data",
      id: "enrollmentData",
      header: () => (
        <Flex alignItems="center" 
            justifyContent="center"
        >
          <Caption marginRight="xs">Enrollments Data</Caption>
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
      columns: [
        {
          label: "Enrollment Stats",
          id: "enrollmentStats",
          columns: [
            {
              accessor: "newEnrollments",
              id: "newEnrollments",
              label: "New Enrollments",
            },
            {
              accessor: "scheduledMeetings",
              id: "scheduledMeetings",
              label: "Scheduled Meetings",
            },
          ],
        },
      ],
    },
    {
      label: "Performance Data",
      id: "performanceData",
      columns: [
        {
          label: "Completion Metrics",
          id: "completionMetrics",
          columns: [
            {
              accessor: "completedClasses",
              label: "Completed Classes",
              id: "completedClasses",
            },
            {
              accessor: "classCompletionRate",
              label: "Class Completion Rate",
              id: "classCompletionRate",
            },
          ],
        },
        {
          label: "Attendance",
          id: "attendance",
          columns: [
            {
              accessor: "attendanceRate",
              label: "Attendance Rate",
              id: "attendanceRate",
            },
            {
              accessor: "scheduledMeetings",
              label: "Scheduled Meetings",
              id: "scheduledMeetings",
            },
          ],
        },
      ],
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

export default AdvancedTableWithCustomHeaderMultiHeader;
