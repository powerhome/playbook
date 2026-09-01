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
    expanded: true,
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
    id: "nj1",
    children: [
      {
        label: "New Jersey",
        value: "newJersey",
        id: "nj1",
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
];

const treeData2 = [
  {
    label: "HQ",
    value: "hQ",
    id: "hq2",
  },
  {
    label: "Philadelphia",
    value: "philadelphia",
    id: "phl2",
    expanded: true,
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
        id: "nj2",
        children: [
          {
            label: "Marketing & Sales NJ",
            value: "marketingAndSalesNj",
            id: "marketingNJ2",
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
];

const MultiLevelSelectFormatSelectedDisplay = (props) => (
  <>
  <MultiLevelSelect
      formatSelectedDisplay={(_, { path }) =>
        path.map(({ label }) => label).join(" / ")
      }
      treeData={treeData}
      variant="single"
      {...props}
  />
  <br />
  <MultiLevelSelect
      formatSelectedDisplay={(item, { ancestors }) => {
      const parent = ancestors[ancestors.length - 1];
      return parent ? `${item.label} (${parent.label})` : item.label;
    }}
      treeData={treeData2}
      variant="single"
      {...props}
  />
  </>
);

export default MultiLevelSelectFormatSelectedDisplay;
