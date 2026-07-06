import React from "react";
import FullScreen from "../../pb_full_screen/_full_screen";
import useFullScreen from "../../pb_full_screen/useFullScreen";
import AdvancedTable from "../../pb_advanced_table/_advanced_table";
import Flex from "../../pb_flex/_flex";
import MOCK_DATA from "../../pb_advanced_table/docs/advanced_table_mock_data.json";
import CircleIconButton from "../../pb_circle_icon_button/_circle_icon_button";

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

const FullScreenCustomTrigger = (props) => {
  const [isFullscreen, setIsFullscreen] = useFullScreen(false);

  return (
    <>
      <Flex justify="end">
        <CircleIconButton
            icon="expand"
            marginBottom="md"
            onClick={() => setIsFullscreen(true)}
            {...props}
        />
      </Flex>

      <FullScreen
          headerText="Fullscreen Table"
          isFullscreen={isFullscreen}
          onClose={() => setIsFullscreen(false)}
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

export default FullScreenCustomTrigger;
