import React from "react";
import FullScreen from "../../pb_full_screen/_full_screen";
import useFullScreen from "../../pb_full_screen/useFullScreen";
import AdvancedTable from "../../pb_advanced_table/_advanced_table";
import Button from "../../pb_button/_button";
import MOCK_DATA from "../../pb_advanced_table/docs/advanced_table_mock_data.json";

const FullScreenStickyHeader = (props) => {
  const { isFullscreen, enter, exit } = useFullScreen();

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
    <>
      <Button
          marginBottom="md"
          onClick={enter}
          text="Enter Fullscreen"
          {...props}
      />
      <FullScreen
          headerText="Fullscreen Table"
          isFullscreen={isFullscreen}
          onClose={exit}
          stickyHeader={false}
          {...props}
      >
        <AdvancedTable
            columnDefinitions={columnDefinitions}
            tableData={MOCK_DATA}
            {...props}
        />
      </FullScreen>
    </>
  );
};

export default FullScreenStickyHeader;
