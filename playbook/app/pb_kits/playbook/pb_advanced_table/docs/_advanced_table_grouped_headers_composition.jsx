/* eslint-disable react/no-multi-comp, react/prop-types */
import React, { useCallback, useState } from "react"

import AdvancedTable from "../_advanced_table"
import Flex from "../../pb_flex/_flex"
import Icon from "../../pb_icon/_icon"
import List from "../../pb_list/_list"
import ListItem from "../../pb_list/_list_item"
import PbReactPopover from "../../pb_popover/_popover"
import SectionSeparator from "../../pb_section_separator/_section_separator"
import StarRating from "../../pb_star_rating/_star_rating"
import COMPOSITION_MOCK_DATA from "./advanced_table_grouped_headers_composition_mock_data.json"

const LEAF_COUNT = "newEnrollments"
const LEAF_SCHEDULED = "scheduledMeetings"

const ICON_UNSORTED = "arrow-up-arrow-down"
const iconSorted = (desc) => (desc ? "arrow-up-wide-short" : "arrow-down-short-wide")

const STAR_MENU = [
  { id: LEAF_COUNT, label: "Count" },
  { id: LEAF_SCHEDULED, label: "Scheduled" },
]

const MENU_BTN = {
  alignItems: "center",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  display: "flex",
  font: "inherit",
  gap: 12,
  justifyContent: "space-between",
  padding: "8px 14px",
  textAlign: "left",
  width: "100%",
}

const labelStyle = (active) => ({
  color: active ? "#0056cf" : "#242930",
  flex: 1,
  fontSize: 14,
  fontWeight: active ? 600 : 400,
})

/** Hooks + popover; `header` callback cannot use hooks directly. */
const StarMetricGroupHeader = ({ table }) => {
  const [open, setOpen] = useState(false)
  const menuId = "playbook-star-metric-sort-menu"

  const sort0 = table.getState().sorting[0]
  const groupActive =
    sort0?.id === LEAF_COUNT || sort0?.id === LEAF_SCHEDULED

  const close = useCallback((shouldClose) => setOpen(!shouldClose), [])
  const toggle = useCallback((e) => {
    e.stopPropagation()
    setOpen((v) => !v)
  }, [])

  const applySort = useCallback(
    (columnId, e) => {
      e.stopPropagation()
      const cur = table.getState().sorting[0]
      const nextDesc = cur?.id === columnId ? !cur.desc : true
      table.setSorting([{ desc: nextDesc, id: columnId }])
      setOpen(false)
    },
    [table]
  )

  return (
    <PbReactPopover
        closeOnClick="outside"
        offset
        padding="none"
        placement="bottom-start"
        reference={
          <button
              aria-controls={menuId}
              aria-expanded={open}
              aria-haspopup="menu"
              aria-label="Sort by Count or Scheduled"
              onClick={toggle}
              style={{
                background: open ? "rgba(115, 134, 169, 0.14)" : "transparent",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                font: "inherit",
                margin: 0,
                padding: "2px 4px",
              }}
              title="Open menu to sort by Count or Scheduled"
              type="button"
          >
            <Flex alignItems="center"
                gap="xs"
                justifyContent="center"
            >
              <StarRating
                  backgroundType="outline"
                  colorOption="primary"
                  justifyContent="center"
                  maxWidth="102px"
                  rating={5}
              />
              <Icon
                  color={groupActive ? "primary" : "default"}
                  fixedWidth
                  icon={
                    groupActive
                      ? iconSorted(Boolean(sort0?.desc))
                      : ICON_UNSORTED
                  }
                  size="md"
              />
            </Flex>
          </button>
        }
        shouldClosePopover={close}
        show={open}
        zIndex={1200}
    >
      <Flex id={menuId}
          minWidth="220px"
          orientation="column"
      >
        <List borderless
            padding="none"
        >
          {STAR_MENU.map(({ id, label }, i) => {
            const active = sort0?.id === id
            return (
              <React.Fragment key={id}>
                {i > 0 ? <SectionSeparator margin="none" /> : null}
                <ListItem padding="none">
                  <button
                      onClick={(e) => applySort(id, e)}
                      style={MENU_BTN}
                      type="button"
                  >
                    <span style={labelStyle(active)}>{label}</span>
                    <Icon
                        color={active ? "primary" : "default"}
                        fixedWidth
                        icon={
                          active
                            ? iconSorted(Boolean(sort0?.desc))
                            : ICON_UNSORTED
                        }
                        size="md"
                    />
                  </button>
                </ListItem>
              </React.Fragment>
            )
          })}
        </List>
      </Flex>
    </PbReactPopover>
  )
}

const AdvancedTableGroupedHeadersComposition = (props) => {
  const [pinnedRows, setPinnedRows] = useState({ top: ["12"] })

  const columnDefinitions = [
    {
      accessor: "year",
      cellAccessors: ["quarter", "month", "day"],
      label: "Year",
    },
    {
      columns: [
        {
          columns: [
            {
              accessor: "newEnrollments",
              enableSort: true,
              id: LEAF_COUNT,
              label: "Count",
            },
            {
              accessor: "scheduledMeetings",
              enableSort: true,
              id: LEAF_SCHEDULED,
              label: "Scheduled",
            },
          ],
          id: "starLeafPair",
          label: "Metrics",
        },
      ],
      header: ({ table }) => (
        <Flex justify="center">
          <StarMetricGroupHeader table={table} />
        </Flex>
      ),
      id: "starMetricGroup",
      label: "Rating group (custom header)",
    },
    {
      columns: [
        { accessor: "attendanceRate", label: "Attendance" },
        {
          accessor: "classCompletionRate",
          enableSort: true,
          id: "classCompletionRate",
          label: "Completion %",
        },
      ],
      label: "Performance",
    },
  ]

  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          enableSortingRemoval
          maxHeight="md"
          pinnedRows={{ onChange: setPinnedRows, value: pinnedRows }}
          tableData={COMPOSITION_MOCK_DATA}
          tableProps={{ sticky: true }}
          {...props}
      >
        <AdvancedTable.Header enableSorting />
        <AdvancedTable.Body />
      </AdvancedTable>
    </div>
  )
}

export default AdvancedTableGroupedHeadersComposition
