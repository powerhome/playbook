import React, { useState } from "react";
import FullScreenView from "../../pb_full_screen_view/_full_screen_view";
import AdvancedTable from "../../pb_advanced_table/_advanced_table";
import Button from "../../pb_button/_button";
import Filter from "../../pb_filter/_filter";
import TextInput from "../../pb_text_input/_text_input";
import Flex from "../../pb_flex/_flex";
import SectionSeparator from "../../pb_section_separator/_section_separator";
import Card from "../../pb_card/_card";
import MOCK_DATA from "../../pb_advanced_table/docs/advanced_table_mock_data.json";

const FullScreenViewDefault = (props) => {
  const [territory, setTerritory] = useState("");

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
      <Card padding="none">
        <Flex
            align="stretch"
            flexDirection="column"
            gap="none"
        >
          <Filter
              background={false}
              double
              maxHeight="50vh"
              minWidth="xs"
              popoverProps={{ width: "350px", appendTo: ".fullscreen-overlay" }}
              results={50}
              sortOptions={{
                territory_id: "Territory ID",
                first_name: "Name",
                started_on: "Start Date",
                department_name: "Department",
                title_name: "Title",
                branch_branch_name: "Branch",
              }}
              sortValue={[{ name: "started_on", dir: "asc" }]}
          >
            {({ closePopover }) => (
              <>
                <TextInput
                    label="Territory ID"
                    onChange={(event) => setTerritory(event.target.value)}
                    value={territory}
                />
                <Flex spacing="between">
                  <Button
                      onClick={() => {
                        alert(
                          "No filtering functionality - just a pattern demo!",
                        );
                        closePopover();
                      }}
                      text="Filter"
                  />
                  <Button
                      text="Defaults"
                      variant="secondary"
                  />
                </Flex>
              </>
            )}
          </Filter>
          <SectionSeparator />
          <AdvancedTable
              columnDefinitions={columnDefinitions}
              tableData={MOCK_DATA}
              tableProps={{ container: false }}
              {...props}
          />
        </Flex>
      </Card>
    </FullScreenView>
  );
};

export default FullScreenViewDefault;
