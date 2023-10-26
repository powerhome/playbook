import React from "react";
import MultiLevelSelect from "../_multi_level_select";

const treeData = [
  {
    label: "Power Home Remodeling",
    value: "Power Home Remodeling",
    id: "powerhome3",
    children: [
      {
        label: "People",
        value: "People",
        id: "people3",
        children: [
          {
            label: "Talent Acquisition",
            value: "Talent Acquisition",
            id: "talent3",
          },
          {
            label: "Business Affairs",
            value: "Business Affairs",
            id: "business3",
            children: [
              {
                label: "Initiatives",
                value: "Initiatives",
                id: "initiative3",
              },
              {
                label: "Learning & Development",
                value: "Learning & Development",
                id: "development3",
              },
            ],
          },
          {
            label: "People Experience",
            value: "People Experience",
            id: "experience3",
          },
        ],
      },
      {
        label: "Contact Center",
        value: "Contact Center",
        id: "contact3",
        children: [
          {
            label: "Appointment Management",
            value: "Appointment Management",
            id: "appointment3",
          },
          {
            label: "Customer Service",
            value: "Customer Service",
            id: "customer3",
          },
          {
            label: "Energy",
            value: "Energy",
            id: "energy3",
          },
        ],
      },
    ],
  },
];

const MultiLevelSelectSingleChildrenOnly = (props) => {
  return (
    <div>
      <MultiLevelSelect
          id="multiselect-single-children-only"
          inputName="PowerChildren"
          onSelect={(selectedNode) => console.log("Selected Node", selectedNode)}
          treeData={treeData}
          ultimateChildrenOnly
          variant="single"
          {...props}
      />
    </div>
  )
};

export default MultiLevelSelectSingleChildrenOnly;
