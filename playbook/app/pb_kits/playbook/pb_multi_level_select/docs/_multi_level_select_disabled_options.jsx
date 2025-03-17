import React from "react";
import MultiLevelSelect from "../_multi_level_select";

const treeData = [
  {
    label: "Power Home Remodeling",
    value: "Power Home Remodeling",
    id: "powerhome1",
    expanded: true,
    children: [
      {
        label: "People",
        value: "People",
        id: "people1",
        expanded: true,
        children: [
          {
            label: "Talent Acquisition",
            value: "Talent Acquisition",
            id: "talent1",
            disabled: true,
          },
          {
            label: "Business Affairs",
            value: "Business Affairs",
            id: "business1",
            children: [
              {
                label: "Initiatives",
                value: "Initiatives",
                id: "initiative1",
                disabled: true,
              },
              {
                label: "Learning & Development",
                value: "Learning & Development",
                id: "development1",
              },
            ],
          },
          {
            label: "People Experience",
            value: "People Experience",
            id: "experience1",
          },
        ],
      },
      {
        label: "Contact Center",
        value: "Contact Center",
        id: "contact1",
        children: [
          {
            label: "Appointment Management",
            value: "Appointment Management",
            id: "appointment1",
          },
          {
            label: "Customer Service",
            value: "Customer Service",
            id: "customer1",
            disabled: true,
          },
          {
            label: "Energy",
            value: "Energy",
            id: "energy1",
          },
        ],
      },
    ],
  },
];

const MultiLevelSelectDefault = (props) => {
  return (
    <div>
      <MultiLevelSelect
          id='multiselect-disabled-options'
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

export default MultiLevelSelectDefault;