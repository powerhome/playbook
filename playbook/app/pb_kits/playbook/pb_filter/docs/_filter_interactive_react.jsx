import React, { useState } from 'react'

import Filter from '../_filter'

import Button from '../../pb_button/_button'
import DatePicker from '../../pb_date_picker/_date_picker'
import Flex from '../../pb_flex/_flex'
import Select from '../../pb_select/_select'
import TextInput from '../../pb_text_input/_text_input'

const territorySelectOptions = [
  { value: 'USA' },
  { value: 'Canada' },
  { value: 'Brazil' },
  { value: 'Philippines' },
]

const statusDropdownOptions = [
  { label: 'Open', value: 'open' },
  { label: 'In progress', value: 'in_progress' },
  { label: 'Resolved', value: 'resolved' },
  { label: 'Closed', value: 'closed' },
]

const FilterInteractive = (props) => {
  const [territory, setTerritory] = useState('USA')
  const [status, setStatus] = useState('open')
  const [startDate, setStartDate] = useState('05/01/2026')
  const [fullName, setFullName] = useState('John Wick')

  const statusLabel =
    statusDropdownOptions.find((opt) => opt.value === status)?.label || status

  return (
    <Filter
        filters={{
          'Full Name': fullName,
          'Territory': territory,
          'Status': statusLabel,
          'Start date': startDate,
        }}
        interactiveFilters={{
          'Territory': {
            type: 'select',
            options: territorySelectOptions,
            value: territory,
            onChange: setTerritory,
          },
          'Status': {
            type: 'dropdown',
            options: statusDropdownOptions,
            value: status,
            onChange: setStatus,
          },
          'Start date': {
            type: 'date-picker',
            value: startDate,
            onChange: setStartDate,
            format: 'm/d/Y',
          },
        }}
        minWidth="360px"
        results={546}
        sortOptions={{
          popularity: 'Popularity',
        }}
        sortValue={[{ name: 'popularity', dir: 'desc' }]}
        {...props}
    >
    {({ closePopover }) => (
      <form>
        <TextInput
            label="Full Name"
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter name"
            value={fullName}
            {...props}
        />

        <Select
            label="Territory"
            name="location"
            onChange={(e) => setTerritory(e.target.value)}
            options={territorySelectOptions}
            value={territory}
            {...props}
        />

        <DatePicker
            inputValue={startDate}
            label="Start date"
            onChange={(dateStr) => setStartDate(dateStr)}
            pickerId="filter-panel-start-date"
        />

        <Flex
            spacing="between"
            {...props}
        >
          <Button
              onClick={closePopover}
              text="Apply"
              {...props}
          />
          <Button
              text="Clear"
              variant="secondary"
              {...props}
          />
        </Flex>
      </form>
    )}
    </Filter>
  )
}

export default FilterInteractive
