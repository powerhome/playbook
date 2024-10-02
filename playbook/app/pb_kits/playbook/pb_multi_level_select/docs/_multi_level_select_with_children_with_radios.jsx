import React from "react";
import MultiLevelSelect from "../_multi_level_select";
import Badge from "../../pb_badge/_badge";

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
        status: "active",
        children: [
          {
            label: "Talent Acquisition",
            value: "Talent Acquisition",
            id: "talent1",
          },
          {
            label: "Business Affairs",
            value: "Business Affairs",
            id: "business1",
            status: "active",
            variant: "primary",

            children: [
              {
                label: "Initiatives",
                value: "Initiatives",
                id: "initiative1",
              },
              {
                label: "Learning & Development",
                value: "Learning & Development",
                id: "development1",
                status: "Inactive",
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
        status: "Inactive",
        variant: "error",
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

const MultiLevelSelectWithChildrenWithRadios = (props) => {
  return (
    <div>
      <MultiLevelSelect
          id="multiselect-with-children"
          onSelect={(selectedNodes) =>
            console.log("Selected Items", selectedNodes)
          }
          treeData={treeData}
          variant="single"
          {...props}
      >
        <MultiLevelSelect.Options>
          {(item) => (
            <div>
              <Badge 
                  marginLeft="sm"
                  text={item.status} 
                  variant={item.status === "active" ? "success" : "warning"} 
              />
            </div>
          )}
        </MultiLevelSelect.Options>
      </MultiLevelSelect>
    </div>
  );
};

export default MultiLevelSelectWithChildrenWithRadios;
