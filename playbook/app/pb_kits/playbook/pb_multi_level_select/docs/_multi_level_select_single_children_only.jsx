import React from "react";
import MultiLevelSelect from "../_multi_level_select";

const treeData = [
  {
    label: "HQ",
    value: "HQ",
    id: "hq1",
  },
  {
    label: "Philadelphia",
    value: "Philadelphia",
    id: "phl1",
    hideRadio: true,
    children: [
      {
        label: "Marketing & Sales PHL",
        value: "Marketing & Sales PHL",
        id: "marketingPHL1",
      },
      {
        label: "Installation Office PHL",
        value: "Installation Office PHL",
        id: "installationPHL1",
      },
      {
        label: "Warehouse PHL",
        value: "Warehouse PHL",
        id: "warehousePHL1",
      },
    ]
  },
  {
    label: "New Jersey",
    value: "New Jersey",
    id: "nj2",
    hideRadio: true,
    children: [
      {
        label: "New Jersey",
        value: "New Jersey",
        id: "nj3",
        hideRadio: true,
        children: [
          {
            label: "Marketing & Sales NJ",
            value: "Marketing & Sales NJ",
            id: "marketingNJ1",
          },
          {
            label: "Installation Office NJ",
            value: "Installation Office NJ",
            id: "installationNJ1",
          },
          {
            label: "Warehouse NJ",
            value: "Warehouse NJ",
            id: "warehouseNJ1",
          },
        ],
      },
      {
        label: "Princeton",
        value: "Princeton",
        id: "princeton1",
        hideRadio: true,
        children: [
          {
            label: "Marketing & Sales Princeton",
            value: "Marketing & Sales Princeton",
            id: "marketingPR1",
          },
          {
            label: "Installation Office Princeton",
            value: "Installation Office Princeton",
            id: "installationPR1",
          },
          {
            label: "Warehouse Princeton",
            value: "Warehouse Princeton",
            id: "warehousePR1",
          },
        ]
      },
    ]
  },
  {
    label: "Maryland",
    value: "Maryland",
    id: "MD1",
    hideRadio: true,
    children: [
      {
        label: "Marketing & Sales MD",
        value: "Marketing & Sales MD",
        id: "marketingMD1",
      },
      {
        label: "Installation Office MD",
        value: "Installation Office MD",
        id: "installationMD1",
      },
      {
        label: "Warehouse MD",
        value: "Warehouse MD",
        id: "warehouseMD1",
      },
    ]
  },
  {
    label: "Connecticut",
    value: "Connecticut",
    id: "CT1",
    hideRadio: true,
    children: [
      {
        label: "Marketing & Sales CT",
        value: "Marketing & Sales CT",
        id: "marketingCT1",
      },
      {
        label: "Installation Office CT",
        value: "Installation Office CT",
        id: "installationCT1",
      },
      {
        label: "Warehouse CT",
        value: "Warehouse CT",
        id: "warehouseCT1",
      },
    ]
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
          variant="single"
          {...props}
      />
    </div>
  )
};

export default MultiLevelSelectSingleChildrenOnly;
