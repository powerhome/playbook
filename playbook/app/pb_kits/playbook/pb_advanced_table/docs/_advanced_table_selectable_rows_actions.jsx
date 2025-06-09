import React, {useState} from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import CircleIconButton from "../../pb_circle_icon_button/_circle_icon_button"
import Flex from "../../pb_flex/_flex"
import MOCK_DATA from "./advanced_table_mock_data_no_subrows.json"

const AdvancedTableSelectableRowsActions = (props) => {
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

const [selectedRows, setSelectedRows] = useState()

const CustomActions = () => {
  const rowIds = selectedRows ? Object.keys(selectedRows) : [];

  return (
    <Flex>
      <CircleIconButton
          icon="file-csv"
          onClick={() =>
            alert(rowIds.length === 0 ? "No Selection Made" : 'Row ids ' + rowIds.join(", ") + 'will be exported!')
          }
          variant="link"
      />
      <CircleIconButton
          icon="trash-alt"
          onClick={() =>
            alert(rowIds.length === 0 ? "No Selection Made" : 'Row ids ' + rowIds.join(", ") + 'will be deleted!')
          }
          variant="link"
        />
    </Flex>
  );
};


  return (
    <div>
      <AdvancedTable
          actions={<CustomActions/>}
          columnDefinitions={columnDefinitions}
          onRowSelectionChange={(selected) => setSelectedRows(selected)}
          selectableRows
          tableData={MOCK_DATA}
          {...props}
      />
    </div>
  )
}

export default AdvancedTableSelectableRowsActions