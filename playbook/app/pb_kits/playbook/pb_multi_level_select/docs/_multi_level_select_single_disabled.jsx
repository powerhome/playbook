import React from "react";
import MultiLevelSelect from "../_multi_level_select";

const treeData = [
  {
    label: "HQ",
    value: "hQ",
    id: "hq2",
  },
  {
    label: "Philadelphia",
    value: "philadelphia",
    id: "phl2",
    disabled: true,
    children: [
      {
        label: "Marketing & Sales PHL",
        value: "marketingAndSalesPhl",
        id: "marketingPHL2",
      },
      {
        label: "Installation Office PHL",
        value: "installationOfficePhl",
        id: "installationPHL2",
      },
      {
        label: "Warehouse PHL",
        value: "warehousePhl",
        id: "warehousePHL2",
      },
    ]
  },
  {
    label: "New Jersey",
    value: "newJersey",
    id: "nj2",
    children: [
      {
        label: "New Jersey",
        value: "newJersey",
        id: "nj12",
        children: [
          {
            label: "Marketing & Sales NJ",
            value: "marketingAndSalesNj",
            id: "marketingNJ2",
            disabled: true,
          },
          {
            label: "Installation Office NJ",
            value: "installationOfficeNj",
            id: "installationNJ2",
          },
          {
            label: "Warehouse NJ",
            value: "warehouseNj",
            id: "warehouseNJ2",
          },
        ],
      },
      {
        label: "Princeton",
        value: "princeton",
        id: "princeton2",
        children: [
          {
            label: "Marketing & Sales Princeton",
            value: "marketingAndSalesPrinceton",
            id: "marketingPR2",
          },
          {
            label: "Installation Office Princeton",
            value: "installationOfficePrinceton",
            id: "installationPR2",
            disabled: true,
          },
          {
            label: "Warehouse Princeton",
            value: "warehousePrinceton",
            id: "warehousePR2",
          },
        ]
      },
    ]
  },
  {
    label: "Maryland",
    value: "maryland",
    id: "MD2",
    children: [
      {
        label: "Marketing & Sales MD",
        value: "marketingAndSalesMd",
        id: "marketingMD2",
      },
      {
        label: "Installation Office MD",
        value: "installationOfficeMd",
        id: "installationMD2",
      },
      {
        label: "Warehouse MD",
        value: "warehouseMd",
        id: "warehouseMD2",
      },
    ]
  },
  {
    label: "Connecticut",
    value: "connecticut",
    id: "CT2",
    children: [
      {
        label: "Marketing & Sales CT",
        value: "marketingAndSalesCt",
        id: "marketingCT2",
      },
      {
        label: "Installation Office CT",
        value: "installationOfficeCt",
        id: "installationCT2",
      },
      {
        label: "Warehouse CT",
        value: "warehouseCt",
        id: "warehouseCT2",
      },
    ]
  },
];

const MultiLevelSelectSingleDisabled = (props) => {
  return (
    <div>
      <MultiLevelSelect
          id="multiselect-single-disabled"
          inputName="Power"
          onSelect={(selectedNode) => console.log("Selected Node", selectedNode)}
          treeData={treeData}
          variant="single"
          {...props}
      />
    </div>
  )
};

export default MultiLevelSelectSingleDisabled;
