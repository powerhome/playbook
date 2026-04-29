/* eslint-disable react/jsx-max-props-per-line, react/jsx-no-literals, react/no-multi-comp */
import React, { useState } from 'react'
import Flex from '../../pb_flex/_flex'
import Title from '../../pb_title/_title'
import Caption from '../../pb_caption/_caption'
import Body from '../../pb_body/_body'
import Avatar from '../../pb_avatar/_avatar'
import Background from '../../pb_background/_background'
import Badge from '../../pb_badge/_badge'
import BreadCrumbs from '../../pb_bread_crumbs/_bread_crumbs'
import BreadCrumbItem from '../../pb_bread_crumbs/_bread_crumb_item'
import Button from '../../pb_button/_button'
import ButtonToolbar from '../../pb_button_toolbar/_button_toolbar'
import Card from '../../pb_card/_card'
import Checkbox from '../../pb_checkbox/_checkbox'
import CircleIconButton from '../../pb_circle_icon_button/_circle_icon_button'
import Collapsible from '../../pb_collapsible/_collapsible'
import Contact from '../../pb_contact/_contact'
import CopyButton from '../../pb_copy_button/_copy_button'
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import MOCK_TABLE_DATA from '../../pb_advanced_table/docs/advanced_table_mock_data.json'
import Currency from '../../pb_currency/_currency'
import DashboardValue from '../../pb_dashboard_value/_dashboard_value'
import Detail from '../../pb_detail/_detail'
import Dialog from '../../pb_dialog/_dialog'
import DistributionBar from '../../pb_distribution_bar/_distribution_bar'
import Dropdown from '../../pb_dropdown/_dropdown'
import PbDate from '../../pb_date/_date'
import DatePicker from '../../pb_date_picker/_date_picker'
import DateRangeInline from '../../pb_date_range_inline/_date_range_inline'
import DateRangeStacked from '../../pb_date_range_stacked/_date_range_stacked'
import DateStacked from '../../pb_date_stacked/_date_stacked'
import PbDateTime from '../../pb_date_time/_date_time'
import DateTimeStacked from '../../pb_date_time_stacked/_date_time_stacked'
import FixedConfirmationToast from '../../pb_fixed_confirmation_toast/_fixed_confirmation_toast'
import FlexItem from '../../pb_flex/_flex_item'
import FormGroup from '../../pb_form_group/_form_group'
import FormPill from '../../pb_form_pill/_form_pill'
import Hashtag from '../../pb_hashtag/_hashtag'
import Highlight from '../../pb_highlight/_highlight'
import Icon from '../../pb_icon/_icon'
import IconButton from '../../pb_icon_button/_icon_button'
import IconCircle from '../../pb_icon_circle/_icon_circle'
import IconStatValue from '../../pb_icon_stat_value/_icon_stat_value'
import IconValue from '../../pb_icon_value/_icon_value'
import Image from '../../pb_image/_image'
import HomeAddressStreet from '../../pb_home_address_street/_home_address_street'
import Layout from '../../pb_layout/_layout'
import LabelPill from '../../pb_label_pill/_label_pill'
import LabelValue from '../../pb_label_value/_label_value'
import Legend from '../../pb_legend/_legend'
import Lightbox from '../../pb_lightbox/_lightbox.tsx'
import Link from '../../pb_link/_link'
import List from '../../pb_list/_list'
import ListItem from '../../pb_list/_list_item'
import LoadingInline from '../../pb_loading_inline/_loading_inline'
import Map from '../../pb_map/_map'
import Message from '../../pb_message/_message'
import MultiLevelSelect from '../../pb_multi_level_select/_multi_level_select'
import TextInput from '../../pb_text_input/_text_input'
import DateYearStacked from '../../pb_date_year_stacked/_date_year_stacked'
import Draggable from '../../pb_draggable/_draggable'
import { DraggableProvider } from '../../pb_draggable/context'
import EmptyState from '../../pb_empty_state/_empty_state'
import FileUpload from '../../pb_file_upload/_file_upload'
import Filter from '../../pb_filter/_filter'
import MultipleUsers from '../../pb_multiple_users/_multiple_users'
import MultipleUsersStacked from '../../pb_multiple_users_stacked/_multiple_users_stacked'
import Select from '../../pb_select/_select'

const cardBorderAdvancedTableColumnDefinitions = [
  { accessor: 'year', label: 'Year', cellAccessors: ['quarter', 'month', 'day'] },
  { accessor: 'newEnrollments', label: 'New Enrollments' },
  { accessor: 'scheduledMeetings', label: 'Scheduled Meetings' },
  { accessor: 'attendanceRate', label: 'Attendance Rate' },
  { accessor: 'completedClasses', label: 'Completed Classes' },
  { accessor: 'classCompletionRate', label: 'Class Completion Rate' },
  { accessor: 'graduatedStudents', label: 'Graduated Students' },
]

const cardBorderDropdownOptions = [
  { label: 'United States', value: 'unitedStates', id: 'us' },
  { label: 'Canada', value: 'canada', id: 'ca' },
  { label: 'Pakistan', value: 'pakistan', id: 'pk' },
]

const cardBorderMultiLevelTreeData = [{
  label: 'Power Home Remodeling',
  value: 'powerHomeRemodeling',
  id: '100',
  expanded: true,
  children: [
    {
      label: 'People',
      value: 'people',
      id: '101',
      expanded: true,
      children: [
        { label: 'Talent Acquisition', value: 'talentAcquisition', id: '102' },
        { label: 'Business Affairs', value: 'businessAffairs', id: '103' },
      ],
    },
  ],
}]

const cardBorderDateRangeStart = new Date(2019, 5, 18)
const cardBorderDateRangeEnd = new Date(2020, 2, 20)
const cardBorderNow = new Date()

function CardBorderDialogSample() {
  const [open, setOpen] = useState(false)
  return (
    <Flex orientation="column" spacing="sm">
      <Button onClick={() => setOpen(true)} text="Open dialog (sample)" />
      <Dialog
          border="default"
          cancelButton="Cancel Button"
          closeable={false}
          confirmButton="Okay"
          id="dialog-simple"
          onCancel={() => setOpen(false)}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          opened={open}
          shouldCloseOnOverlayClick
          size="sm"
          text="Hello Body Text, Nice to meet ya."
          title="Header Title is the Title Prop"
      />
    </Flex>
  )
}

const cardBorderDraggableImages = [
  { id: '21', url: 'https://unsplash.it/500/400/?image=633' },
  { id: '22', url: 'https://unsplash.it/500/400/?image=634' },
  { id: '23', url: 'https://unsplash.it/500/400/?image=637' },
]

function CardBorderDraggableSample() {
  const [items, setItems] = useState(cardBorderDraggableImages)
  return (
    <DraggableProvider initialItems={cardBorderDraggableImages} onReorder={(next) => setItems(next)}>
      <Draggable.Container border="default">
        <Flex>
          {items.map(({ id, url }) => (
            <Draggable.Item dragId={id} key={id}>
              <Image alt={id} margin="xs" size="md" url={url} />
            </Draggable.Item>
          ))}
        </Flex>
      </Draggable.Container>
    </DraggableProvider>
  )
}

const cardBorderFilterTerritoryOptions = [
  { value: 'USA', text: 'USA' },
  { value: 'Canada', text: 'Canada' },
  { value: 'Brazil', text: 'Brazil' },
  { value: 'Philippines', text: 'Philippines' },
  { value: 'A galaxy far far away...', text: 'A galaxy far far away...' },
]

function CardBorderFilterSample() {
  return (
    <Filter
        border="default"
        filters={{ 'Full Name': 'John Wick' }}
        minWidth="360px"
        results={546}
        sortOptions={{
          popularity: 'Popularity',
          manager_title: 'Manager\'s Title',
          manager_name: 'Manager\'s Name',
        }}
        sortValue={[{ name: 'popularity', dir: 'desc' }]}
    >
      {({ closePopover }) => (
        <form>
          <TextInput label="Full Name" placeholder="Enter name" />
          <Select
              blankSelection="Select One..."
              label="Territory"
              name="location"
              onChange={() => {}}
              options={cardBorderFilterTerritoryOptions}
          />
          <Flex spacing="between">
            <Button onClick={closePopover} text="Apply" />
            <Button text="Clear" variant="secondary" />
          </Flex>
        </form>
      )}
    </Filter>
  )
}

function CardBorderFileUploadSample() {
  return (
    <FileUpload
        border="default"
        onFilesAccepted={() => {}}
        onFilesRejected={() => {}}
    />
  )
}

function CardBorderLightboxSample() {
  const photos = [
    'https://images.unsplash.com/photo-1638727228877-d2a79ab75e68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2668&q=80',
  ]
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)
  const handleCloseLightbox = () => {
    setShowLightbox(false)
    setSelectedPhoto(0)
  }
  const onPhotoClick = (photoIndex) => {
    setShowLightbox(true)
    setSelectedPhoto(photoIndex)
  }
  return (
    <div>
      {showLightbox ? (
        <Lightbox
            border="default"
            icon="times"
            initialPhoto={selectedPhoto}
            onClose={handleCloseLightbox}
            photos={photos}
        />
      ) : (
        <Flex vertical="stretch">
          {photos.map((photo, index) => (
            <div key={photo} onClick={() => onPhotoClick(index)} role="presentation">
              <Image cursor="pointer" marginRight="xl" rounded size="lg" url={photo} />
            </div>
          ))}
        </Flex>
      )}
    </div>
  )
}

const cardBorderMultipleUsersList = [
  { name: 'Patrick Welch', imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg' },
  { name: 'Lucille Sanchez', imageUrl: 'https://randomuser.me/api/portraits/women/6.jpg' },
  { name: 'Beverly Reyes', imageUrl: 'https://randomuser.me/api/portraits/women/74.jpg' },
  { name: 'Keith Craig', imageUrl: 'https://randomuser.me/api/portraits/men/40.jpg' },
  { name: 'Alicia Cooper', imageUrl: 'https://randomuser.me/api/portraits/women/46.jpg' },
]

const Showcase = (props) => (
  <Flex margin="md" orientation="column" vertical="stretch" width="100%" {...props}>
    <Title marginBottom="md" size={4} tag="h4" text="Border Global Prop on kits A–M" />
      <Flex key="advanced_table" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="advanced_table" />
        <AdvancedTable
            border="default"
            columnDefinitions={cardBorderAdvancedTableColumnDefinitions}
            id="background-control"
            tableData={MOCK_TABLE_DATA}
        />
      </Flex>
      <Flex key="avatar" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="avatar" />
        <Avatar
            border="default"
            componentOverlay={{
            component: 'badge',
            placement: 'bottom-right',
            text: '12',
          }}
            imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
            marginBottom="sm"
            name="Terry Johnson"
            size="sm"
        />
      </Flex>
      <Flex key="background" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="background" />
        <Background backgroundColor="category_1" border="default" padding="xl">
          <Body text="Background kit" />
        </Background>
      </Flex>
      <Flex key="badge" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="badge" />
        <Badge border="default" rounded text="+1" variant="primary" />
      </Flex>
      <Flex key="body" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="body" />
        <Body border="default" lineHeight="loose" maxWidth="md">
          <p>
            Infuse your life with action. Don&apos;t wait for it to happen. Make it happen. Make your own future.
            Make your own hope. Make your own love.
          </p>
          <br />
          <p>- Bradley Whitford</p>
        </Body>
      </Flex>
      <Flex key="bread_crumbs" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="bread_crumbs" />
        <BreadCrumbs aria={{ label: 'Breadcrumb Navigation' }} border="default">
          <Icon color="link" icon="home" size="1x" />
          <BreadCrumbItem href="/">
            <Title color="link" size="4" tag="span" text="Home" />
          </BreadCrumbItem>
          <Icon color="link" icon="users" size="1x" />
          <BreadCrumbItem href="/users">
            <Title color="link" size="4" tag="span" text="Users" />
          </BreadCrumbItem>
          <Icon icon="user" size="1x" />
          <BreadCrumbItem>
            <Title size="4" tag="span" text="User" />
          </BreadCrumbItem>
        </BreadCrumbs>
      </Flex>
      <Flex key="button" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="button" />
        <Button
            aria={{ label: 'Go to Google' }}
            border="default"
            link="http://google.com"
            tag="a"
            text="Button with ARIA"
        />
      </Flex>
      <Flex key="button_toolbar" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="button_toolbar" />
        <ButtonToolbar border="default" orientation="vertical">
          <Button text="Create" />
          <Button text="Edit" />
          <Button text="Copy" />
          <Button text="Cut" />
        </ButtonToolbar>
      </Flex>
      <Flex key="caption" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="caption" />
        <Caption border="default">Block</Caption>
      </Flex>
      <Flex key="card" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="card" />
        <Card background="dark" border="default" dark marginBottom="sm" padding="sm">
          <Body dark text="Dark" />
        </Card>
      </Flex>
      <Flex key="checkbox" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="checkbox" />
        <Checkbox border="default" checked name="checkbox-name" text="Checked Checkbox" value="checkbox-value" />
      </Flex>
      <Flex key="circle_icon_button" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="circle_icon_button" />
        <CircleIconButton border="default" icon="plus"  />
      </Flex>
      <Flex key="collapsible" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="collapsible" />
        <Collapsible border="default" id="card-border-collapsible-demo" marginBottom="sm">
          <Collapsible.Main padding="md">
            <Body text="Collapsible header" />
          </Collapsible.Main>
          <Collapsible.Content padding="md">
            <Body text="Collapsible content (border global prop on parent)." />
          </Collapsible.Content>
        </Collapsible>
      </Flex>
      <Flex key="contact" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="contact" />
        <Contact border="default" contactType="cell" contactValue="349-185-9988"/>
      </Flex>
      <Flex key="copy_button" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="copy_button" />
        <CopyButton
            border="default"
            marginBottom="sm"
            text="Copy Text"
            tooltipPlacement="right"
            tooltipText="Text copied!"
            value="Playbook makes it easy to support bleeding edge, or legacy systems. Use Playbook's 200+ components and end-to-end design language to create simple, intuitive and beautiful experiences with ease."
            variant="button"
        />
      </Flex>
      <Flex key="currency" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="currency" />
        <Currency
            abbreviate
            amount="2,200.50"
            border="default"
            label="Thousands (with Unit)"
            marginBottom="md"
            unit="/mo"
        />
      </Flex>
      <Flex key="dashboard_value" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="dashboard_value" />
        <DashboardValue
            border="default"
            statChange={{ change: 'decrease', value: 26.1 }}
            statLabel="Top Title Value"
            statValue={{ value: 1428, unit: 'appts' }}
        />
      </Flex>
      <Flex key="date" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="date" />
        <PbDate border="default" showDayOfWeek showIcon value={cardBorderNow} />
      </Flex>
      <Flex key="date_picker" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="date_picker" />
        <DatePicker
            allowInput
            maxDate="12/31/2030"
            minDate="01/01/2000"
            name="card-border-date"
            pickerId="date-picker-allow-input"
            staticPosition
        />
      </Flex>
      <Flex key="date_range_inline" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="date_range_inline" />
        <DateRangeInline border="default" endDate={cardBorderDateRangeEnd} size="xs" startDate={cardBorderDateRangeStart} />
      </Flex>
      <Flex key="date_range_stacked" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="date_range_stacked" />
        <DateRangeStacked border="default" endDate={cardBorderDateRangeEnd} startDate={cardBorderDateRangeStart} />
      </Flex>
      <Flex key="date_stacked" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="date_stacked" />
        <DateStacked border="default" date={cardBorderNow} />
      </Flex>
      <Flex key="date_time" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="date_time" />
        <PbDateTime border="default" datetime={cardBorderNow} showDayOfWeek={false} />
      </Flex>
      <Flex key="date_time_stacked" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="date_time_stacked" />
        <DateTimeStacked border="default" dark={false} datetime={cardBorderNow} />
      </Flex>
      <Flex key="date_year_stacked" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="date_year_stacked" />
        <DateYearStacked border="default" date={cardBorderNow} />
      </Flex>
      <Flex key="detail" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="detail" />
        <Detail bold border="default" marginBottom="sm" text="I am a bold detail kit" />
      </Flex>
      <Flex key="dialog" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="dialog" />
        <CardBorderDialogSample />
      </Flex>
      <Flex key="distribution_bar" marginBottom="md" orientation="column" vertical="stretch">
        <Caption marginBottom="xxs" text="distribution_bar" />
        <DistributionBar border="default" colors={['data_7', 'data_1', 'neutral']} marginBottom="sm" width="100%" widths={[4, 5, 3]} />
      </Flex>
      <Flex key="draggable" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="draggable" />
        <CardBorderDraggableSample />
      </Flex>
      <Flex key="dropdown" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="dropdown" />
        <Dropdown blankSelection="Select One..." border="default" marginBottom="sm" options={cardBorderDropdownOptions} />
      </Flex>
      <Flex key="empty_state" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="empty_state" />
          <EmptyState
              border="default"
              description="Body text goes into detail with possible steps for user to take"
              header="Title Explains"
              image="default"
              primaryButton="Next Action"
          />
      </Flex>
      <Flex key="file_upload" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="file_upload" />
        <CardBorderFileUploadSample />
      </Flex>
      <Flex key="filter" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="filter" />
        <CardBorderFilterSample />
      </Flex>
      <Flex key="fixed_confirmation_toast" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="fixed_confirmation_toast" />
        <FixedConfirmationToast
            border="default"
            status="error"
            text="Error Message"
        />
      </Flex>
      <Flex key="flex" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="flex" />
        <Flex align="start" border="default" marginBottom="sm">
          <FlexItem>1</FlexItem>
          <FlexItem padding="none">2</FlexItem>
          <FlexItem padding="xl">3</FlexItem>
          <FlexItem padding="sm">4</FlexItem>
        </Flex>
      </Flex>
      <Flex key="form_group" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="form_group" />
        <FormGroup>
          <TextInput border="default" id="search-with-label" label="with label" placeholder="Search" />
          <Button text="Submit" variant="secondary" />
        </FormGroup>
      </Flex>
      <Flex key="form_pill" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="form_pill" />
        <FormPill border="default" marginBottom="sm" tabIndex={0} text="Primary" />
      </Flex>
      <Flex key="hashtag" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="hashtag" />
        <Hashtag border="default" marginBottom="sm" text="470297" type="project" url="https://google.com" />
      </Flex>
      <Flex key="highlight" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="highlight" />
        <Body border="default">
          This is the <Highlight>Highlight Kit</Highlight>.
        </Body>
      </Flex>
      <Flex key="home_address_street" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="home_address_street" />
        <HomeAddressStreet
            address="70 Prospect Ave"
            addressCont="Apt M18"
            border="default"
            city="West Chester"
            emphasis="street"
            homeId="8250263"
            homeUrl="https://powerhrg.com/"
            houseStyle="Colonial"
            newWindow={false}
            state="PA"
            target=""
            territory="PHL"
            zipcode="19382"
        />
      </Flex>
      <Flex key="icon" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="icon" />
        <Icon border="default" fixedWidth icon="spinner" marginBottom="sm" size="2x" spin />
      </Flex>
      <Flex key="icon_button" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="icon_button" />
        <IconButton border="default" icon="user" marginBottom="sm" variant="secondary" />
      </Flex>
      <Flex key="icon_circle" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="icon_circle" />
        <IconCircle border="default" icon="rocket" marginBottom="sm" size="sm" variant="royal" />
      </Flex>
      <Flex key="icon_stat_value" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="icon_stat_value" />
        <IconStatValue
            border="default"
            icon="globe-europe"
            marginBottom="sm"
            text="Mercury"
            unit="AU"
            value={0.39}
            variant="royal"
        />
      </Flex>
      <Flex key="icon_value" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="icon_value" />
        <IconValue border="default" icon="heart" marginBottom="sm" text="93" />
      </Flex>
      <Flex key="image" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="image" />
        <Image alt="picture of a misty forest" border="default" size="xs" url="https://unsplash.it/500/400/?image=634" />
      </Flex>
      <Flex key="label_pill" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="label_pill" />
        <LabelPill border="default" label="Service Needed" pillValue="76" variant="neutral" />
      </Flex>
      <Flex key="label_value" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="label_value" />
        <LabelValue border="default" label="Role" value="Administrator, Moderator" />
      </Flex>
      <Flex key="layout" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="layout" />
        <Layout border="default" marginBottom="sm">{"layout"}</Layout>
      </Flex>
      <Flex key="legend" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="legend" />
        <Legend border="default" color="data_8" marginBottom="sm" text="Data 8" />
      </Flex>
      <Flex key="lightbox" marginBottom="md" orientation="column" vertical="stretch">
        <Caption marginBottom="xxs" text="lightbox" />
        <CardBorderLightboxSample />
      </Flex>
      <Flex key="link" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="link" />
        <Link
            border="default"
            href="https://www.google.com/search?q=playbook+design+system"
            marginBottom="sm"
            text="link example"
        />
      </Flex>
      <Flex key="list" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="list" />
        <List border="default" borderless dark={false} marginBottom="sm" ordered={false}>
          <ListItem>{'List Item'}</ListItem>
          <ListItem>{'List Item'}</ListItem>
          <ListItem>{'List Item'}</ListItem>
          <ListItem>{'List Item'}</ListItem>
          <ListItem>{'List Item'}</ListItem>
        </List>
      </Flex>
      <Flex key="loading_inline" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="loading_inline" />
        <LoadingInline border="default" marginBottom="sm" text="Saving" />
      </Flex>
      <Flex key="map" marginBottom="md" orientation="column" vertical="stretch">
        <Caption marginBottom="xxs" text="map" />
        <Map border="default" marginBottom="sm" width="100%">{"map"}</Map>
      </Flex>
      <Flex key="message" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="message" />
        <Message border="default" marginBottom="sm">{"message"}</Message>
      </Flex>
      <Flex key="multi_level_select" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="multi_level_select" />
        <MultiLevelSelect
            border="default"
            id="multi-level-select-default-rails"
            name="my_array"
            pillColor="neutral"
            treeData={cardBorderMultiLevelTreeData}
        />
      </Flex>
      <Flex key="multiple_users" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="multiple_users" />
        <MultipleUsers border="default" users={cardBorderMultipleUsersList} />
      </Flex>
      <Flex key="multiple_users_stacked" marginBottom="md" orientation="column">
        <Caption marginBottom="xxs" text="multiple_users_stacked" />
        <MultipleUsersStacked
            border="default"
            users={[{ name: 'Patrick Welch', imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg' }]}
            variant="bubble"
        />
      </Flex>
  </Flex>
)

export default Showcase
