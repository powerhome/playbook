import React from "react";
import MultiLevelSelect from "../_multi_level_select";
import Badge from "../../pb_badge/_badge";

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
        status: "active",
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
            status: "active",
            variant: "primary",

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
                status: "Inactive",
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
        status: "Inactive",
        variant: "error",
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

const MultiLevelSelectWithChildren = (props) => {
  return (
    <div>
      <MultiLevelSelect
          id="multiselect-with-children"
          onSelect={(selectedNodes) =>
            console.log("Selected Items", selectedNodes)
          }
          treeData={treeData}
          {...props}
      >
        <MultiLevelSelect.Options>
        {(item) => (
          <Badge 
              marginLeft="sm"
              text={item.status} 
              variant={item.status === "active" ? "success" : "warning"} 
          />
        )}
        </MultiLevelSelect.Options>
      </MultiLevelSelect>
    </div>
  );
};

export default MultiLevelSelectWithChildren;
