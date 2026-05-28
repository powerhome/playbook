import React from "react"
import AdvancedTable from "../../pb_advanced_table/_advanced_table"
import Title from "../../pb_title/_title"

const COLUMN_COUNT = 10
const ROW_COUNT = 40

const columnDefinitions = [
  {
    accessor: "region",
    label: "Region",
    id: "region",
    columnStyling: { minWidth: 160 },
  },
  ...Array.from({ length: COLUMN_COUNT }, (_, index) => ({
    accessor: `metric${index + 1}`,
    label: `Metric ${index + 1}`,
    id: `metric${index + 1}`,
    columnStyling: { minWidth: 180 },
  })),
]

const tableData = Array.from({ length: ROW_COUNT }, (_, row) => ({
  region: `Region ${row + 1}`,
  ...Object.fromEntries(
    Array.from({ length: COLUMN_COUNT }, (_, col) => [
      `metric${col + 1}`,
      String((row + 1) * (col + 1)),
    ])
  ),
}))

const tableProps = { sticky: true }

const AdvancedTableStickyScrollLimitation = (props) => (
  <div>
    <Title
        size={4}
        text="Without maxHeight"
        {...props}
    />
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        responsive="none"
        stickyLeftColumn={["region"]}
        tableData={tableData}
        tableProps={tableProps}
        {...props}
    />
    <Title
        paddingTop="sm"
        size={4}
        text="With maxHeight"
        {...props}
    />
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        maxHeight="sm"
        responsive="none"
        stickyLeftColumn={["region"]}
        tableData={tableData}
        tableProps={tableProps}
        {...props}
    />
  </div>
)

export default AdvancedTableStickyScrollLimitation
