import React, { useState } from 'react'

import Body from '../../pb_body/_body'
import Button from '../../pb_button/_button'
import DatePicker from '../../pb_date_picker/_date_picker'
import Dialog from '../../pb_dialog/_dialog'
import TimePicker from '../../pb_time_picker/_time_picker'
import Dropdown from '../../pb_dropdown/_dropdown'
import Flex from '../../pb_flex/_flex'
import MultiLevelSelect from '../../pb_multi_level_select/_multi_level_select'
import Typeahead from '../../pb_typeahead/_typeahead'

const typeaheadOptions = [
  { label: 'United States', value: 'unitedStates', id: 'us' },
  { label: 'United Kingdom', value: 'unitedKingdom', id: 'gb' },
  { label: 'Canada', value: 'canada', id: 'ca' },
  { label: 'Australia', value: 'australia', id: 'au' },
  { label: 'Germany', value: 'germany', id: 'de' },
  { label: 'France', value: 'france', id: 'fr' },
  { label: 'Japan', value: 'japan', id: 'jp' },
  { label: 'Brazil', value: 'brazil', id: 'br' },
  { label: 'Mexico', value: 'mx', id: 'mx' },
  { label: 'Italy', value: 'it', id: 'it' },
  { label: 'Spain', value: 'es', id: 'es' },
  { label: 'Netherlands', value: 'nl', id: 'nl' },
  { label: 'Sweden', value: 'se', id: 'se' },
  { label: 'Norway', value: 'no', id: 'no' },
  { label: 'Denmark', value: 'dk', id: 'dk' },
  { label: 'Finland', value: 'fi', id: 'fi' },
  { label: 'Poland', value: 'pl', id: 'pl' },
  { label: 'Switzerland', value: 'ch', id: 'ch' },
  { label: 'Austria', value: 'at', id: 'at' },
  { label: 'Belgium', value: 'be', id: 'be' },
  { label: 'Ireland', value: 'ie', id: 'ie' },
  { label: 'Portugal', value: 'pt', id: 'pt' },
  { label: 'Greece', value: 'gr', id: 'gr' },
  { label: 'Czech Republic', value: 'cz', id: 'cz' },
  { label: 'Hungary', value: 'hu', id: 'hu' },
  { label: 'New Zealand', value: 'nz', id: 'nz' },
  { label: 'Singapore', value: 'sg', id: 'sg' },
  { label: 'South Korea', value: 'kr', id: 'kr' },
  { label: 'India', value: 'in', id: 'in' },
  { label: 'China', value: 'cn', id: 'cn' },
]

const multiLevelTreeData = [
  {
    label: 'Power Home Remodeling',
    value: 'powerHomeRemodeling',
    id: 'powerhome1',
    expanded: true,
    children: [
      {
        label: 'People',
        value: 'people',
        id: 'people1',
        expanded: true,
        children: [
          { label: 'Talent Acquisition', value: 'talentAcquisition', id: 'talent1' },
          { label: 'Business Affairs', value: 'businessAffairs', id: 'business1' },
          {
            label: 'People Experience',
            value: 'peopleExperience',
            id: 'experience1',
          },
        ],
      },
      {
        label: 'Contact Center',
        value: 'contactCenter',
        id: 'contact1',
        children: [
          {
            label: 'Appointment Management',
            value: 'appointmentManagement',
            id: 'appointment1',
          },
          { label: 'Customer Service', value: 'customerService', id: 'customer1' },
          { label: 'Energy', value: 'energy', id: 'energy1' },
        ],
      },
    ],
  },
]

const DialogInputsOverflow = () => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  return (
    <>
      <Button onClick={open}>
        {'Open dialog (inputs overflow)'}
      </Button>
      <Dialog
          onClose={close}
          opened={isOpen}
          size="lg"
      >
        <Dialog.Header>
          <Body>{'Form inside dialog'}</Body>
        </Dialog.Header>
        <Dialog.Body>
          <Flex
              gap="md"
              orientation="row"
          >
            <Typeahead
                label="Typeahead"
                marginBottom="none"
                options={typeaheadOptions}
                placeholder="Search country…"
            />
            <Dropdown
                id="inputs-overflow-dialog-dropdown"
                label="Dropdown"
                marginBottom="none"
                options={typeaheadOptions}
                placeholder="Select a country…"
            />
            <MultiLevelSelect
                id="inputs-overflow-dialog-mls"
                label="Multi level select"
                marginBottom="none"
                name="inputs_overflow_mls"
                onSelect={() => undefined}
                treeData={multiLevelTreeData}
            />
            <DatePicker
                label="Date Picker"
                marginBottom="none"
                maxDate="12/31/2030"
                minDate="01/01/2000"
                name="inputs_overflow_dialog_start"
                pickerId="inputs-overflow-dialog-start"
            />
            <TimePicker
                id="inputs-overflow-dialog-time"
                label="Time Picker"
                marginBottom="none"
                name="inputs_overflow_dialog_time"
            />
          </Flex>
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

export default DialogInputsOverflow
