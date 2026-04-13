import React, { useState } from 'react'

import Body from '../../pb_body/_body'
import Button from '../../pb_button/_button'
import Caption from '../../pb_caption/_caption'
import DatePicker from '../../pb_date_picker/_date_picker'
import Dialog from '../../pb_dialog/_dialog'
import Dropdown from '../../pb_dropdown/_dropdown'
import Filter from '../../pb_filter/_filter'
import Flex from '../../pb_flex/_flex'
import MultiLevelSelect from '../../pb_multi_level_select/_multi_level_select'
import SectionSeparator from '../../pb_section_separator/_section_separator'
import TimePicker from '../../pb_time_picker/_time_picker'
import Typeahead from '../../pb_typeahead/_typeahead'

const TITLE_TYPEAHEAD_OPTIONS = [
  { key: 'senior-ux-engineer', label: 'Senior UX Engineer', value: 'senior-ux-engineer' },
  { key: 'ux-engineer-ii', label: 'UX Engineer II', value: 'ux-engineer-ii' },
  { key: 'ux-engineer', label: 'UX Engineer', value: 'ux-engineer' },
  { key: 'ux-designer', label: 'UX Designer', value: 'ux-designer' },
  { key: 'director-uxe', label: 'Director of User Experience Engineering', value: 'director-uxe' },
  { key: 'product-manager', label: 'Product Manager', value: 'product-manager' },
  { key: 'engineering-manager', label: 'Engineering Manager', value: 'engineering-manager' },
  { key: 'staff-engineer', label: 'Staff Engineer', value: 'staff-engineer' },
  { key: 'principal-engineer', label: 'Principal Engineer', value: 'principal-engineer' },
  { key: 'data-analyst', label: 'Data Analyst', value: 'data-analyst' },
  { key: 'qa-engineer', label: 'QA Engineer', value: 'qa-engineer' },
  { key: 'devops-engineer', label: 'DevOps Engineer', value: 'devops-engineer' },
  { key: 'technical-writer', label: 'Technical Writer', value: 'technical-writer' },
  { key: 'scrum-master', label: 'Scrum Master', value: 'scrum-master' },
  { key: 'nitro-producteer', label: 'Nitro Producteer', value: 'nitro-producteer' },
]

const BRANCH_DROPDOWN_OPTIONS = [
  { key: 'philadelphia', label: 'Philadelphia', value: 'philadelphia' },
  { key: 'new-york', label: 'New York', value: 'new-york' },
  { key: 'austin', label: 'Austin', value: 'austin' },
  { key: 'chicago', label: 'Chicago', value: 'chicago' },
  { key: 'denver', label: 'Denver', value: 'denver' },
  { key: 'los-angeles', label: 'Los Angeles', value: 'los-angeles' },
  { key: 'seattle', label: 'Seattle', value: 'seattle' },
  { key: 'atlanta', label: 'Atlanta', value: 'atlanta' },
  { key: 'boston', label: 'Boston', value: 'boston' },
  { key: 'dallas', label: 'Dallas', value: 'dallas' },
  { key: 'miami', label: 'Miami', value: 'miami' },
  { key: 'phoenix', label: 'Phoenix', value: 'phoenix' },
  { key: 'portland', label: 'Portland', value: 'portland' },
  { key: 'san-diego', label: 'San Diego', value: 'san-diego' },
  { key: 'remote', label: 'Remote', value: 'remote' },
]

const FILTER_TREE_DATA = [
  {
    label: 'North America',
    value: 'north-america',
    id: 'overflow_filter_na',
    expanded: true,
    children: [
      { label: 'Philadelphia HQ', value: 'phl', id: 'overflow_filter_phl' },
      { label: 'New York', value: 'nyc', id: 'overflow_filter_nyc' },
      { label: 'Boston', value: 'bos', id: 'overflow_filter_bos' },
      { label: 'Toronto', value: 'yyz', id: 'overflow_filter_yyz' },
      { label: 'Chicago', value: 'ord', id: 'overflow_filter_ord' },
    ],
  },
  {
    label: 'Europe',
    value: 'europe',
    id: 'overflow_filter_eu',
    expanded: true,
    children: [
      { label: 'London', value: 'lon', id: 'overflow_filter_lon' },
      { label: 'Berlin', value: 'ber', id: 'overflow_filter_ber' },
      { label: 'Paris', value: 'par', id: 'overflow_filter_par' },
      { label: 'Amsterdam', value: 'ams', id: 'overflow_filter_ams' },
      { label: 'Dublin', value: 'dub', id: 'overflow_filter_dub' },
    ],
  },
  {
    label: 'Asia Pacific',
    value: 'asia-pacific',
    id: 'overflow_filter_apac',
    expanded: true,
    children: [
      { label: 'Singapore', value: 'sin', id: 'overflow_filter_sin' },
      { label: 'Tokyo', value: 'tyo', id: 'overflow_filter_tyo' },
      { label: 'Sydney', value: 'syd', id: 'overflow_filter_syd' },
      { label: 'Melbourne', value: 'mel', id: 'overflow_filter_mel' },
      { label: 'Seoul', value: 'icn', id: 'overflow_filter_icn' },
    ],
  },
]

const typeaheadOptions = [
  { label: 'United States', value: 'unitedStates', id: 'us' },
  { label: 'United Kingdom', value: 'unitedKingdom', id: 'gb' },
  { label: 'Canada', value: 'canada', id: 'ca' },
  { label: 'Australia', value: 'australia', id: 'au' },
  { label: 'Germany', value: 'germany', id: 'de' },
  { label: 'France', value: 'france', id: 'fr' },
  { label: 'Japan', value: 'japan', id: 'jp' },
  { label: 'Brazil', value: 'brazil', id: 'br' },
]

const DialogOverflowVisible = () => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  const filterSortProps = {
    results: 50,
    sortOptions: {
      started_on: 'Start Date',
      title_name: 'Title',
      department_name: 'Department',
      branch_branch_name: 'Branch',
    },
    sortValue: [{ name: 'started_on', dir: 'asc' }],
  }

  const renderFilterPopover = (closePopover, suffix) => (
    <>
      <MultiLevelSelect
          id={`overflow-visible-mls-${suffix}`}
          inputDisplay="none"
          label="Multi Level Select"
          marginBottom="none"
          name={`filter_region_office_${suffix}[]`}
          placeholder="Search offices…"
          treeData={FILTER_TREE_DATA}
      />
      <Dropdown
          id={`overflow-visible-branch-${suffix}`}
          label="Dropdown"
          marginBottom="none"
          options={BRANCH_DROPDOWN_OPTIONS}
      />
      <Typeahead
          id={`overflow-visible-title-${suffix}`}
          isMulti={false}
          label="Typeahead"
          marginBottom="none"
          options={TITLE_TYPEAHEAD_OPTIONS}
          placeholder="Search title…"
      />
      <DatePicker
          label="Date Picker"
          marginBottom="none"
          pickerId={`overflow-visible-started-on-${suffix}`}
      />
      <TimePicker
          id={`overflow-visible-shift-time-${suffix}`}
          label="Time Picker"
          marginBottom="none"
      />
      <Flex spacing="between">
        <Button
            onClick={() => {
              alert('No filtering functionality - just a pattern demo!')
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

  return (
    <>
      <Flex
          align="start"
          gap="lg"
          orientation="row"
          wrap
      >
        <Button onClick={open}>
          {'Open Dialog with Overflow Visible'}
        </Button>
        <Flex
            gap="md"
            orientation="column"
        >
          <Body
              color="light"
              text="Filter popovers (same setups as the Table Filter Card building block) sit on the doc page. Open the dialog to test Typeahead in the dialog body."
          />
          <Caption text="FILTER #1 HAS NO MAX HEIGHT" />
          <Filter
              allowOverflow
              background={false}
              double
              minWidth="xs"
              popoverProps={{ width: '350px' }}
              {...filterSortProps}
          >
            {({ closePopover }) => renderFilterPopover(closePopover, '1')}
          </Filter>
          <SectionSeparator />
          <Caption text="FILTER #2 HAS MAX HEIGHT" />
          <Filter
              allowOverflow
              background={false}
              double
              maxHeight="50vh"
              minWidth="xs"
              popoverProps={{ width: '350px' }}
              {...filterSortProps}
          >
            {({ closePopover }) => renderFilterPopover(closePopover, '2')}
          </Filter>
        </Flex>
      </Flex>
      <Dialog
          onClose={close}
          opened={isOpen}
          size="md"
      >
        <Dialog.Header>
          <Body>{'Select Location'}</Body>
        </Dialog.Header>
        <Dialog.Body>
          <Typeahead
              id="location-typeahead"
              isMulti={false}
              options={typeaheadOptions}
              placeholder="Select a location..."
          />
        </Dialog.Body>
        <Dialog.Footer>
          <Button onClick={close}>{'Save'}</Button>
          <Button
              onClick={close}
              variant="link"
          >
            {'Cancel'}
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

export default DialogOverflowVisible
