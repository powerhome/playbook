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
        year: "2011",
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

test("generated scaffold test", () => {
  render(
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        data={{ testid: testId }}
        tableData={MOCK_DATA}
    />
  );

  const kit = screen.getByTestId(testId);
  expect(kit).toBeInTheDocument();
});
