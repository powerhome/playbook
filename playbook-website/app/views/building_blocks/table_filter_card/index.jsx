import React, { useState } from "react";
import {
  Button,
  Caption,
  Card,
  Date as DateKit,
  DatePicker,
  Dropdown,
  Filter,
  Flex,
  MultiLevelSelect,
  SectionSeparator,
  Select,
  Table,
  TextInput,
  TimePicker,
  Title,
  Typeahead,
} from "playbook-ui";

const TITLE_TYPEAHEAD_OPTIONS = [
  { key: "senior-ux-engineer", label: "Senior UX Engineer", value: "senior-ux-engineer" },
  { key: "ux-engineer-ii", label: "UX Engineer II", value: "ux-engineer-ii" },
  { key: "ux-engineer", label: "UX Engineer", value: "ux-engineer" },
  { key: "ux-designer", label: "UX Designer", value: "ux-designer" },
  { key: "director-uxe", label: "Director of User Experience Engineering", value: "director-uxe" },
  { key: "product-manager", label: "Product Manager", value: "product-manager" },
  { key: "engineering-manager", label: "Engineering Manager", value: "engineering-manager" },
  { key: "staff-engineer", label: "Staff Engineer", value: "staff-engineer" },
  { key: "principal-engineer", label: "Principal Engineer", value: "principal-engineer" },
  { key: "data-analyst", label: "Data Analyst", value: "data-analyst" },
  { key: "qa-engineer", label: "QA Engineer", value: "qa-engineer" },
  { key: "devops-engineer", label: "DevOps Engineer", value: "devops-engineer" },
  { key: "technical-writer", label: "Technical Writer", value: "technical-writer" },
  { key: "scrum-master", label: "Scrum Master", value: "scrum-master" },
  { key: "nitro-producteer", label: "Nitro Producteer", value: "nitro-producteer" },
];

const DEPARTMENT_SELECT_OPTIONS = [
  { value: "Business Technology", label: "Business Technology", key: "business-technology" },
  { value: "Customer Development", label: "Customer Development", key: "customer-development" },
  { value: "Talent Acquisition", label: "Talent Acquisition", key: "talent-acquisition" },
  { value: "Finance", label: "Finance", key: "finance" },
  { value: "Legal", label: "Legal", key: "legal" },
  { value: "Marketing", label: "Marketing", key: "marketing" },
  { value: "Operations", label: "Operations", key: "operations" },
  { value: "People & Culture", label: "People & Culture", key: "people-culture" },
  { value: "Product", label: "Product", key: "product" },
  { value: "Sales", label: "Sales", key: "sales" },
  { value: "Security", label: "Security", key: "security" },
  { value: "Support", label: "Support", key: "support" },
  { value: "Data & Analytics", label: "Data & Analytics", key: "data-analytics" },
  { value: "Design", label: "Design", key: "design" },
  { value: "Facilities", label: "Facilities", key: "facilities" },
];

const BRANCH_DROPDOWN_OPTIONS = [
  { key: "philadelphia", label: "Philadelphia", value: "philadelphia" },
  { key: "new-york", label: "New York", value: "new-york" },
  { key: "austin", label: "Austin", value: "austin" },
  { key: "chicago", label: "Chicago", value: "chicago" },
  { key: "denver", label: "Denver", value: "denver" },
  { key: "los-angeles", label: "Los Angeles", value: "los-angeles" },
  { key: "seattle", label: "Seattle", value: "seattle" },
  { key: "atlanta", label: "Atlanta", value: "atlanta" },
  { key: "boston", label: "Boston", value: "boston" },
  { key: "dallas", label: "Dallas", value: "dallas" },
  { key: "miami", label: "Miami", value: "miami" },
  { key: "phoenix", label: "Phoenix", value: "phoenix" },
  { key: "portland", label: "Portland", value: "portland" },
  { key: "san-diego", label: "San Diego", value: "san-diego" },
  { key: "remote", label: "Remote", value: "remote" },
];

/** 15 leaf offices in a nested tree (big dropdown / typeahead-style stress) */
const FILTER_TREE_DATA = [
  {
    label: "North America",
    value: "north-america",
    id: "filter_na",
    expanded: true,
    children: [
      { label: "Philadelphia HQ", value: "phl", id: "filter_phl" },
      { label: "New York", value: "nyc", id: "filter_nyc" },
      { label: "Boston", value: "bos", id: "filter_bos" },
      { label: "Toronto", value: "yyz", id: "filter_yyz" },
      { label: "Chicago", value: "ord", id: "filter_ord" },
    ],
  },
  {
    label: "Europe",
    value: "europe",
    id: "filter_eu",
    expanded: true,
    children: [
      { label: "London", value: "lon", id: "filter_lon" },
      { label: "Berlin", value: "ber", id: "filter_ber" },
      { label: "Paris", value: "par", id: "filter_par" },
      { label: "Amsterdam", value: "ams", id: "filter_ams" },
      { label: "Dublin", value: "dub", id: "filter_dub" },
    ],
  },
  {
    label: "Asia Pacific",
    value: "asia-pacific",
    id: "filter_apac",
    expanded: true,
    children: [
      { label: "Singapore", value: "sin", id: "filter_sin" },
      { label: "Tokyo", value: "tyo", id: "filter_tyo" },
      { label: "Sydney", value: "syd", id: "filter_syd" },
      { label: "Melbourne", value: "mel", id: "filter_mel" },
      { label: "Seoul", value: "icn", id: "filter_icn" },
    ],
  },
];

const TableFilterCard = (props) => {
  const [territory, setTerritory] = useState("");
  const [firstName, setFirstName] = useState("");
  
  const users = [
    { id: 1, name: "Ashlee", title: "Nitro Producteer", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-01" },
    { id: 2, name: "Nick", title: "UX Engineer II", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-02" },
    { id: 3, name: "Nida", title: "Senior UX Engineer", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-03" },
    { id: 4, name: "Justin", title: "Director of User Experience Engineering", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-04" },
    { id: 5, name: "Edward", title: "UX Designer", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-05" },
    { id: 6, name: "Elisa", title: "UX Engineer", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-06" },
    { id: 7, name: "Gary", title: "UX Engineer", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-07" },
    { id: 8, name: "Sam", title: "UX Engineer", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-08" },
    { id: 9, name: "Aaron", title: "Associate Nitro Quality Ninja", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-09" },
    { id: 10, name: "George", title: "UX Engineer", department: "Business Technology", branch: "Philadelphia", startDate: "2025-01-10" }
  ];
  
  return (
    <>
      <Title
        paddingLeft={{
          xs: "sm",
          sm: "sm",
          md: "xl",
          lg: "xl",
          xl: "xl",
          default: "xl",
        }}
        paddingY="md"
        size={3}
        tag="h1"
        text="Modified Filters here to Demo Input Escape - 'Branch' is the Dropdown kit"
      />
      <Card
        marginX={{
          xs: "sm",
          sm: "sm",
          md: "xl",
          lg: "xl",
          xl: "xl",
          default: "xl",
        }}
        padding="none"
      >
        <Flex align="stretch" flexDirection="column" gap="none">
          <Caption text="FILTER #1 HAS NO MAX HEIGHT AND ALLOWS OVERFLOW" />
          <Filter
            allowOverflow
            background={false}
            double
            minWidth="xs"
            popoverProps={{ width: "350px" }}
            results={50}
            sortOptions={{
              territory_id: "Territory ID",
              first_name: "Name",
              started_on: "Start Date",
              department_name: "Department",
              title_name: "Title",
              branch_branch_name: "Branch",
            }}
            sortValue={[{ name: "started_on", dir: "asc" }]}
          >
            {({ closePopover }) => (
              <>
                <TextInput
                  label="Territory ID"
                  onChange={(event) => setTerritory(event.target.value)}
                  value={territory}
                />

                <TextInput
                  label="First Name"
                  onChange={(event) => setFirstName(event.target.value)}
                  value={firstName}
                />


                <Select
                  blankSelection="All Departments"
                  label="Department"
                  options={DEPARTMENT_SELECT_OPTIONS}
                />

                <Dropdown label="Branch" options={BRANCH_DROPDOWN_OPTIONS} />

                <MultiLevelSelect
                  id="table-filter-mls"
                  inputDisplay="none"
                  label="Region & office"
                  marginBottom="sm"
                  name="filter_region_office[]"
                  placeholder="Search offices…"
                  treeData={FILTER_TREE_DATA}
                />

                <DatePicker label="Start Date" pickerId="startedOn" />

                <TimePicker
                  id="table-filter-time"
                  label="Shift start"
                  paddingY="sm"
                />
                <Typeahead label="Title" options={TITLE_TYPEAHEAD_OPTIONS} />

                <Flex spacing="between">
                  <Button
                    onClick={() => {
                      alert("No filtering functionality - just a pattern demo!");
                      closePopover();
                    }}
                    text="Filter"
                  />
                  <Button text="Defaults" variant="secondary" />
                </Flex>
              </>
            )}
          </Filter>
          <SectionSeparator />
          <Caption text="FILTER #2 HAS MAX HEIGHT AND ALLOWS OVERFLOW" />
          <Filter
            allowOverflow
            background={false}
            double
            maxHeight="50vh"
            minWidth="xs"
            popoverProps={{ width: "350px" }}
            results={50}
            sortOptions={{
              territory_id: "Territory ID",
              first_name: "Name",
              started_on: "Start Date",
              department_name: "Department",
              title_name: "Title",
              branch_branch_name: "Branch",
            }}
            sortValue={[{ name: "started_on", dir: "asc" }]}
          >
            {({ closePopover }) => (
              <>
                <TextInput
                  label="Territory ID"
                  onChange={(event) => setTerritory(event.target.value)}
                  value={territory}
                />

                <TextInput
                  label="First Name"
                  onChange={(event) => setFirstName(event.target.value)}
                  value={firstName}
                />


                <Select
                  blankSelection="All Departments"
                  label="Department"
                  options={DEPARTMENT_SELECT_OPTIONS}
                />

                <Dropdown label="Branch" options={BRANCH_DROPDOWN_OPTIONS} />

                <MultiLevelSelect
                  id="table-filter-mls"
                  inputDisplay="none"
                  label="Region & office"
                  marginBottom="sm"
                  name="filter_region_office[]"
                  placeholder="Search offices…"
                  treeData={FILTER_TREE_DATA}
                />

                <DatePicker label="Start Date" pickerId="startedOn" />

                <TimePicker
                  id="table-filter-time"
                  label="Shift start"
                  paddingY="sm"
                />
                <Typeahead label="Title" options={TITLE_TYPEAHEAD_OPTIONS} />

                <Flex spacing="between">
                  <Button
                    onClick={() => {
                      alert("No filtering functionality - just a pattern demo!");
                      closePopover();
                    }}
                    text="Filter"
                  />
                  <Button text="Defaults" variant="secondary" />
                </Flex>
              </>
            )}
          </Filter>
          <Table 
              collapse="md" 
              container={false} 
              size="sm"
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
                  <Table.Cell marginX={{ xs: "sm" }} numberSpacing="tabular">{user.id}</Table.Cell>
                  <Table.Cell marginX={{ xs: "sm" }}>{user.name}</Table.Cell>
                  <Table.Cell marginX={{ xs: "sm" }}>{user.title}</Table.Cell>
                  <Table.Cell marginX={{ xs: "sm" }}>{user.department}</Table.Cell>
                  <Table.Cell marginX={{ xs: "sm" }}>{user.branch}</Table.Cell>
                  <Table.Cell marginX={{ xs: "sm" }}>
                    <DateKit 
                      alignment="right"
                      value={user.startDate}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Flex>
      </Card>
    </>
  );
}

export default TableFilterCard;