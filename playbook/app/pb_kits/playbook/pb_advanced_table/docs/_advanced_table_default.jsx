import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import Caption from "../../pb_caption/_caption"
import Flex from "../../pb_flex/_flex"
import Icon from "../../pb_icon/_icon"
import Tooltip from "../../pb_tooltip/_tooltip"
import MOCK_DATA from "./advanced_table_mock_data.json"

const AdvancedTableDefault = (props) => {
  const columnDefinitions = [
    {
      accessor: "time_of_day",
      label: "Time of Day (Local)",
      cellAccessors: ["territory"],
      customRenderer: () => <strong>{"hello"}</strong>,
    },
    {
      label: "Projected Issued Appointments",
      columns: [
        {
          accessor: "projected_non_same_day",
          label: "Non Same Day",
          customRenderer: () => <strong>{"HIII"}</strong>,
        },
        {
          accessor: "projected_same_day",
          label: "Same Day",
          customRenderer: () => <strong>{"hihiiih"}</strong>,
        },
        {
          accessor: "projected_total",
          label: "Total",
          customRenderer: () => <strong>{"value"}</strong>,
        },
      ],
    },
    {
      label: "Actual Issued Appointments",
      columns: [
        {
          accessor: "actual_non_same_day",
          label: "Non Same Day",
          customRenderer: () => <strong>{"value"}</strong>,
        },
        {
          accessor: "actual_same_day",
          label: "Same Day",
          customRenderer: () => <strong>{"value"}</strong>,
        },
        {
          accessor: "actual_total",
          label: "Total",
          customRenderer: () => <strong>{"value"}</strong>,
        },
      ],
    },
    {
      accessor: "difference",
      label: "Difference",
      customRenderer: () => <strong>{"value"}</strong>,
      header: () => (
        <Flex
            alignItems="center"
            justifyContent="center"
        >
          <Caption marginRight="xxs">{"Difference"}</Caption>
          <Tooltip
              placement="bottom"
              text="Difference = Total Projected - Total Actual"
              zIndex={10}
          >
            <Icon
                color="light"
                icon="info-circle"
                size="1x"
            />
          </Tooltip>
        </Flex>
      ),
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

export default AdvancedTableDefault
