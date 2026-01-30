import React from "react"
import AdvancedTable from '../_advanced_table'
import colors from '../../tokens/exports/_colors.module.scss'
import MOCK_DATA from "./advanced_table_mock_data.json"
import  Flex  from '../../pb_flex/_flex'
import  Title  from '../../pb_title/_title'
import  Body  from '../../pb_body/_body'


const AdvancedTableColumnStylingBackgroundCustom = (props) => {
  const columnDefinitions = [
{
      accessor: "year",
      label: "Year",
      cellAccessors: ["quarter", "month", "day"],
      customRenderer: (row, value) => (
        <Flex flexDirection="column">
          <Title size={4}
              text={value} 
          />
          <Body text="lorem ipsum" />
          <Body text="lorem ipsum" />
        </Flex>
      ), 
    },
    {
      accessor: "newEnrollments",
      label: "New Enrollments",
      columnStyling:{
        cellBackgroundColor: (row) => row.original.newEnrollments > 15 ? colors.success_subtle : colors.error_subtle,
        fontColor: (row) => row.original.newEnrollments > 15 ? colors.success : colors.error,
      },
    },
    {
      accessor: "scheduledMeetings",
      label: "Scheduled Meetings",
      columnStyling:{
        cellBackgroundColor: (row) => row.original.scheduledMeetings >= 15 ? colors.info_subtle : colors.warning_subtle
      },
    },
    {
      accessor: "attendanceRate",
      label: "Attendance Rate",
      columnStyling:{cellBackgroundColor: colors.info, headerBackgroundColor: colors.info, fontColor: colors.white, headerFontColor: colors.white},
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
          tableData={MOCK_DATA}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableColumnStylingBackgroundCustom