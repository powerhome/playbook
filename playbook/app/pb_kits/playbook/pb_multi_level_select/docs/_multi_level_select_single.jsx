import React from "react";
import MultiLevelSelect from "../_multi_level_select";

const treeData = [
  {
    label: "HQ",
    value: "hQ",
    id: "hq",
  },
  {
    label: "Philadelphia",
    value: "philadelphia",
    id: "phl",
    children: [
      {
        label: "Marketing & Sales PHL",
        value: "marketingAndSalesPhl",
        id: "marketingPHL",
      },
      {
        label: "Installation Office PHL",
        value: "installationOfficePhl",
        id: "installationPHL",
      },
      {
        label: "Warehouse PHL",
        value: "warehousePhl",
        id: "warehousePHL",
      },
    ]
  },
  {
    label: "New Jersey",
    value: "newJersey",
    id: "nj",
    children: [
      {
        label: "New Jersey",
        value: "newJersey",
        id: "nj1",
        children: [
          {
            label: "Marketing & Sales NJ",
            value: "marketingAndSalesNj",
            id: "marketingNJ",
          },
          {
            label: "Installation Office NJ",
            value: "installationOfficeNj",
            id: "installationNJ",
          },
          {
            label: "Warehouse NJ",
            value: "warehouseNj",
            id: "warehouseNJ",
          },
        ],
      },
      {
        label: "Princeton",
        value: "princeton",
        id: "princeton",
        children: [
          {
            label: "Marketing & Sales Princeton",
            value: "marketingAndSalesPrinceton",
            id: "marketingPR",
          },
          {
            label: "Installation Office Princeton",
            value: "installationOfficePrinceton",
            id: "installationPR",
          },
          {
            label: "Warehouse Princeton",
            value: "warehousePrinceton",
            id: "warehousePR",
          },
        ]
      },
    ]
  },
  {
    label: "Maryland",
    value: "maryland",
    id: "MD",
    children: [
      {
        label: "Marketing & Sales MD",
        value: "marketingAndSalesMd",
        id: "marketingMD",
      },
      {
        label: "Installation Office MD",
        value: "installationOfficeMd",
        id: "installationMD",
      },
      {
        label: "Warehouse MD",
        value: "warehouseMd",
        id: "warehouseMD",
      },
    ]
  },
  {
    label: "Connecticut",
    value: "connecticut",
    id: "CT",
    children: [
      {
        label: "Marketing & Sales CT",
        value: "marketingAndSalesCt",
        id: "marketingCT",
      },
      {
        label: "Installation Office CT",
        value: "installationOfficeCt",
        id: "installationCT",
      },
      {
        label: "Warehouse CT",
        value: "warehouseCt",
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
