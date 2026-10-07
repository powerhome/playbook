import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import Button from '../../pb_button/_button'
import Card from '../../pb_card/_card'
import Filter from '../../pb_filter/_filter'
import Flex from '../../pb_flex/_flex'
import TextInput from '../../pb_text_input/_text_input'
import PAGINATION_MOCK_DATA from "./advanced_table_pagination_mock_data.json"

const AdvancedTablePaginationSectionSeparator = (props) => {
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

  const paginationProps = {
    pageSize: 10,
    sectionSeparator: true,
  }

  return (
    <Card padding="none">
      <Filter
          background={false}
          minWidth="xs"
          results={PAGINATION_MOCK_DATA.length}
          sortOptions={{
            year: "Year",
            newEnrollments: "New Enrollments",
            scheduledMeetings: "Scheduled Meetings",
          }}
          sortValue={[{ name: "year", dir: "asc" }]}
      >
        {({ closePopover }) => (
          <>
            <TextInput label="Year" />
            <Flex spacing="between">
              <Button
                  onClick={closePopover}
                  text="Filter"
              />
              <Button
                  text="Defaults"
                  variant="secondary"
              />
            </Flex>
          </>
        )}
      </Filter>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          pagination
          paginationProps={paginationProps}
          responsive="none"
          tableData={PAGINATION_MOCK_DATA}
          tableProps={{ container: false }}
          {...props}
      />
    </Card>
  )
}

export default AdvancedTablePaginationSectionSeparator
