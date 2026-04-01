import React from "react";

import MultiLevelSelect from "../_multi_level_select";

const treeTemplate = [
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

function prefixTreeIds(nodes, prefix) {
  return nodes.map((node) => ({
    ...node,
    id: `${prefix}${node.id}`,
    children:
      node.children && node.children.length > 0
        ? prefixTreeIds(node.children, prefix)
        : node.children,
  }));
}

const treeDataMulti = prefixTreeIds(treeTemplate, "phm_");
const treeDataReturnAll = prefixTreeIds(treeTemplate, "phr_");
const treeDataSingle = prefixTreeIds(treeTemplate, "phs_");

const MultiLevelSelectPlaceholder = () => (
  <>
    <MultiLevelSelect
        id="multi-level-select-placeholder-multi"
        label="Multi (default)"
        marginBottom="sm"
        name="placeholder_multi"
        onSelect={(selectedNodes) =>
          console.log("Multi — default", selectedNodes)
        }
        placeholder="Search or choose options…"
        treeData={treeDataMulti}
    />
    <MultiLevelSelect
        id="multi-level-select-placeholder-return-all"
        label="Multi (return all selected)"
        marginBottom="sm"
        name="placeholder_return_all"
        onSelect={(selectedNodes) =>
          console.log("Multi — return all selected", selectedNodes)
        }
        placeholder="Departments..."
        returnAllSelected
        treeData={treeDataReturnAll}
    />
    <MultiLevelSelect
        id="multi-level-select-placeholder-single"
        label="Single"
        name="placeholder_single"
        onSelect={(selectedNodes) =>
          console.log("Single", selectedNodes)
        }
        placeholder="Select one option…"
        treeData={treeDataSingle}
        variant="single"
    />
  </>
);

export default MultiLevelSelectPlaceholder;
