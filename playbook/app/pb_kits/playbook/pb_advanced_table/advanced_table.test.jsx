import React from "react";
import { render, screen } from "../utilities/test-utils";

import { AdvancedTable } from "../";

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
];

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
];

const testId = "advanced_table";

test("Generates default kit and classname", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
    />
  );

  const kit = screen.getByTestId(testId);
  expect(kit).toBeInTheDocument();
  expect(kit).toHaveClass('pb_advanced_table')
});

test("Generates aria label", () => {
  render(
    <AdvancedTable
        aria={{label:testId}}
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
    />
  );

  const kit = screen.getByTestId(testId);
  expect(kit).toHaveAttribute('aria-label', testId)
});

test("Row toggle button exists and toggles subrows open and closed", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
    />
  );

  const kit = screen.getByTestId(testId);
  const rowButton = kit.querySelector(".gray-icon.expand-toggle-icon")
  expect(rowButton).toBeInTheDocument()
  const subRow1 = kit.querySelector(".bg-white.depth-sub-row-1")
  expect(subRow1).not.toBeInTheDocument()
  rowButton.click()
  const subRow = kit.querySelector(".bg-white.depth-sub-row-1")
  expect(subRow).toBeInTheDocument()
});

test("toggleExpansionAll button exists and toggles subrows open and closed", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
    />
  );

  const kit = screen.getByTestId(testId);
  const toggleButton = kit.querySelector(".gray-icon.toggle-all-icon")
  expect(toggleButton).toBeInTheDocument()
  const subRow1 = kit.querySelector(".bg-white.depth-sub-row-1")
  expect(subRow1).not.toBeInTheDocument()
  toggleButton.click()
  const subRow = kit.querySelector(".bg-white.depth-sub-row-1")
  expect(subRow).toBeInTheDocument()
});

test("loading state", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        loading
        tableData={MOCK_DATA}
    />
  );

  const kit = screen.getByTestId(testId);
  const table = kit.querySelector('table')
  expect(table).toHaveClass('pb_table table-sm table-responsive-none table-card data_table ns_tabular content-loading')

});