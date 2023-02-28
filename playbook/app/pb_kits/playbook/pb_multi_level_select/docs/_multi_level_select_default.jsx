import React from 'react'
import {MultiLevelSelect} from '../../'

const MultiLevelSelectDefault = (props) => {

  const treeData = {
    label: "Power Home Remodeling",
    value: "Power Home Remodeling",
    children: [
      {
        label: "People",
        value: "People",
        children: [
          {
            label: 'Talent Acquisition',
            value: 'Talent Acquisition',
          },
          {
            label: 'Business Affairs',
            value: 'Business Affairs',
            children: [
              {
                label: 'Initiatives',
                value: 'Initiatives',
              },
              {
                label: 'Learning & Developemnt',
                value: 'Learning & Developemnt',
              },
            ]
          },
          {
            label: 'People Experience',
            value: 'People Experience',
          },
        ],
      },
      {
        label: "Contact Center",
        value: "Contact Center",
        children: [
          {
            label: 'Appointment Management',
            value: 'Appointment Management',
          },
          {
            label: 'Customer Service',
            value: 'Customer Service',
          },
          {
            label: 'Energy',
            value: 'Energy',
          }
        ]
      },
      {
        label: "Revenue",
        value: "Revenue",
        children: [
          {
            label: 'Customer Development',
            value: 'Customer Development',
          },
          {
            label: 'Sales',
            value: 'Sales',
          }
        ]
      },
      {
        label: "Project Services",
        value: "Project Services",
        children: [
          {
            label: 'Customer Support',
            value: 'Customer Support',
          },
          {
            label:'Production Management',
            value: 'Production Management',
          }
        ]
      },
      {
        label: "Supply Chain",
        value: "Supply Chain",
        children: [
          {
            label: 'Inventory Management',
            value: 'Inventory Management',
          },
        ]
      }
    ],
  }

  return (
    <div>
    <MultiLevelSelect
        treeData={treeData}
        {...props}
    />
  </div>
  )
  
  }

export default MultiLevelSelectDefault
