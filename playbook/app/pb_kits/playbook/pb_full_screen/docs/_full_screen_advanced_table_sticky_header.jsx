import React from "react";
import FullScreen from "../../pb_full_screen/_full_screen";
import AdvancedTable from "../../pb_advanced_table/_advanced_table";
import Button from "../../pb_button/_button";

const columnDefinitions = [
  {
    accessor: "year",
    label: "Year",
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

const tableData = Array.from({ length: 40 }, (_, index) => ({
  year: String(2000 + index),
  newEnrollments: String(20 + index),
  scheduledMeetings: String(10 + index),
  attendanceRate: `${50 + (index % 50)}%`,
  completedClasses: String(3 + index),
  classCompletionRate: `${30 + (index % 70)}%`,
  graduatedStudents: String(19 + index),
}));

const FullScreenAdvancedTableStickyHeader = (props) => {
  return (
    <FullScreen
        headerText="Fullscreen Table"
        stickyHeader
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
          responsive="none"
          tableData={tableData}
          tableProps={{ sticky: true }}
          {...props}
      />
    </FullScreen>
  );
};

export default FullScreenAdvancedTableStickyHeader;
