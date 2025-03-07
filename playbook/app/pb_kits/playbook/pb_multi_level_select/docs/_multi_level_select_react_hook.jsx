import React from "react"
import MultiLevelSelect from "../_multi_level_select"
import Title from "../../pb_title/_title"
import { useForm } from "react-hook-form"

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
]

const MultiLevelSelectReactHook = (props) => {
  const { register, watch } = useForm()
  const selectedDepartments = watch("departments")
  console.log("Selected Departments: ", selectedDepartments)

  return (
    <div>
      <MultiLevelSelect
          id="multiselect-default"
          marginBottom="md"
          treeData={treeData}
          variant="single"
          {...register("departments")}
          {...props}
      />
      <Title size="h4">Selected Departments</Title>
      <ul>
        {selectedDepartments && selectedDepartments.map((selection) => (
          <li key={selection.id}>
            {selection.label}
            {selection.children && selection.children.length > 0 && (
              <ul>
                {selection.children.map((child) => (
                  <li key={child.id}>{child.label}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MultiLevelSelectReactHook
