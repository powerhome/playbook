import React from "react";
import { AdvancedTable, Background,colors } from "playbook-ui";
import MOCK_DATA from "./advanced_table_mock_data.json";

const AdvancedTableColumnStylingColumnHeaders = (props) => {
  const columnDefinitions = [
    {
      accessor: "year",
      label: "Year",
      cellAccessors: ["quarter", "month", "day"],
    },
    {
      label: "Enrollment Data",
      columns: [
        {
          label: "Enrollment Stats",
          columns: [
            {
              accessor: "newEnrollments",
              label: "New Enrollments",
              columnStyling:{headerAlignment: "left", cellAlignment: "left"},

            },
            {
              accessor: "scheduledMeetings",
              label: "Scheduled Meetings",
            },
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
            {
              accessor: "completedClasses",
              label: "Completed Classes",
              columnStyling:{
                headerAlignment: "center", 
                cellAlignment: "center",
                fontColor: colors.success,
              },
            },
            {
              accessor: "classCompletionRate",
              label: "Class Completion Rate",
              columnStyling: { cellPadding: "none", fontColor: colors.error },
              customRenderer: (row, value) => (
                <Background 
                    backgroundColor={"warning_secondary"}
                    padding="xs" 
                >
                {value}
                </Background>
              ), 
            },
          ],
        },
        {
          label: "Attendance",
          columns: [
            {
              accessor: "attendanceRate",
              label: "Attendance Rate",
              columnStyling: { fontColor: colors.category_1 },
            },
            {
              accessor: "scheduledMeetings",
              label: "Scheduled Meetings",
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          tableData={MOCK_DATA}
          {...props}
      />
    </>
  );
};

export default AdvancedTableColumnStylingColumnHeaders
