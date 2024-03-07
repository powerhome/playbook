import React from "react";
import MultiLevelSelect from "../_multi_level_select";

const treeData = [
  {
    label: "HQ",
    value: "HQ",
    id: "hq",
  },
  {
    label: "Philadelphia",
    value: "Philadelphia",
    id: "phl",
    children: [
      {
        label: "Marketing & Sales PHL",
        value: "Marketing & Sales PHL",
        id: "marketingPHL",
      },
      {
        label: "Installation Office PHL",
        value: "Installation Office PHL",
        id: "installationPHL",
      },
      {
        label: "Warehouse PHL",
        value: "Warehouse PHL",
        id: "warehousePHL",
      },
    ]
  },
  {
    label: "New Jersey",
    value: "New Jersey",
    id: "nj",
    children: [
      {
        label: "New Jersey",
        value: "New Jersey",
        id: "nj1",
        children: [
          {
            label: "Marketing & Sales NJ",
            value: "Marketing & Sales NJ",
            id: "marketingNJ",
          },
          {
            label: "Installation Office NJ",
            value: "Installation Office NJ",
            id: "installationNJ",
          },
          {
            label: "Warehouse NJ",
            value: "Warehouse NJ",
            id: "warehouseNJ",
          },
        ],
      },
      {
        label: "Princeton",
        value: "Princeton",
        id: "princeton",
        children: [
          {
            label: "Marketing & Sales Princeton",
            value: "Marketing & Sales Princeton",
            id: "marketingPR",
          },
          {
            label: "Installation Office Princeton",
            value: "Installation Office Princeton",
            id: "installationPR",
          },
          {
            label: "Warehouse Princeton",
            value: "Warehouse Princeton",
            id: "warehousePR",
          },
        ]
      },
    ]
  },
  {
    label: "Maryland",
    value: "Maryland",
    id: "MD",
    children: [
      {
        label: "Marketing & Sales MD",
        value: "Marketing & Sales MD",
        id: "marketingMD",
      },
      {
        label: "Installation Office MD",
        value: "Installation Office MD",
        id: "installationMD",
      },
      {
        label: "Warehouse MD",
        value: "Warehouse MD",
        id: "warehouseMD",
      },
    ]
  },
  {
    label: "Connecticut",
    value: "Connecticut",
    id: "CT",
    children: [
      {
        label: "Marketing & Sales CT",
        value: "Marketing & Sales CT",
        id: "marketingCT",
      },
      {
        label: "Installation Office CT",
        value: "Installation Office CT",
        id: "installationCT",
      },
      {
        label: "Warehouse CT",
        value: "Warehouse CT",
        id: "warehouseCT",
      },
    ]
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
          variant="single"
          {...props}
      />
    </div>
  )
};

export default MultiLevelSelectSingle;
