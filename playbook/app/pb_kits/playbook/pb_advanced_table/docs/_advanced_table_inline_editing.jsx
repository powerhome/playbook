import React, { useState } from "react";
import { AdvancedTable, TextInput, Body } from "playbook-ui";
import MOCK_DATA from "./advanced_table_mock_data.json";

const AdvancedTableInlineEditing = (props) => {
  const [editedValues, setEditedValues] = useState({});

  const EditableCell = ({ rowId, originalValue, onSave }) => {
    const [localValue, setLocalValue] = useState(originalValue);

    const handleChange = (e) => setLocalValue(e.target.value);

    const handleBlur = () => {
      originalValue !== localValue && onSave(rowId, localValue);
    };

    return (
      <TextInput inline
          marginBottom="none"
      >
        <input 
            onBlur={handleBlur} 
            onChange={handleChange} 
            value={localValue} 
        />
      </TextInput>
    );
  };

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
      editable: true,
      customRenderer: (row) => {
        return (
          <EditableCell
              onSave={(id, val) => {
                setEditedValues((prev) => ({ ...prev, [id]: val }));
              }}
              originalValue={
                editedValues[row.id] ?? row.original.scheduledMeetings
              }
              rowId={row.id}
          />
        );
      },
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
    <div className="App">
      <AdvancedTable
          columnDefinitions={columnDefinitions}
          tableData={MOCK_DATA}
          {...props}
      />
      {
        editedValues && Object.keys(editedValues).length > 0 && (
          <>
            <Body marginTop="md">Edited Values by Row Id:</Body>
            <pre style={{color: 'white'}}>{JSON.stringify(editedValues, null, 2)}</pre>
          </>
        )
      }
    </div>
  );
};

export default AdvancedTableInlineEditing;
