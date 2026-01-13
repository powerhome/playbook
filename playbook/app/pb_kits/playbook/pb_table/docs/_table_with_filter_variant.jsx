import React, { useState } from "react"
import { Button, Date as DateKit, DatePicker, Dropdown, Select, Table, TextInput, Typeahead, Flex } from "playbook-ui"

 // Mock Data for Table  
  const users = [
    { id: 1, name: "Jennifer", title: "Associate Scrum Master", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-01" },
    { id: 2, name: "Nick", title: "UX Engineer II", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-02" },
    { id: 3, name: "Nida", title: "Senior UX Engineer", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-03" },
    { id: 4, name: "Justin", title: "Director of User Experience Engineering", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-04" },
    { id: 5, name: "Edward", title: "UX Designer II", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-05" },
    { id: 6, name: "Elisa", title: "UX Engineer", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-06" },
    { id: 7, name: "Gary", title: "UX Engineer", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-07" },
    { id: 8, name: "Barkley", title: "Nitro Quality Ninja", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-08" },
    { id: 9, name: "Aaron", title: "Associate Nitro Quality Ninja", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-09" },
  ]

const TableWithFilterVariant = () => {
  const [territory, setTerritory] = useState("")

  // --------Filter content example ------
  const filterContent = ({ closePopover }) => (
          <>
            <TextInput
                label="Territory ID"
                onChange={event => setTerritory(event.target.value)}
                value={territory}
            />

            <Typeahead
                label="Title"
                options={[
                  { key: "senior-ux-engineer", label: "Senior UX Engineer", value: "senior-ux-engineer" },
                  { key: "ux-engineer", label: "UX Engineer", value: "ux-engineer" },
                  { key: "ux-designer", label: "UX Designer", value: "ux-designer" }
                ]}
            />

            <Select
                blankSelection="All Departments"
                label="Department"
                options={[
                  { value: "Business Technology", label: "Business Technology", key: "business-technology" },
                  { value: "Customer Development", label: "Customer Development", key: "customer-development" },
                  { value: "Talent Acquisition", label: "Talent Acquisition", key: "talent-acquisition" }
                ]}
            />

            <Dropdown
                label="Branch"
                options={[
                  { key: "Philadelphia", label: "Philadelphia", value: "philadelphia" },
                  { key: "New York", label: "New York", value: "new-york" },
                  { key: "Austin", label: "Austin", value: "austin" }
                ]}
            />

            <DatePicker
                label="Start Date"
                paddingY="sm"
                pickerId="startedOn"
            />
            <Flex spacing="between">
            <Button
                onClick={() => {
                  alert("No filtering functionality - just a pattern demo!")
                  closePopover()
                }}
                text="Filter"
            />
            <Button
                text="Defaults"
                variant="secondary"
            />
            </Flex>
          </>
        )
  // -------End Filter content example ------
  
  return (
    <Table 
        filterContent={filterContent}
        filterProps={{
          results: 50,
          sortOptions: {
            territory_id: "Territory ID",
            first_name: "Name",
            started_on: "Start Date",
            department_name: "Department",
            title_name: "Title",
            branch_branch_name: "Branch",
          },
          sortValue: [{ name: 'started_on', dir: 'asc' }],
        }}
        title="Table Title Here"
        variant="withFilter"
    >
      <Table.Head>
        <Table.Row>
          <Table.Header>{'Territory ID'}</Table.Header>
          <Table.Header>{'Name'}</Table.Header>
          <Table.Header>{'Title'}</Table.Header>
          <Table.Header>{'Department'}</Table.Header>
          <Table.Header>{'Branch'}</Table.Header>
          <Table.Header textAlign="right">{'Start Date'}</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell 
                marginX={{ xs: "sm" }}
                numberSpacing="tabular"
            >
                {user.id}
            </Table.Cell>
            <Table.Cell marginX={{ xs: "sm" }}>{user.name}</Table.Cell>
            <Table.Cell marginX={{ xs: "sm" }}>{user.title}</Table.Cell>
            <Table.Cell marginX={{ xs: "sm" }}>{user.department}</Table.Cell>
            <Table.Cell marginX={{ xs: "sm" }}>{user.branch}</Table.Cell>
            <Table.Cell marginX={{ xs: "sm" }}>
              <DateKit 
                  alignment="right"
                  showCurrentYear
                  value={user.startDate}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default TableWithFilterVariant
