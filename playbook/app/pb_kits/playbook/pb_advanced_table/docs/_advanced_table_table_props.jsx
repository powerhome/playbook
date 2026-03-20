import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import MOCK_DATA from "./advanced_table_mock_data.json"
import Button from "../../pb_button/_button"
import Caption from "../../pb_caption/_caption"
import Card from "../../pb_card/_card"
import Filter from "../../pb_filter/_filter"
import Flex from "../../pb_flex/_flex"
import SectionSeparator from "../../pb_section_separator/_section_separator"
import TextInput from "../../pb_text_input/_text_input"

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

  const filterPopoverProps = { width: "350px" }

  const filterForm = (closePopover) => (
    <form>
      <TextInput
          label="New Leads"
          name="new_leads_eq"
          placeholder="0"
          type="number"
          {...props}
      />
      <TextInput
          label="Conversion Rate"
          name="conversion_rate_eq"
          placeholder="e.g. 12%"
          {...props}
      />
      <Flex
          spacing="between"
          {...props}
      >
        <Button
            onClick={closePopover}
            text="Filter"
            {...props}
        />
        <Button
            text="Defaults"
            type="reset"
            variant="secondary"
            {...props}
        />
      </Flex>
    </form>
  )

  return (
    <div>
      <Caption
          text="Default Advanced Table Table Props Doc Example"
      />
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          marginBottom="md"
          tableData={MOCK_DATA}
          tableProps={tableProps}
          {...props}
      />
      <Caption
          text="Advanced Table with just container: false"
      />
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          marginBottom="md"
          tableData={MOCK_DATA}
          tableProps={{container: false}}
          {...props}
      />

      <Caption
          text="Typical set up: Card and Flex around Filter, SectionSeparator, and AdvancedTable with container: false"
      />
      <Card
          marginBottom="xl"
          padding="none"
          {...props}
      >
        <Flex
            align="stretch"
            gap="none"
            orientation="column"
            {...props}
        >
          <Filter
              background={false}
              id="react-table-props-filter-with-data"
              maxHeight={MOCK_DATA.length < 10 ? "50vh" : "none"}
              minWidth="xs"
              popoverProps={filterPopoverProps}
              results={MOCK_DATA.length}
              {...props}
          >
            {({ closePopover }) => filterForm(closePopover)}
          </Filter>
          <SectionSeparator {...props} />
          <AdvancedTable
              columnDefinitions={columnDefinitions}
              id="react_template_advanced_table"
              tableData={MOCK_DATA}
              tableProps={{container: false}}
              {...props}
          />
        </Flex>
      </Card>
    </div>
  )
}

export default AdvancedTableTableProps
