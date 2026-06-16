/* eslint-disable react/no-multi-comp, react/prop-types, no-console */
import React, { useState } from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import Caption from '../../pb_caption/_caption'
import CircleIconButton from "../../pb_circle_icon_button/_circle_icon_button"
import Flex from "../../pb_flex/_flex"
import Title from "../../pb_title/_title"
import MOCK_DATA from "./advanced_table_mock_data.json"

const selectableTableData = Array.from({ length: 15 }, (_, index) => ({
  id: String(2020 + index),
  year: String(2020 + index),
  newEnrollments: String(20 + index),
  scheduledMeetings: String(10 + index),
  attendanceRate: `${50 + index}%`,
  completedClasses: String(3 + index),
  classCompletionRate: `${30 + index}%`,
  graduatedStudents: String(19 + index),
}))

const tableData = Array.from({ length: 15 }, (_, index) => ({
  year: String(2020 + index),
  newEnrollments: String(20 + index),
  scheduledMeetings: String(10 + index),
  attendanceRate: `${50 + index}%`,
  completedClasses: String(3 + index),
  classCompletionRate: `${30 + index}%`,
  graduatedStudents: String(19 + index),
}))

const columnDefinitions = [
  { accessor: "year", label: "Year" },
  { accessor: "newEnrollments", label: "New Enrollments" },
  { accessor: "scheduledMeetings", label: "Scheduled Meetings" },
  { accessor: "attendanceRate", label: "Attendance Rate" },
  { accessor: "completedClasses", label: "Completed Classes" },
  { accessor: "classCompletionRate", label: "Class Completion Rate" },
  { accessor: "graduatedStudents", label: "Graduated Students" },
]

const multiHeaderColumnDefinitions = [
  {
    accessor: "year",
    label: "Year",
    id: "year",
    cellAccessors: ["quarter", "month", "day"],
  },
  {
    label: "Enrollment Data",
    id: "enrollmentData",
    columns: [
      {
        label: "Enrollment Stats",
        id: "enrollmentStats",
        columns: [
          { accessor: "newEnrollments", label: "New Enrollments", id: "newEnrollments" },
          { accessor: "scheduledMeetings", label: "Scheduled Meetings", id: "scheduledMeetings" },
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
          { accessor: "completedClasses", label: "Completed Classes", id: "completedClasses" },
          { accessor: "classCompletionRate", label: "Class Completion Rate", id: "classCompletionRate" },
        ],
      },
      {
        label: "Attendance",
        id: "attendance",
        columns: [
          { accessor: "attendanceRate", label: "Attendance Rate", id: "attendanceRate" },
          { accessor: "graduatedStudents", label: "Graduated Students", id: "graduatedStudents" },
        ],
      },
    ],
  },
]

const multiHeaderSelectableColumnDefinitions = [
  { accessor: "year", label: "Year" },
  {
    label: "Enrollment Data",
    columns: [
      {
        label: "Enrollment Stats",
        columns: [
          { accessor: "newEnrollments", label: "New Enrollments" },
          { accessor: "scheduledMeetings", label: "Scheduled Meetings" },
        ],
      },
    ],
  },
  {
    label: "Performance Data",
    columns: [
      {
        label: "Completion Metrics",
        columns: [
          { accessor: "completedClasses", label: "Completed Classes" },
          { accessor: "classCompletionRate", label: "Class Completion Rate" },
        ],
      },
      {
        label: "Attendance",
        columns: [
          { accessor: "attendanceRate", label: "Attendance Rate" },
          { accessor: "graduatedStudents", label: "Graduated Students" },
        ],
      },
    ],
  },
]

const columnDefinitionsWithIds = columnDefinitions.map((column) => ({
  ...column,
  id: column.accessor,
  cellAccessors: column.accessor === "year" ? ["quarter", "month", "day"] : undefined,
}))

const tableProps = { sticky: true }

const scrollContainerStyle = {
  maxHeight: "320px",
  overflowY: "auto",
}

const StickyHeaderTable = ({ caption, marginTop, responsive, ...tablePropsToPass }) => {
  const isResponsive = responsive === "scroll"

  return (
    <>
      <Caption marginTop={marginTop}
          text={caption}
      />
      {isResponsive ? (
        <AdvancedTable
            maxHeight="xs"
            responsive={responsive}
            tableProps={tableProps}
            {...tablePropsToPass}
        />
      ) : (
        <div style={scrollContainerStyle}>
          <AdvancedTable
              responsive={responsive}
              tableProps={tableProps}
              {...tablePropsToPass}
          />
        </div>
      )}
    </>
  )
}

const SelectableRowsActionsTable = ({
  caption,
  columnDefinitions: tableColumnDefinitions,
  marginTop,
  responsive,
  tableData: rows,
  ...props
}) => {
  const [selectedRows, setSelectedRows] = useState()

  const CustomActions = () => {
    const rowIds = selectedRows ? Object.keys(selectedRows) : []

    return (
      <Flex>
        <CircleIconButton
            icon="file-csv"
            onClick={() =>
            alert(rowIds.length === 0 ? "No Selection Made" : `Row ids ${rowIds.join(", ")} will be exported!`)
          }
            variant="link"
        />
        <CircleIconButton
            icon="trash-alt"
            onClick={() =>
            alert(rowIds.length === 0 ? "No Selection Made" : `Row ids ${rowIds.join(", ")} will be deleted!`)
          }
            variant="link"
        />
      </Flex>
    )
  }

  return (
    <StickyHeaderTable
        actions={<CustomActions />}
        caption={caption}
        columnDefinitions={tableColumnDefinitions}
        enableToggleExpansion="none"
        marginTop={marginTop}
        onRowSelectionChange={setSelectedRows}
        responsive={responsive}
        selectableRows
        tableData={rows}
        {...props}
    />
  )
}

const buildExamples = (responsive, responsiveLabel) => {
  const suffix = responsive === "none" ? "non_responsive" : "responsive"
  const marginTop = "md"

  return [
    {
      key: `default_${suffix}`,
      render: () => (
        <StickyHeaderTable
            caption={`Sticky header (default) — ${responsiveLabel}`}
            columnDefinitions={columnDefinitions}
            marginTop={marginTop}
            responsive={responsive}
            tableData={tableData}
        />
      ),
    },
    {
      key: `column_visibility_${suffix}`,
      render: () => (
        <StickyHeaderTable
            caption={`Sticky header with column visibility control — ${responsiveLabel}`}
            columnDefinitions={columnDefinitionsWithIds}
            columnVisibilityControl={{ default: true }}
            marginTop={marginTop}
            responsive={responsive}
            tableData={MOCK_DATA}
        />
      ),
    },
    {
      key: `column_visibility_multi_${suffix}`,
      render: () => (
        <StickyHeaderTable
            caption={`Sticky header with column visibility control (multi-header columns) — ${responsiveLabel}`}
            columnDefinitions={multiHeaderColumnDefinitions}
            columnVisibilityControl={{ default: true }}
            marginTop={marginTop}
            responsive={responsive}
            tableData={MOCK_DATA}
        />
      ),
    },
    {
      key: `selectable_rows_${suffix}`,
      render: () => (
        <StickyHeaderTable
            caption={`Sticky header with selectable rows — ${responsiveLabel}`}
            columnDefinitions={columnDefinitions}
            enableToggleExpansion="none"
            marginTop={marginTop}
            onRowSelectionChange={(selectedRows) => console.log(selectedRows)}
            responsive={responsive}
            selectableRows
            tableData={selectableTableData}
        />
      ),
    },
    {
      key: `selectable_rows_actions_${suffix}`,
      render: () => (
        <SelectableRowsActionsTable
            caption={`Sticky header with selectable rows and action bar — ${responsiveLabel}`}
            columnDefinitions={columnDefinitions}
            marginTop={marginTop}
            responsive={responsive}
            tableData={selectableTableData}
        />
      ),
    },
    {
      key: `selectable_rows_multi_${suffix}`,
      render: () => (
        <StickyHeaderTable
            caption={`Sticky header with selectable rows (multi-header columns) — ${responsiveLabel}`}
            columnDefinitions={multiHeaderSelectableColumnDefinitions}
            enableToggleExpansion="none"
            marginTop={marginTop}
            onRowSelectionChange={(selectedRows) => console.log(selectedRows)}
            responsive={responsive}
            selectableRows
            tableData={selectableTableData}
        />
      ),
    },
    {
      key: `selectable_rows_actions_multi_${suffix}`,
      render: () => (
        <SelectableRowsActionsTable
            caption={`Sticky header with selectable rows and action bar (multi-header columns) — ${responsiveLabel}`}
            columnDefinitions={multiHeaderSelectableColumnDefinitions}
            marginTop={marginTop}
            responsive={responsive}
            tableData={selectableTableData}
        />
      ),
    },
  ]
}

const AdvancedTableStickyHeader = () => {
  const nonResponsiveExamples = buildExamples("none", "Non Responsive")
  const responsiveExamples = buildExamples("scroll", "Responsive")

  return (
    <div>
      <Title marginBottom="sm"
          size={4}
          tag="h4"
          text="Non Responsive"
      />
      {nonResponsiveExamples.map(({ key, render }) => (
        <React.Fragment key={key}>{render()}</React.Fragment>
      ))}

      <Title marginBottom="sm"
          marginTop="xl"
          size={4}
          tag="h4"
          text="Responsive"
      />
      {responsiveExamples.map(({ key, render }) => (
        <React.Fragment key={key}>{render()}</React.Fragment>
      ))}
    </div>
  )
}

export default AdvancedTableStickyHeader
