import React, {useState} from "react"
import { render, screen, waitFor } from "../utilities/test-utils"

import { AdvancedTable } from "../"

const MOCK_DATA = [
  {
    year: "2021",
    quarter: null,
    month: null,
    day: null,
    newEnrollments: "20",
    scheduledMeetings: "10",
    children: [
      {
        year: "2021",
        quarter: "Q1",
        month: null,
        day: null,
        newEnrollments: "2",
        scheduledMeetings: "35",
      },
    ],
  },
  {
    year: "2022",
    quarter: null,
    month: null,
    day: null,
    newEnrollments: "20",
    scheduledMeetings: "10",
    children: [
      {
        year: "2022",
        quarter: "Q1",
        month: null,
        day: null,
        newEnrollments: "2",
        scheduledMeetings: "35",
      },
    ],
  },
]

const MOCK_DATA_LOADING = [
  {
    year: "2021",
    quarter: null,
    month: null,
    day: null,
    newEnrollments: "20",
    scheduledMeetings: "10",
    children: [],
  },
  {
    year: "2022",
    quarter: null,
    month: null,
    day: null,
    newEnrollments: "20",
    scheduledMeetings: "10",
    children: [
      {
        year: "2022",
        quarter: "Q1",
        month: null,
        day: null,
        newEnrollments: "2",
        scheduledMeetings: "35",
      },
    ],
  },
]

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
]

const subRowHeaders = ["Quarter"]

const testId = "advanced_table"

const AdvancedTableExpandControl = () => {
  const [expanded, setExpanded] = useState({'0': true})

  const expandedControl = {
    value: expanded,
    onChange: setExpanded,
  }

return (
  <div>
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        expandedControl={expandedControl}
        tableData={MOCK_DATA}
    />
  </div>
)
}

const AdvancedTableSortControl = () => {
  const [isSortDesc, setIsSortDesc] = useState({desc: false})

  const sortControl = {
    value: isSortDesc,
    onChange: setIsSortDesc,
  }

return (
  <div>
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{testid: testId}}
        sortControl={sortControl}
        tableData={MOCK_DATA}
      >
        <AdvancedTable.Header enableSorting />
        <AdvancedTable.Body />
      </AdvancedTable>
  </div>
)
}

const tableOptions = {
  initialState: {
      sorting: [
        {
          id: "year",
          desc: true,
        },
      ],
    },
}

const tableProps = {
  container: false,
  sticky: true
}

test("Generates default kit and classname", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toBeInTheDocument()
  expect(kit).toHaveClass('pb_advanced_table')
})

test("Generates aria label", () => {
  render(
    <AdvancedTable
        aria={{label:testId}}
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveAttribute('aria-label', testId)
})

test("Row toggle button exists and toggles subrows open and closed", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
    />
  )

  const kit = screen.getByTestId(testId)
  const rowButton = kit.querySelector(".gray-icon.expand-toggle-icon")
  expect(rowButton).toBeInTheDocument()
  const subRow1 = kit.querySelector(".bg-white.depth-sub-row-1")
  expect(subRow1).not.toBeInTheDocument()
  rowButton.click()
  const subRow = kit.querySelector(".bg-white.depth-sub-row-1")
  expect(subRow).toBeInTheDocument()
})

test("toggleExpansionAll button exists and toggles subrows open and closed", async () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
    />
  )

  const kit = screen.getByTestId(testId);
  const toggleButton = kit.querySelector(".gray-icon.toggle-all-icon");
  expect(toggleButton).toBeInTheDocument();

  const subRow1 = kit.querySelector(".bg-white.depth-sub-row-1");
  expect(subRow1).not.toBeInTheDocument();

  toggleButton.click();

  await waitFor(() => {
    const subRow = kit.querySelector(".bg-white.depth-sub-row-1");
    expect(subRow).toBeInTheDocument();
  })
})


test("loading state + initialLoadingRowCount prop", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        initialLoadingRowsCount={13}
        loading
        tableData={MOCK_DATA}
    />
  )

  const kit = screen.getByTestId(testId)
  const table = kit.querySelector('table')
  expect(table).toHaveClass('pb_table table-sm table-responsive-none table-card data_table ns_tabular content-loading')

  const tableBody = kit.querySelector('tbody')
  const tableRows = tableBody.getElementsByTagName('tr')
  expect(tableRows).toHaveLength(13)
})

test("subRowHeaders are rendered", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
    >
      <AdvancedTable.Header />
      <AdvancedTable.Body subRowHeaders={subRowHeaders}/>
    </AdvancedTable>
    )

  const kit = screen.getByTestId(testId)

  const rowButton = kit.querySelector(".gray-icon.expand-toggle-icon")
  rowButton.click()
  
  const subRowHeader = kit.querySelector(".custom-row.bg-silver")
  expect(subRowHeader).toBeInTheDocument()
})

test("expandControl prop works as expected", () => {
  render (<AdvancedTableExpandControl/>)

  const kit = screen.getByTestId(testId)
  const subRow = kit.querySelector(".bg-white.depth-sub-row-1")
  expect(subRow).toBeInTheDocument()
})

test("tableOptions prop functions as expected", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
        tableOptions={tableOptions}
    />
  )

  const kit = screen.getByTestId(testId)
  const row1 = kit.getElementsByTagName('tr')[1]
  
  expect(row1.id).toBe("1-1-0-row")
})

test("tableProps prop functions as expected", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
        tableProps={tableProps}
    />
  )

  const kit = screen.getByTestId(testId)
  const table = kit.querySelector('table')
  expect(table).toHaveClass("pb_table table-sm table-responsive-none data_table sticky-header ns_tabular")
})

test("enableExpansionIcon changes icon", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
        tableProps={tableProps}
        toggleExpansionIcon= "chevron-up"
    />
  )

  const kit = screen.getByTestId(testId)
  const tableHead = kit.querySelector('table')
  const toggleIcon= tableHead.querySelector(".pb_icon_kit")
  expect(toggleIcon).toHaveClass("fa-chevron-up")
})

test("sortIcon changes icon", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
        tableProps={tableProps}
    >
      <AdvancedTable.Header 
          enableSorting
          sortIcon= {["chevron-up","chevron-down"]}
      />
      <AdvancedTable.Body />
    </AdvancedTable>
  )

  const kit = screen.getByTestId(testId)
  const sortIcon = kit.querySelector('.sort-button-icon')
  const icon= sortIcon.querySelector(".pb_icon_kit")
  expect(icon).toHaveClass("fa-chevron-down")
})

test("Sort icon renders with enableSorting + sortControl works as expected", () => {
  render (<AdvancedTableSortControl/>)

  const kit = screen.getByTestId(testId)
  const sortIcon = kit.querySelector(".sort-button-icon")
  expect(sortIcon).toBeInTheDocument()

  const row1 = kit.getElementsByTagName('tr')[1]
  
  expect(row1.id).toBe("1-1-0-row")
})

test("sort button exists and sorts column data", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
    >
      <AdvancedTable.Header enableSorting />
      <AdvancedTable.Body />
    </AdvancedTable>
  )

  const kit = screen.getByTestId(testId)

  const sortButton= kit.querySelector(".pb_flex_kit_orientation_row_justify_content_between_align_items_top_spacing_none.pl_xxs.cursor_pointer.header-sort-button.pb_th_link")
  expect(sortButton).toBeInTheDocument()

  const row1 = kit.getElementsByTagName('tr')[1]
  
  expect(row1.id).toBe("0-0-0-row")
  sortButton.click()

  const row2 = kit.getElementsByTagName('tr')[2]
  expect(row2.id).toBe("0-0-0-row")
}) 

test("Generates Table.Header default + custom classname", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
    >
      <AdvancedTable.Header className="custom-header" />
      <AdvancedTable.Body />

    </AdvancedTable>
  )

  const kit = screen.getByTestId(testId)
  const tableHeader = kit.querySelector('thead')
  expect(tableHeader).toHaveClass('pb_advanced_table_header custom-header')
})

test("Generates Table.Body default + custom classname", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
    >
      <AdvancedTable.Header />
      <AdvancedTable.Body className="custom-body-classname"/>

    </AdvancedTable>
  )

  const kit = screen.getByTestId(testId)
  const tableHeader = kit.querySelector('tbody')
  expect(tableHeader).toHaveClass('pb_advanced_table_body custom-body-classname')
})

test("inlineRowLoading prop renders inline loading if true", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        inlineRowLoading
        tableData={MOCK_DATA_LOADING}
    />
  )

  const kit = screen.getByTestId(testId)
  const rowButton = kit.querySelector(".gray-icon.expand-toggle-icon")
  expect(rowButton).toBeInTheDocument()
  rowButton.click()
  const inlineLoading = kit.querySelector(".fa-spinner")
  expect(inlineLoading).toBeInTheDocument()
})