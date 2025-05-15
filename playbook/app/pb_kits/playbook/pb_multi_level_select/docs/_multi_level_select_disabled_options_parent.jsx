import React from "react";
import MultiLevelSelect from "../_multi_level_select";

const treeData = [
  {
    label: "Power Home Remodeling",
    value: "powerHomeRemodeling",
    id: "powerhome1",
    expanded: true,
    children: [
      {
        label: "People",
        value: "people",
        id: "people1",
        expanded: true,
        children: [
          {
            label: "Talent Acquisition",
            value: "talentAcquisition",
            id: "talent1",
          },
          {
            label: "Business Affairs",
            value: "businessAffairs",
            id: "business1",
            expanded: true,
            disabled: true,
            children: [
              {
                label: "Initiatives",
                value: "initiatives",
                id: "initiative1",
              },
              {
                label: "Learning & Development",
                value: "learningAndDevelopment",
                id: "development1",
              },
            ],
          },
          {
            label: "People Experience",
            value: "peopleExperience",
            id: "experience1",
          },
        ],
      },
      {
        label: "Contact Center",
        value: "contactCenter",
        id: "contact1",
        children: [
          {
            label: "Appointment Management",
            value: "appointmentManagement",
            id: "appointment1",
          },
          {
            label: "Customer Service",
            value: "customerService",
            id: "customer1",
          },
          {
            label: "Energy",
            value: "energy",
            id: "energy1",
          },
        ],
      },
    ],
  },
];

const MultiLevelSelectDisabledOptionsParent = (props) => {
  return (
    <div>
      <MultiLevelSelect
          id='multiselect-disabled-options-parent'
          onSelect={(selectedNodes) =>
          console.log(
            "Selected Items",
            selectedNodes
          )
        }
          returnAllSelected
          treeData={treeData}
          {...props}
      />
    </div>
  )
};

export default MultiLevelSelectDisabledOptionsParent;