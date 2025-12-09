import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import MOCK_DATA from "./advanced_table_row_headers_mock_data.json"
import { Flex, Detail, Background } from 'playbook-ui'


const AdvancedTableRowHeaders = (props) => {
  const columnDefinitions = [
    {
      accessor: "period",
      cellAccessors: ["period"],
      rowSpan: (row) => {
        // "Q3 TOTAL" row should span 2 rows
        if (row.id === "q3-total" || row.id === "july" || row.id === "august" || row.id === "september") {
          return 2
        }
        // "q3-totals" row should not display its first column (it's spanned by parent)
        if (row.id === "q3-totals" || row.id === "july-totals" || row.id === "august-totals"  || row.id === "september-totals") {
          return 0
        }
        return 1
      },
    },
    {
      label: "APPOINTMENTS",
      columns: [
        {
          accessor: "shifts",
          label: "SHIFTS",
          colSpan: (row, value) => {
            if (value && typeof value === 'string' && value.startsWith("Scheduled")) {
              return 7
            }
            return 1
          },
          customRenderer: (row, value) => {
            if (!value || !value.startsWith("Scheduled")) {
              return value
            }
            return (
              <Background
                  backgroundColor={row.id === "q3-totals" ? "success_subtle" : undefined}
                  paddingY="xxs"
              >
                <Flex justify="center">
                  <Detail
                      bold
                      color={row.id === "q3-totals" ? "success" : undefined}
                      text={value}
                      textAlign="center"
                  />
                </Flex>
              </Background>)
          },
        },
        {
          accessor: "created",
          label: "CREATED",
          colSpan: (row, value) => {
            if (!value) {
              return 0;
            }
          },
        },
        {
          accessor: "apptPerShift",
          label: "APPT/SHIFT",
          colSpan: (row, value) => {
            if (!value) {
              return 0;
            }
          },
        },
        {
          accessor: "scheduledFor",
          label: "SCH FOR",
          colSpan: (row, value) => {
            if (!value) {
              return 0;
            }
          },
        },
        {
          accessor: "issued",
          label: "ISSUED",
          colSpan: (row, value) => {
            if (!value) {
              return 0;
            }
          },
        },
        {
          accessor: "issuedPercent",
          label: "ISSUED %",
          colSpan: (row, value) => {
            if (!value) {
              return 0;
            }
          },
        },
        {
          accessor: "gap",
          label: "GAP",
          colSpan: (row, value) => {
            if (!value) {
              return 0;
            }
          },
        },
      ],
    },
    {
      label: "ESTIMATES",
      columns: [
        {
          accessor: "totalEstimates",
          label: "TOTAL",
          customRenderer: (row, value) => {
            if (!value || !value.startsWith("Estimate")) {
              return value
            }
            return (
              <Background
                  backgroundColor={row.id === "q3-totals" ? "success_subtle" : undefined}
                  paddingY="xxs"
              >
                <Flex justify="center">
                  <Detail
                      bold
                      color={row.id === "q3-totals" ? "success" : undefined}
                      text={value}
                      textAlign="center"
                  />
                </Flex>
              </Background>)
          },
          colSpan: (row, value) => {
            if (value && typeof value === 'string' && value.startsWith("Estimate")) {
              return 4
            }
            return 1
          },
        },
        {
          accessor: "cca",
          label: "CCA",
          colSpan: (row, value) => {
            if (!value) {
              return 0;
            }
          },
        },
        {
          accessor: "estPercent",
          label: "EST. %",
          colSpan: (row, value) => {
            if (!value) {
              return 0;
            }
          },
        },
        {
          accessor: "pitchRate",
          label: "PITCH RATE",
          colSpan: (row, value) => {
            if (!value) {
              return 0;
            }
          },
        },
      ],
    },
    {
      label: "SALES",
      columns: [
        {
          accessor: "totalSales",
          label: "TOTAL",
          customRenderer: (row, value) => {
            if (!value || !value.startsWith("Volume")) {
              return value
            }
            return (
              <Background
                  backgroundColor={row.id === "q3-totals" ? "success_subtle" : undefined}
                  paddingY="xxs"
              >
                <Flex justify="center">
                  <Detail
                      bold
                      color={row.id === "q3-totals" ? "success" : undefined}
                      text={value}
                      textAlign="center"
                  />
                </Flex>
              </Background>)
          },
          colSpan: (row, value) => {
            if (value && typeof value === 'string' && value.startsWith("Volume")) {
              return 3
            }
            return 1
          },
        },
        {
          accessor: "closeRate",
          label: "CLOSE RATE",
          colSpan: (row, value) => {
            if (!value) {
              return 0;
            }
          },
        },
        {
          accessor: "volume",
          label: "VOLUME",
          colSpan: (row, value) => {
            if (!value) {
              return 0;
            }
          },
        },
      ],
    },
  ];


  return (
    <>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          enableToggleExpansion="all"
          rowStyling={[
            {
              cellPadding: "none",
              rowId: "july-totals"
            },
            {
              cellPadding: "none",
              rowId: "august-totals"
            },
            {
              cellPadding: "none",
              rowId: "september-totals"
            },
            {
              alwaysAppear: true,
              cellPadding: "none",
              rowId: "q3-totals",
            },
          ]}
          tableData={MOCK_DATA}
          {...props}
      />
    </>
  )
}

export default AdvancedTableRowHeaders

