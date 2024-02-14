import React from "react";
import { AdvancedTable } from "../..";
import { MOCK_DATA } from "./_mock_data";

const AdvancedTableSubrowHeaders = (props) => {
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
    {
      accessor: "attendanceRate",
      label: "Attendance Rate",
    },
    {
      accessor: "completedClasses",
      label: "Completed Classes",
    },
    {
      accessor: "classCompletionRate",
      label: "Class Completion Rate",
    },
    {
      accessor: "graduatedStudents",
      label: "Graduated Students",
    },
  ];

  //Render the subRow header rows
  const subRowHeaders = ["Quarter", "Month", "Day"]


  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          enableToggleExpansion="all"
          tableData={MOCK_DATA}
          {...props}
      >
        <AdvancedTable.Header />
        <AdvancedTable.Body subRowHeaders={subRowHeaders}/>
      </AdvancedTable>
    </div>
  );
};

export default AdvancedTableSubrowHeaders;