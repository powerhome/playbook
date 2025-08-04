import React, {useState} from "react"
import { render, screen, waitFor } from "../utilities/test-utils"

import { AdvancedTable, Pill, colors } from "playbook-ui"

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

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

const MOCK_DATA_WITH_ID = [
  {
    id: "1",
    year: "2021",
    quarter: null,
    month: null,
    day: null,
    newEnrollments: "20",
    scheduledMeetings: "10",
  },
  {
    id: "2", 
    year: "2022",
    quarter: null,
    month: null,
    day: null,
    newEnrollments: "25",
    scheduledMeetings: "15",
  },
  {
    id: "3",
    year: "2023", 
    quarter: null,
    month: null,
    day: null,
    newEnrollments: "30",
    scheduledMeetings: "20",
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

const columnDefinitionsSort = [
  {
    accessor: "year",
    label: "Year",
    cellAccessors: ["quarter", "month", "day"],
  },
  {
    accessor: "newEnrollments",
    label: "New Enrollments",
    enableSort: true,
  },
  {
    accessor: "scheduledMeetings",
    label: "Scheduled Meetings",
  },
];

const columnDefinitionsCustomRenderer = [
  {
    accessor: "year",
    label: "Year",
    cellAccessors: ["quarter", "month", "day"],
  },
  {
    accessor: "newEnrollments",
    label: "New Enrollments",
    customRenderer: (row, value) => (
      <Pill text={value} 
          variant="success"    
      />
    ),
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


test("loading state + initialLoadingRowsCount prop", () => {
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
  const toggleIcon = tableHead.querySelector(".pb_custom_icon")
  expect(toggleIcon).toBeInTheDocument()
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
  const icon = sortIcon.querySelector(".pb_custom_icon")
  expect(icon).toBeInTheDocument()
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
  const inlineLoading = kit.querySelector(".pb_custom_icon")
  expect(inlineLoading).toBeInTheDocument()
})

test("responsive prop functions as expected", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        responsive="scroll"
        tableData={MOCK_DATA}
        tableProps={tableProps}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass("pb_advanced_table advanced-table-responsive-scroll")
})

test("responsive none prop functions as expected", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        responsive="none"
        tableData={MOCK_DATA}
        tableProps={tableProps}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass("pb_advanced_table advanced-table-responsive-none")
})

test("customRenderer prop functions as expected", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitionsCustomRenderer}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
    />
  )

  const kit = screen.getByTestId(testId)
  const pill = kit.querySelector(".pb_pill_kit_success_lowercase")
  expect(pill).toBeInTheDocument()
})

test("allowFullScreen prop adds fullscreen class", () => {
  render(
    <AdvancedTable
        allowFullScreen
        columnDefinitions={columnDefinitions}
        tableData={MOCK_DATA}
    />
  )

  const tableContainer = screen.getByRole("table").closest("div")
  expect(tableContainer).toHaveClass("advanced-table-allow-fullscreen")
})

test("pinnedRows prop renders pinned rows at top", () => {
  const pinnedRowsControl = {
    value: { top: ["1", "3"] },
    onChange: jest.fn()
  }

  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        pinnedRows={pinnedRowsControl}
        tableData={MOCK_DATA_WITH_ID}
    />
  )

  const kit = screen.getByTestId(testId)
  const pinnedRows = kit.querySelectorAll(".pinned-row")
  
  expect(pinnedRows).toHaveLength(2)
  
  const firstPinnedRow = pinnedRows[0]
  expect(firstPinnedRow).toHaveStyle("position: sticky")
  expect(firstPinnedRow).toHaveStyle("background-color: white")
})

test("columnStyling.headerAlignment aligns header as expected", () => {
  const styledColumnDefs = [
    {
      accessor: "year",
      label: "Year",
      cellAccessors: ["quarter", "month", "day"],
    },
    {
      accessor: "newEnrollments",
      label: "New Enrollments",
      columnStyling: { headerAlignment: "left" },
    },
    {
      accessor: "scheduledMeetings",
      label: "Scheduled Meetings",
    },
  ];

  render(
    <AdvancedTable
        columnDefinitions={styledColumnDefs}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
    />
  );

  const headerCell = screen.getByText("New Enrollments").closest("th");
  expect(headerCell).toHaveAttribute("align", "left");
});

test("columnStyling.cellAlignment sets each <td> align attribute as expected", () => {
  const styledColumnDefs = [
    {
      accessor: "year",
      label: "Year",
      cellAccessors: ["quarter", "month", "day"],
    },
    {
      accessor: "newEnrollments",
      label: "New Enrollments",
      columnStyling: { cellAlignment: "left" },
    },
    {
      accessor: "scheduledMeetings",
      label: "Scheduled Meetings",
    },
  ];

  render(
    <AdvancedTable
        columnDefinitions={styledColumnDefs}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
    />
  );

  const firstEnrollmentCell = screen.getAllByText("20")[0].closest("td");
  expect(firstEnrollmentCell).toHaveAttribute("align", "left");
});

test("columnStyling.cellPadding sets cell padding", () => {
  const styledColumnDefs = [
    {
      accessor: "year",
      label: "Year",
      cellAccessors: ["quarter", "month", "day"],
    },
    {
      accessor: "newEnrollments",
      label: "New Enrollments",
      columnStyling: { cellPadding: "none" },
    },
    {
      accessor: "scheduledMeetings",
      label: "Scheduled Meetings",
    },
  ];

  render(
    <AdvancedTable
        columnDefinitions={styledColumnDefs}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
    />
  );

  const firstEnrollmentCell = screen.getAllByText("20")[0].closest("td");
  expect(firstEnrollmentCell).toHaveClass('p_none')
});

test("renders virtualized table rows and header", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        tableData={MOCK_DATA_WITH_ID}
        virtualizedRows
    />
  )

  const kit = screen.getByTestId(testId)

  const virtualizedHeader = kit.querySelector('.virtualized-header-row-header')
  expect(virtualizedHeader).toBeInTheDocument()

  const virtualizedRows = kit.querySelectorAll('.virtualized-table-row')
  expect(virtualizedRows.length).toBeLessThan(MOCK_DATA_WITH_ID.length)
})

test("rowStyling prop works as expected", () => {
  const rowStyling = [
  {
    rowId: "1",
    backgroundColor: colors.white,
    fontColor: colors.black
  },
];

  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        rowStyling={rowStyling}
        tableData={MOCK_DATA_WITH_ID}
    />
  )

  const kit = screen.getByTestId(testId)
  const tableBody = kit.querySelector('tbody')
  const row1 = tableBody.querySelector('tr:nth-child(1)') 
  expect(row1).toHaveStyle({backgroundColor: colors.white, color: colors.black})
})

test("rowStyling prop to allow padding control", () => {
  const rowStyling = [
  {
    rowId: "1",
    cellPadding: "lg"
  },
];

  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        rowStyling={rowStyling}
        tableData={MOCK_DATA_WITH_ID}
    />
  )

  const kit = screen.getByTestId(testId)
  const tableBody = kit.querySelector('tbody')
  const row1 = tableBody.querySelector('tr:nth-child(1)') 
   const cells = row1.querySelectorAll("td");
  cells.forEach((cell) => {
    expect(cell.classList.contains("p_lg")).toBe(true);
  });
})

test("Sort icon renders with enableSort on individual columns", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitionsSort}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
    />
  );

  const kit = screen.getByTestId(testId);
  const sortIcon = kit.querySelector(".sort-button-icon");
  expect(sortIcon).toBeInTheDocument();
  const sortButton = kit.querySelector(".header-sort-secondary-columns");
  expect(sortButton).toBeInTheDocument();
});

