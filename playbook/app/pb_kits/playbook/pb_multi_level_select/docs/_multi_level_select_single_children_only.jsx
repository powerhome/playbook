import React from "react";
import MultiLevelSelect from "../_multi_level_select";

const treeData = [
  {
    label: "HQ",
    value: "hQ",
    id: "hq1",
  },
  {
    label: "Philadelphia",
    value: "philadelphia",
    id: "phl1",
    hideRadio: true,
    children: [
      {
        label: "Marketing & Sales PHL",
        value: "marketingAndSalesPhl",
        id: "marketingPHL1",
      },
      {
        label: "Installation Office PHL",
        value: "installationOfficePhl",
        id: "installationPHL1",
      },
      {
        label: "Warehouse PHL",
        value: "warehousePhl",
        id: "warehousePHL1",
      },
    ]
  },
  {
    label: "New Jersey",
    value: "newJersey",
    id: "nj2",
    hideRadio: true,
    children: [
      {
        label: "New Jersey",
        value: "newJersey",
        id: "nj3",
        hideRadio: true,
        children: [
          {
            label: "Marketing & Sales NJ",
            value: "marketingAndSalesNj",
            id: "marketingNJ1",
          },
          {
            label: "Installation Office NJ",
            value: "installationOfficeNj",
            id: "installationNJ1",
          },
          {
            label: "Warehouse NJ",
            value: "warehouseNj",
            id: "warehouseNJ1",
          },
        ],
      },
      {
        label: "Princeton",
        value: "princeton",
        id: "princeton1",
        hideRadio: true,
        children: [
          {
            label: "Marketing & Sales Princeton",
            value: "marketingAndSalesPrinceton",
            id: "marketingPR1",
          },
          {
            label: "Installation Office Princeton",
            value: "installationOfficePrinceton",
            id: "installationPR1",
          },
          {
            label: "Warehouse Princeton",
            value: "warehousePrinceton",
            id: "warehousePR1",
          },
        ]
      },
    ]
  },
  {
    label: "Maryland",
    value: "maryland",
    id: "MD1",
    hideRadio: true,
    children: [
      {
        label: "Marketing & Sales MD",
        value: "marketingAndSalesMd",
        id: "marketingMD1",
      },
      {
        label: "Installation Office MD",
        value: "installationOfficeMd",
        id: "installationMD1",
      },
      {
        label: "Warehouse MD",
        value: "warehouseMd",
        id: "warehouseMD1",
      },
    ]
  },
  {
    label: "Connecticut",
    value: "connecticut",
    id: "CT1",
    hideRadio: true,
    children: [
      {
        label: "Marketing & Sales CT",
        value: "marketingAndSalesCt",
        id: "marketingCT1",
      },
      {
        label: "Installation Office CT",
        value: "installationOfficeCt",
        id: "installationCT1",
      },
      {
        label: "Warehouse CT",
        value: "warehouseCt",
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
