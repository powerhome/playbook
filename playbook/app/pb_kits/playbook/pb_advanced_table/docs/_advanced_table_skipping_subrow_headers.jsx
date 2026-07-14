import React from 'react';
import AdvancedTable from '../pb_advanced_table.jsx';
import MOCK_DATA from './_advanced_table_mock_data.js';


 const AdvancedTableSkippingSubrowHeaders = (props) => {
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
  ]

    const subRowHeaders = ["Quarter", "", "Day"]


  return (
    <div>
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          tableData={MOCK_DATA}
          {...props}
      >
        <AdvancedTable.Header />
        <AdvancedTable.Body subRowHeaders={subRowHeaders}/>
      </AdvancedTable>
    </div>
  );
};
export default AdvancedTableSkippingSubrowHeaders;