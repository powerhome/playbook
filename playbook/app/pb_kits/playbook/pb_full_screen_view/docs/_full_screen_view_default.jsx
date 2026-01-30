import React from "react";
import FullScreenView from "../../pb_full_screen_view/_full_screen_view";
import AdvancedTable from "../../pb_advanced_table/_advanced_table";
import Button from "../../pb_button/_button";
import MOCK_DATA from "../../pb_advanced_table/docs/advanced_table_mock_data.json";

const FullScreenViewDefault = (props) => {

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

  return (
    <FullScreenView
        title="Fullscreen Table"
        trigger={({ onClick, isOpen }) => (
          <Button
              marginBottom="md"
              onClick={onClick}
              text={isOpen ? "Exit Fullscreen" : "Enter Fullscreen"}
              {...props}
          />
        )}
        {...props}
    >
          <AdvancedTable
              columnDefinitions={columnDefinitions}
              tableData={MOCK_DATA}
              {...props}
          />
    </FullScreenView>
  );
};

export default FullScreenViewDefault;
