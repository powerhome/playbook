import React, { useState } from "react";
import { AdvancedTable } from "../../";
import { MOCK_DATA } from "./_mock_data";

const AdvancedTableExpandedControl = (props) => {
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

  //State for manually effecting what is expanded
  const [expanded, setExpanded] = useState({'0': true, '0.0': true, '0.0.1': true})

  //Passing expanded state to AdvancedTable as prop
  const expandedControl = {
    value: expanded,
    onChange: setExpanded,
  }

  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          expandedControl={expandedControl}
          tableData={MOCK_DATA}
          {...props}
      />
    </div>
  );
};

export default AdvancedTableExpandedControl;