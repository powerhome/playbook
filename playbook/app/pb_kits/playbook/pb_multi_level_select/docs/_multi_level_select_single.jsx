import React from "react";
import MultiLevelSelect from "../_multi_level_select";

const treeData = [
  {
    label: "Power Home Remodeling",
    value: "Power Home Remodeling",
    id: "powerhome2",
    expanded: true,
    children: [
      {
        label: "People",
        value: "People",
        id: "people2",
        expanded: true,
        hidden: true,
        children: [
          {
            label: "Talent Acquisition",
            value: "Talent Acquisition",
            id: "talent2",
          },
          {
            label: "Business Affairs",
            value: "Business Affairs",
            id: "business2",
            hidden: true,
            children: [
              {
                label: "Initiatives",
                value: "Initiatives",
                id: "initiative2",
              },
              {
                label: "Learning & Development",
                value: "Learning & Development",
                id: "development2",
              },
            ],
          },
          {
            label: "People Experience",
            value: "People Experience",
            id: "experience2",
          },
        ],
      },
      {
        label: "Contact Center",
        value: "Contact Center",
        id: "contact2",
        hidden: true,
        children: [
          {
            label: "Appointment Management",
            value: "Appointment Management",
            id: "appointment2",
          },
          {
            label: "Customer Service",
            value: "Customer Service",
            id: "customer2",
          },
          {
            label: "Energy",
            value: "Energy",
            id: "energy2",
          },
        ],
      },
    ],
  },
];

const MultiLevelSelectSingle = (props) => {
  return (
    <div>
      <MultiLevelSelect
          id="multiselect-single"
          inputName="Power"
          onSelect={(selectedNode) => console.log("Selected Node", selectedNode)}
          treeData={treeData}
          // ultimateChildrenOnly
          variant="single"
          {...props}
      />
    </div>
  )
};

export default MultiLevelSelectSingle;
