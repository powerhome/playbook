import React, { useState } from "react";
import MultiLevelSelect from "../_multi_level_select";
import { Button } from "playbook-ui";

const treeData = [
  {
    label: "Power Home Remodeling",
    value: "powerHomeRemodeling",
    id: "100",
    expanded: true,
    children: [
      {
        label: "People",
        value: "people",
        id: "101",
        expanded: true,
        children: [
          {
            label: "Talent Acquisition",
            value: "talentAcquisition",
            id: "102",
          },
          {
            label: "Business Affairs",
            value: "businessAffairs",
            id: "103",
            children: [
              {
                label: "Initiatives",
                value: "initiatives",
                id: "104",
              },
              {
                label: "Learning & Development",
                value: "learningAndDevelopment",
                id: "105",
              },
            ],
          },
          {
            label: "People Experience",
            value: "peopleExperience",
            id: "106",
          },
        ],
      },
      {
        label: "Contact Center",
        value: "contactCenter",
        id: "107",
        children: [
          {
            label: "Appointment Management",
            value: "appointmentManagement",
            id: "108",
          },
          {
            label: "Customer Service",
            value: "customerService",
            id: "109",
          },
          {
            label: "Energy",
            value: "energy",
            id: "110",
          },
        ],
      },
    ],
  },
];

const MultiLevelSelectReactResetKey = (props) => {
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey((k) => k + 1);
  };

  return (
    <>
      <MultiLevelSelect
          {...props}
          id="multi-level-select-reset-example"
          key={`multi-level-select-reset-${resetKey}`}
          name="my_array"
          returnAllSelected
          treeData={treeData}
      />
      <Button
          id="multilevelselect-reset-button"
          marginTop="lg"
          onClick={handleReset}
          text="Reset"
      />
    </>
  );
};

export default MultiLevelSelectReactResetKey;
