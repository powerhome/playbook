import React, { useState } from "react"
import { Button, Date as DateKit, DatePicker, Dropdown, Pagination, Select, Table, TextInput, Typeahead, Flex } from "playbook-ui"


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
    { id: 10, name: "Sarah", title: "Senior Product Manager", department: "Business Technology", branch: "New York", startDate: "2025-01-10" },
    { id: 11, name: "Michael", title: "Software Engineer III", department: "Business Technology", branch: "Austin", startDate: "2025-01-11" },
    { id: 12, name: "Emma", title: "Data Analyst II", department: "Customer Development", branch: "Philadelphia", startDate: "2025-01-12" },
    { id: 13, name: "David", title: "QA Engineer", department: "Business Technology", branch: "New York", startDate: "2025-01-13" },
    { id: 14, name: "Lisa", title: "UX Researcher", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-14" },
    { id: 15, name: "James", title: "DevOps Engineer", department: "Business Technology", branch: "Austin", startDate: "2025-01-15" },
    { id: 16, name: "Anna", title: "Product Designer", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-16" },
    { id: 17, name: "Robert", title: "Backend Engineer", department: "Business Technology", branch: "New York", startDate: "2025-01-17" },
    { id: 18, name: "Maria", title: "Frontend Developer", department: "Business Technology", branch: "Austin", startDate: "2025-01-18" },
    { id: 19, name: "William", title: "Tech Lead", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-19" },
    { id: 20, name: "Jessica", title: "Scrum Master", department: "Business Technology", branch: "New York", startDate: "2025-01-20" },
    { id: 21, name: "Daniel", title: "Software Architect", department: "Business Technology", branch: "Austin", startDate: "2025-01-21" },
    { id: 22, name: "Laura", title: "Business Analyst", department: "Customer Development", branch: "Philadelphia", startDate: "2025-01-22" },
    { id: 23, name: "Chris", title: "Security Engineer", department: "Business Technology", branch: "New York", startDate: "2025-01-23" },
    { id: 24, name: "Ashley", title: "UX Engineer III", department: "Business Technology", branch: "Austin", startDate: "2025-01-24" },
    { id: 25, name: "Kevin", title: "Platform Engineer", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-25" },
    { id: 26, name: "Michelle", title: "Content Designer", department: "Business Technology", branch: "New York", startDate: "2025-01-26" },
  ]


const TableWithFilterVariantWithPagination = () => {
  const [territory, setTerritory] = useState("")
  // ------Pagination-----
  const [activePage, setActivePage] = useState(1)
    // Calculate pagination
  const itemsPerPage = 20
  const totalPages = Math.ceil(users.length / itemsPerPage)
  const startIndex = (activePage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = users.slice(startIndex, endIndex)
  
  const onPageChange = (page) => {
    setActivePage(page)
  }
  // ------End Pagination-----
  
// -------Filter content example ------
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

  // -------Pagination element example ------
  const paginationElement = (
    <Pagination
        current={activePage}
        key={`pagination-${activePage}`}
        marginLeft="lg"
        onChange={onPageChange}
        paddingY="xs"
        range={5}
        total={totalPages}
    />
  )
  // -------End Pagination element example ------

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
        pagination={paginationElement}
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
        {currentData.map((user) => (
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

export default TableWithFilterVariantWithPagination
