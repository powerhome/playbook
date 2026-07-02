import React, { useState } from 'react'

import Typeahead from '../_typeahead'
import Dropdown from '../../pb_dropdown/_dropdown'
import MultiLevelSelect from '../../pb_multi_level_select/_multi_level_select'
import DatePicker from '../../pb_date_picker/_date_picker'
import TimePicker from '../../pb_time_picker/_time_picker'
import FullScreen from '../../pb_full_screen/_full_screen'
import Button from '../../pb_button/_button'
import Dialog from '../../pb_dialog/_dialog'
import Flex from '../../pb_flex/_flex'
import Body from '../../pb_body/_body'
import Caption from '../../pb_caption/_caption'
import SectionSeparator from '../../pb_section_separator/_section_separator'
import Filter from '../../pb_filter/_filter'

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

const dropdownDocOptions = [
  { label: 'United States', value: 'unitedStates', id: 'us' },
  { label: 'Canada', value: 'canada', id: 'ca' },
  { label: 'United Kingdom', value: 'unitedKingdom', id: 'gb' },
  { label: 'Japan', value: 'japan', id: 'jp' },
  { label: 'Brazil', value: 'brazil', id: 'br' },
]

const suffixTreeIds = (nodes, suffix) =>
  nodes.map((node) => {
    const next = {
      ...node,
      id: `${node.id}-${suffix}`,
    }
    if (node.children?.length) {
      next.children = suffixTreeIds(node.children, suffix)
    }
    return next
  })

/** From `pb_multi_level_select` default doc example */
const MLS_DEFAULT_TREE_DATA = [
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
          {
            label: 'Talent Acquisition',
            value: 'talentAcquisition',
            id: 'talent1',
          },
          {
            label: 'Business Affairs',
            value: 'businessAffairs',
            id: 'business1',
            children: [
              {
                label: 'Initiatives',
                value: 'initiatives',
                id: 'initiative1',
              },
              {
                label: 'Learning & Development',
                value: 'learningAndDevelopment',
                id: 'development1',
              },
            ],
          },
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
          {
            label: 'Customer Service',
            value: 'customerService',
            id: 'customer1',
          },
          {
            label: 'Energy',
            value: 'energy',
            id: 'energy1',
          },
        ],
      },
    ],
  },
]

/** From `pb_multi_level_select` single-select doc example */
const MLS_SINGLE_TREE_DATA = [
  {
    label: 'HQ',
    value: 'hQ',
    id: 'hq',
  },
  {
    label: 'Philadelphia',
    value: 'philadelphia',
    id: 'phl',
    children: [
      {
        label: 'Marketing & Sales PHL',
        value: 'marketingAndSalesPhl',
        id: 'marketingPHL',
      },
      {
        label: 'Installation Office PHL',
        value: 'installationOfficePhl',
        id: 'installationPHL',
      },
      {
        label: 'Warehouse PHL',
        value: 'warehousePhl',
        id: 'warehousePHL',
      },
    ],
  },
  {
    label: 'New Jersey',
    value: 'newJersey',
    id: 'nj',
    children: [
      {
        label: 'New Jersey',
        value: 'newJersey',
        id: 'nj1',
        children: [
          {
            label: 'Marketing & Sales NJ',
            value: 'marketingAndSalesNj',
            id: 'marketingNJ',
          },
          {
            label: 'Installation Office NJ',
            value: 'installationOfficeNj',
            id: 'installationNJ',
          },
          {
            label: 'Warehouse NJ',
            value: 'warehouseNj',
            id: 'warehouseNJ',
          },
        ],
      },
      {
        label: 'Princeton',
        value: 'princeton',
        id: 'princeton',
        children: [
          {
            label: 'Marketing & Sales Princeton',
            value: 'marketingAndSalesPrinceton',
            id: 'marketingPR',
          },
          {
            label: 'Installation Office Princeton',
            value: 'installationOfficePrinceton',
            id: 'installationPR',
          },
          {
            label: 'Warehouse Princeton',
            value: 'warehousePrinceton',
            id: 'warehousePR',
          },
        ],
      },
    ],
  },
  {
    label: 'Maryland',
    value: 'maryland',
    id: 'MD',
    children: [
      {
        label: 'Marketing & Sales MD',
        value: 'marketingAndSalesMd',
        id: 'marketingMD',
      },
      {
        label: 'Installation Office MD',
        value: 'installationOfficeMd',
        id: 'installationMD',
      },
      {
        label: 'Warehouse MD',
        value: 'warehouseMd',
        id: 'warehouseMD',
      },
    ],
  },
  {
    label: 'Connecticut',
    value: 'connecticut',
    id: 'CT',
    children: [
      {
        label: 'Marketing & Sales CT',
        value: 'marketingAndSalesCt',
        id: 'marketingCT',
      },
      {
        label: 'Installation Office CT',
        value: 'installationOfficeCt',
        id: 'installationCT',
      },
      {
        label: 'Warehouse CT',
        value: 'warehouseCt',
        id: 'warehouseCT',
      },
    ],
  },
]

const mlsDefaultTreeFor = (suffix) =>
  suffixTreeIds(MLS_DEFAULT_TREE_DATA, suffix)

const mlsSingleTreeFor = (suffix) =>
  suffixTreeIds(MLS_SINGLE_TREE_DATA, suffix)

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

const datePickerDocProps = {
  customQuickPickDates: { override: true, dates: [] },
  maxDate: '',
  minDate: '',
  staticPosition: true,
}

const renderDateTimePickers = (suffix) => (
  <>
    <DatePicker
        {...datePickerDocProps}
        label="Date picker"
        name={`typeahead-doc-date-picker-${suffix}`}
        pickerId={`inputs-overflow-date-picker-${suffix}`}
        selectionType="quickpick"
    />
    <TimePicker
        id={`inputs-overflow-time-picker-${suffix}`}
        label="Time picker"
    />
  </>
)
const renderFilterPopover = (closePopover, suffix) => (
  <>
    <Typeahead
        id={`overflow-visible-title-${suffix}`}
        isMulti={false}
        label="Typeahead"
        marginBottom="none"
        options={TITLE_TYPEAHEAD_OPTIONS}
        placeholder="Search title…"
    />
    <Dropdown
        blankSelection="Select country…"
        id={`overflow-visible-dropdown-${suffix}`}
        label="Dropdown"
        options={dropdownDocOptions}
    />
    <MultiLevelSelect
        id={`overflow-visible-multi-level-select-${suffix}-single`}
        inputName="Power"
        label="Multi level select (single)"
        name={`typeahead_doc_filter_${suffix}_mls_single`}
        placeholder="Start typing..."
        treeData={mlsSingleTreeFor(`filter-${suffix}-single`)}
        variant="single"
    />
    <MultiLevelSelect
        id={`overflow-visible-multi-level-select-${suffix}-multi`}
        label="Multi level select (default)"
        name={`typeahead_doc_filter_${suffix}_mls_multi`}
        placeholder="Start typing..."
        treeData={mlsDefaultTreeFor(`filter-${suffix}-multi`)}
    />
    {renderDateTimePickers(`filter-${suffix}`)}
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

const TypeaheadDefault = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrollableOpen, setIsScrollableOpen] = useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  const closeScrollable = () => setIsScrollableOpen(false);
  const openScrollable = () => setIsScrollableOpen(true);
  return (
    <>
      <div style={{ height: "2000px" }}>
      <FullScreen
          headerText="Fullscreen"
          trigger={({ onClick, isOpen }) => (
            <Button
                onClick={onClick}
                text={isOpen ? "Exit Fullscreen" : "Enter Fullscreen"}
                variant="secondary"
            />
        )}
    >
      <Button marginY="md" 
          onClick={open}
      >
          {"Open dialog: Input kits inside"}
        </Button>
        <Dialog onClose={close}
            opened={isOpen}
            size="md"
        >
          <Dialog.Header>
            <Body>{"Input kits inside Dialog"}</Body>
          </Dialog.Header>
          <Dialog.Body>
            <Typeahead
                label="Typeahead"
                marginBottom="none"
                options={typeaheadOptions}
                placeholder="Search country…"
            />
            <Dropdown
                blankSelection="Select country…"
                id="inputs-overflow-dropdown-js"
                label="Dropdown"
                options={dropdownDocOptions}
            />
            <MultiLevelSelect
                id="inputs-overflow-multi-level-select-dialog-js-single"
                inputName="Power"
                label="Multi level select (single)"
                name="typeahead_doc_dialog_mls_js_single"
                placeholder="Start typing..."
                treeData={mlsSingleTreeFor("dialog-single")}
                variant="single"
            />
            <MultiLevelSelect
                id="inputs-overflow-multi-level-select-dialog-js-multi"
                label="Multi level select (default)"
                name="typeahead_doc_dialog_mls_js_multi"
                placeholder="Start typing..."
                treeData={mlsDefaultTreeFor("dialog-multi")}
            />
            {renderDateTimePickers('dialog')}
          </Dialog.Body>
          <Dialog.Footer>
            <Button onClick={close}>{"Save"}</Button>
            <Button onClick={close}
                variant="link"
            >
              {"Cancel"}
            </Button>
          </Dialog.Footer>
        </Dialog>
        <Button marginBottom="md"
            onClick={openScrollable}
        >
          {"Open scrollable dialog: Input kits inside"}
        </Button>
        <Dialog onClose={closeScrollable}
            opened={isScrollableOpen}
            size="md"
        >
          <Dialog.Header>
            <Body>{"Input kits inside Dialog"}</Body>
          </Dialog.Header>
          <Dialog.Body>
            <Body text="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat." />
            <Typeahead
                label="Typeahead"
                marginBottom="none"
                options={typeaheadOptions}
                placeholder="Search country…"
            />
            <Dropdown
                blankSelection="Select country…"
                id="inputs-overflow-dropdown-js"
                label="Dropdown"
                options={dropdownDocOptions}
            />
            <MultiLevelSelect
                id="inputs-overflow-multi-level-select-scrollable-js-single"
                inputName="Power"
                label="Multi level select (single)"
                name="typeahead_doc_dialog_scrollable_mls_js_single"
                placeholder="Start typing..."
                treeData={mlsSingleTreeFor("dialog-scrollable-single")}
                variant="single"
            />
            <MultiLevelSelect
                id="inputs-overflow-multi-level-select-scrollable-js-multi"
                label="Multi level select (default)"
                name="typeahead_doc_dialog_scrollable_mls_js_multi"
                placeholder="Start typing..."
                treeData={mlsDefaultTreeFor("dialog-scrollable-multi")}
            />
            {renderDateTimePickers('dialog-scrollable')}
          </Dialog.Body>
          <Dialog.Footer>
            <Button onClick={closeScrollable}>{"Save"}</Button>
            <Button onClick={closeScrollable}
                variant="link"
            >
              {"Cancel"}
            </Button>
          </Dialog.Footer>
        </Dialog>
        <Caption text="FILTER #1 HAS NO MAX HEIGHT" />
        <Filter
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
            background={false}
            double
            maxHeight="50vh"
            minWidth="xs"
            popoverProps={{ width: '350px' }}
            {...filterSortProps}
        >
          {({ closePopover }) => renderFilterPopover(closePopover, '2')}
        </Filter>
        </FullScreen>
      </div>
    </>
  )
}

export default TypeaheadDefault
