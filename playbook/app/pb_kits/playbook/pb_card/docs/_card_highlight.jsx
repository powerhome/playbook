/* eslint-disable react/jsx-max-props-per-line, react/jsx-no-literals, react/no-multi-comp -- generated kit border showcase */
import React, { useState } from 'react'
import Flex from '../../pb_flex/_flex'
import Title from '../../pb_title/_title'
import TitleCount from '../../pb_title_count/_title_count'
import TitleDetail from '../../pb_title_detail/_title_detail'
import Caption from '../../pb_caption/_caption'
import Body from '../../pb_body/_body'
import Button from '../../pb_button/_button'
import Card from '../../pb_card/_card'
import CircleIconButton from '../../pb_circle_icon_button/_circle_icon_button'
import Icon from '../../pb_icon/_icon'
import Nav from '../../pb_nav/_nav'
import NavItem from '../../pb_nav/_item'
import OnlineStatus from '../../pb_online_status/_online_status'
import Overlay from '../../pb_overlay/_overlay'
import Pagination from '../../pb_pagination/_pagination'
import Passphrase from '../../pb_passphrase/_passphrase'
import PbBarGraph from '../../pb_pb_bar_graph/_pb_bar_graph'
import PbCircleChart from '../../pb_pb_circle_chart/_pb_circle_chart'
import PbGaugeChart from '../../pb_pb_gauge_chart/_pb_gauge_chart'
import PbLineGraph from '../../pb_pb_line_graph/_pb_line_graph'
import Person from '../../pb_person/_person'
import PersonContact from '../../pb_person_contact/_person_contact'
import PhoneNumberInput from '../../pb_phone_number_input/_phone_number_input'
import Pill from '../../pb_pill/_pill'
import PbReactPopover from '../../pb_popover/_popover'
import ProgressPills from '../../pb_progress_pills/_progress_pills'
import ProgressSimple from '../../pb_progress_simple/_progress_simple'
import ProgressStep from '../../pb_progress_step/_progress_step'
import ProgressStepItem from '../../pb_progress_step/_progress_step_item'
import Radio from '../../pb_radio/_radio'
import SectionSeparator from '../../pb_section_separator/_section_separator'
import Select from '../../pb_select/_select'
import SelectableCard from '../../pb_selectable_card/_selectable_card'
import SelectableCardIcon from '../../pb_selectable_card_icon/_selectable_card_icon'
import SelectableIcon from '../../pb_selectable_icon/_selectable_icon'
import SelectableList from '../../pb_selectable_list/_selectable_list'
import SkeletonLoading from '../../pb_skeleton_loading/_skeleton_loading'
import Source from '../../pb_source/_source'
import StarRating from '../../pb_star_rating/_star_rating'
import StatChange from '../../pb_stat_change/_stat_change'
import StatValue from '../../pb_stat_value/_stat_value'
import Table from '../../pb_table/_table'
import TextInput from '../../pb_text_input/_text_input'
import Textarea from '../../pb_textarea/_textarea'
import Time from '../../pb_time/_time'
import TimePicker from '../../pb_time_picker/_time_picker'
import TimeRangeInline from '../../pb_time_range_inline/_time_range_inline'
import TimeStacked from '../../pb_time_stacked/_time_stacked'
import Timeline from '../../pb_timeline/_timeline'
import TimelineItem from '../../pb_timeline/_item'
import Timestamp from '../../pb_timestamp/_timestamp'
import Toggle from '../../pb_toggle/_toggle'
import Tooltip from '../../pb_tooltip/_tooltip'
import Typeahead from '../../pb_typeahead/_typeahead'
import User from '../../pb_user/_user'
import UserBadge from '../../pb_user_badge/_user_badge'
import WeekdayStacked from '../../pb_weekday_stacked/_weekday_stacked'

const cardHighlightNow = new Date()

const cardHighlightBarChartOptions = {
  series: [{
    name: 'Installation',
    data: [1475, 200, 3000, 654, 656],
  }, {
    name: 'Manufacturing',
    data: [4434, 524, 2320, 440, 500],
  }, {
    name: 'Sales & Distribution',
    data: [3387, 743, 1344, 434, 440],
  }, {
    name: 'Project Development',
    data: [3227, 878, 999, 780, 1000],
  }, {
    name: 'Other',
    data: [1111, 677, 3245, 500, 200],
  }],
  title: { text: 'Solar Employment Growth by Sector, 2010-2016' },
  subtitle: { text: 'Source: thesolarfoundation.com' },
  xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
  yAxis: { title: { text: 'Number of Employees' } },
}

const cardHighlightCircleChartOptions = {
  series: [{
    data: [
      { name: 'Waiting for Calls', y: 41 },
      { name: 'On Call', y: 49 },
      { name: 'After Call', y: 10 },
    ],
  }],
}

const cardHighlightGaugeChartOptions = {
  series: [{ data: [{ name: 'Name', y: 45 }] }],
}

const cardHighlightLineChartData = [{
  name: 'Installation',
  data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
}, {
  name: 'Manufacturing',
  data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
}, {
  name: 'Sales & Distribution',
  data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
}, {
  name: 'Project Development',
  data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
}, {
  name: 'Other',
  data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
}]

const cardHighlightLineChartCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const cardHighlightLineChartOptions = {
  series: cardHighlightLineChartData,
  title: { text: 'Solar Employment Growth by Sector, 2010-2016' },
  subtitle: { text: 'Source: thesolarfoundation.com' },
  xAxis: { categories: cardHighlightLineChartCategories },
  yAxis: { title: { text: 'Number of Employees' } },
}

const cardHighlightOverlayTable = () => (
  <Overlay>
    <Table border="default" size="sm">
      <thead>
        <tr>
          <th>{'Column 1'}</th>
          <th>{'Column 2'}</th>
          <th>{'Column 3'}</th>
          <th>{'Column 4'}</th>
          <th>{'Column 5'}</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 7 }, (_, row) => (
          <tr key={row}>
            {Array.from({ length: 5 }, (_, col) => (
              <td key={col}>{`Value ${col + 1}`}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  </Overlay>
)

function CardHighlightPaginationSample() {
  const [page, setPage] = useState(1)
  return (
    <Pagination
        border="default"
        current={page}
        onChange={setPage}
        total={10}
    />
  )
}

function CardHighlightPassphraseSample() {
  const [value, setValue] = useState('')
  return (
    <Passphrase
        border="default"
        classname="passphrase_breached"
        label="Passphrase"
        onChange={setValue}
        value={value}
    />
  )
}

function CardHighlightPopoverSample() {
  const [showPopover, setShowPopover] = useState(false)
  const handleShouldClosePopover = (shouldClose) => {
    setShowPopover(!shouldClose)
  }

  const popoverReference = (
    <CircleIconButton
        icon="info"
        id="actionable-popover-card-highlight"
        onClick={() => setShowPopover(!showPopover)}
    />
  )
  return (
    <Flex border="default" dark orientation="row" vertical="center">
      <Body text="Click info for more details" />
      &nbsp;
      <PbReactPopover
          closeOnClick="any"
          offset
          placement="top"
          reference={popoverReference}
          shouldClosePopover={handleShouldClosePopover}
          show={showPopover}
      >
        <Button id="actionable-tooltip-button" text="Learn more" />
      </PbReactPopover>
    </Flex>
  )
}

function CardHighlightSelectableCardSample() {
  const [checked, setChecked] = useState(true)
  return (
    <SelectableCard
        border="default"
        checked={checked}
        inputId="block"
        name="block"
        onChange={() => setChecked(!checked)}
        value="block"
    >
      <Title size={4} tag="h4" text="Block" />
      <Body tag="span">{'This uses block'}</Body>
    </SelectableCard>
  )
}

function CardHighlightSelectableCardIconSample() {
  const [checked, setChecked] = useState(true)
  return (
    <SelectableCardIcon
        bodyText="Howdy partner."
        border="default"
        checked={checked}
        checkmark
        icon="hat-cowboy"
        inputId="selectable-card-icon-highlight"
        onChange={() => setChecked(!checked)}
        titleText="Cowboy"
    />
  )
}

function CardHighlightTextInputAddOnSample() {
  const [value, setValue] = useState('')
  return (
    <TextInput
        addOn={{ icon: 'bat' }}
        border="default"
        label="Add On With Defaults"
        name="card-highlight-text-addon"
        onChange={(e) => setValue(e.target.value)}
        placeholder=""
        type="text"
        value={value}
    />
  )
}

const cardHighlightSelectFoodOptions = [
  { value: '1', text: 'Burgers' },
  { value: '2', text: 'Pizza' },
  { value: '3', text: 'Tacos' },
  { value: '4', text: 'BBQ' },
]

function CardHighlightSelectFoodSample() {
  const [value, setValue] = useState('2')
  return (
    <Select
        border="default"
        data={{ options: 'data_attribute' }}
        id="select-food-attributes"
        label="Favorite Food"
        name="food"
        onChange={(e) => setValue(e.target.value)}
        options={cardHighlightSelectFoodOptions}
        value={value}
    />
  )
}

const cardHighlightTypeaheadColorOptions = [
  { label: 'Jardim', value: 'Portuguese' },
  { label: 'Garten', value: 'German' },
  { label: 'Giardino', value: 'Italian' },
  { label: 'Jardín', value: 'Spanish' },
]

const Showcase = (props) => (
  <Flex margin="md" orientation="column" vertical="stretch" width="100%" {...props}>
    <Title marginBottom="md" size={4} tag="h4" text="Border Global Prop on kits N–Z" />
    <Body marginBottom="md" text="Not RTE, Source does not have global props so does not work" />
    <Flex key="nav" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="nav" />
      <Nav border="default" link="#" marginBottom="sm" title="Menu">
        <NavItem active={false} link="#" text="Photos" />
        <NavItem active={false} link="#" text="Music" />
        <NavItem active link="#" text="Video" />
        <NavItem active={false} link="#" text="Files" />
      </Nav>
    </Flex>
    <Flex key="online_status" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="online_status" />
      <OnlineStatus border="default" marginY="xs" status="offline" />
    </Flex>
    <Flex key="overlay" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="overlay" />
      {cardHighlightOverlayTable()}
    </Flex>
    <Flex key="pagination" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="pagination" />
      <CardHighlightPaginationSample />
    </Flex>
    <Flex key="passphrase" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="passphrase" />
      <CardHighlightPassphraseSample />
    </Flex>
    <Flex key="pb_bar_graph" marginBottom="md" orientation="column" vertical="stretch">
      <Caption marginBottom="xxs" text="pb_bar_graph" />
      <PbBarGraph border="default" id="card-highlight-bar-graph" options={cardHighlightBarChartOptions} width="100%" />
    </Flex>
    <Flex key="pb_circle_chart" marginBottom="md" orientation="column" vertical="stretch">
      <Caption marginBottom="xxs" text="pb_circle_chart" />
      <PbCircleChart border="default" id="card-highlight-circle-chart" options={cardHighlightCircleChartOptions} width="100%" />
    </Flex>
    <Flex key="pb_gauge_chart" marginBottom="md" orientation="column" vertical="stretch">
      <Caption marginBottom="xxs" text="pb_gauge_chart" />
      <PbGaugeChart border="default" id="card-highlight-gauge-chart" options={cardHighlightGaugeChartOptions} width="100%" />
    </Flex>
    <Flex key="pb_line_graph" marginBottom="md" orientation="column" vertical="stretch">
      <Caption marginBottom="xxs" text="pb_line_graph" />
      <PbLineGraph border="default" id="card-highlight-line-graph" options={cardHighlightLineChartOptions} width="100%" />
    </Flex>
    <Flex key="person" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="person" />
      <Person border="default" firstName="Kyle" lastName="Fadigan" />
    </Flex>
    <Flex key="person_contact" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="person_contact" />
      <PersonContact
          border="default"
          contacts={[
            { contactType: 'email', contactValue: 'email@example.com' },
            { contactType: 'cell', contactValue: '5555555555' },
            { contactType: 'work', contactValue: '3245627482' },
          ]}
          firstName="Pauline"
          lastName="Smith"
      />
    </Flex>
    <Flex key="phone_number_input" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="phone_number_input" />
      <PhoneNumberInput border="default" countrySearch id="country-search" />
    </Flex>
    <Flex key="pill" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="pill" />
      <Pill border="default" marginBottom="sm" text="Default" />
    </Flex>
    <Flex key="popover" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="popover" />
      <CardHighlightPopoverSample />
    </Flex>
    <Flex key="progress_pills" marginBottom="md" orientation="column" vertical="stretch">
      <Caption marginBottom="xxs" text="progress_pills" />
      <ProgressPills active={2} aria={{ label: '2 out of 3 steps complete' }} border="default" fullWidthPill marginBottom="sm" steps={3} width="100%" />
    </Flex>
    <Flex key="progress_simple" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="progress_simple" />
      <ProgressSimple border="default" muted={false} percent="64.9" value={0} width="100px" />
    </Flex>
    <Flex key="progress_step" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="progress_step" />
      <ProgressStep border="default" color="info" icon marginBottom="sm" variant="tracker">
        <ProgressStepItem status="complete">
          <Caption text="Ordered" />
        </ProgressStepItem>
        <ProgressStepItem status="active">
          <Caption text="Shipped" />
        </ProgressStepItem>
        <ProgressStepItem status="inactive">
          <Caption text="Delivered" />
        </ProgressStepItem>
      </ProgressStep>
    </Flex>
    <Flex key="radio" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="radio" />
      <Flex orientation="column">
        <Radio
            alignment="vertical"
            border="default"
            inputOptions={{ tabIndex: 0 }}
            label="Power"
            marginRight="sm"
            name="group 1"
            value="Power"
        />
        <Radio
            alignment="vertical"
            label="Nitro"
            marginRight="sm"
            name="group 1"
            value="Nitro"
        />
        <Radio
            alignment="vertical"
            label="Google"
            name="group 1"
            value="Google"
        />
      </Flex>
    </Flex>
    <Flex key="section_separator" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="section_separator" />
      <SectionSeparator border="default" lineStyle="dashed" marginBottom="sm">
        <Card borderRadius="rounded" justifyContent="center" padding="none">
          <Caption paddingLeft="xs" paddingRight="xs" size="xs" text="TODAY" />
        </Card>
      </SectionSeparator>
    </Flex>
    <Flex key="select" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="select" />
      <CardHighlightSelectFoodSample />
    </Flex>
    <Flex key="selectable_card" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="selectable_card" />
      <CardHighlightSelectableCardSample />
    </Flex>
    <Flex key="selectable_card_icon" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="selectable_card_icon" />
      <CardHighlightSelectableCardIconSample />
    </Flex>
    <Flex key="selectable_icon" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="selectable_icon" />
      <SelectableIcon
          border="default"
          checked
          icon="dollar-sign"
          inputId="selectable-icon-1"
          inputs="enabled"
          name="currency"
          text="US Dollar"
      />
    </Flex>
    <Flex key="selectable_list" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="selectable_list" />
      <SelectableList border="default" variant="checkbox">
        <SelectableList.Item label="Mild" name="checkbox-name-1" onChange={() => {}} value="1">
          {'Mild'}
        </SelectableList.Item>
        <SelectableList.Item checked label="Medium" name="checkbox-name-2" onChange={() => {}} value="2">
          {'Medium'}
        </SelectableList.Item>
        <SelectableList.Item label="Hot" name="checkbox-name-3" onChange={() => {}} value="3">
          {'Hot'}
        </SelectableList.Item>
      </SelectableList>
    </Flex>
    <Flex key="skeleton_loading" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="skeleton_loading" />
      <Flex border="default" justify="evenly" wrap>
        <SkeletonLoading borderRadius="rounded" height="50px" width="100px" />
        <SkeletonLoading borderRadius="xl" height="50px" width="100px" />
        <SkeletonLoading borderRadius="lg" height="50px" width="100px" />
        <SkeletonLoading borderRadius="md" height="50px" width="100px" />
        <SkeletonLoading height="50px" width="100px" />
        <SkeletonLoading borderRadius="xs" height="50px" width="100px" />
        <SkeletonLoading borderRadius="none" height="50px" width="100px" />
      </Flex>
    </Flex>
    <Flex key="source" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="source" />
      <Source hideIcon={false} source="BJ's Johnston-208" type="retail" />
    </Flex>
    <Flex key="star_rating" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="star_rating" />
      <StarRating backgroundType="fill" border="default" paddingBottom="xs" rating={3} />
    </Flex>
    <Flex key="stat_change" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="stat_change" />
      <StatChange border="default" change="increase" value={28.4} />
    </Flex>
    <Flex key="stat_value" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="stat_value" />
      <StatValue border="default" value={1048} />
    </Flex>
    <Flex key="table" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="table" />
      <Table border="default" size="sm">
        <thead>
          <tr>
            <th>{'Column 1'}</th>
            <th>{'Column 2'}</th>
            <th>{'Column 3'}</th>
            <th>{'Column 4'}</th>
            <th>{'Column 5'}</th>
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2].map((row) => (
            <tr key={row}>
              <td>{'Value 1'}</td>
              <td>{'Value 2'}</td>
              <td>
                <Button paddingLeft="none" text="Action" variant="link" />
              </td>
              <td>{'Value 4'}</td>
              <td>{'Value 5'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Flex>
    <Flex key="text_input" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="text_input" />
      <CardHighlightTextInputAddOnSample />
    </Flex>
    <Flex key="textarea" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="textarea" />
      <Textarea border="default" characterCount={0} id="text-area-1" label="Count Only" marginBottom="sm" />
    </Flex>
    <Flex key="time" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="time" />
      <Time align="left" border="default" date={cardHighlightNow} />
    </Flex>
    <Flex key="time_picker" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="time_picker" />
      <TimePicker border="default" id="time-picker-24-hour" label="24-Hour Format" timeFormat="24hour" />
    </Flex>
    <Flex key="time_range_inline" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="time_range_inline" />
      <TimeRangeInline
          border="default"
          endTime={new Date('2012-08-02T17:49:29Z')}
          size="xs"
          startTime={new Date('2012-08-02T15:49:29Z')}
      />
    </Flex>
    <Flex key="time_stacked" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="time_stacked" />
      <TimeStacked align="left" border="default" time={cardHighlightNow} />
    </Flex>
    <Flex key="timeline" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="timeline" />
      <Timeline>
        <TimelineItem border="default" icon="user" iconColor="royal">
          <Body color="light" text="Conversation started" />
        </TimelineItem>
        <TimelineItem icon="check" iconColor="teal">
          <Body color="light" text="Trip #12422" />
        </TimelineItem>
        <TimelineItem icon="credit-card" iconColor="red">
          <Body color="light" text="Refund issue #12422" />
        </TimelineItem>
        <TimelineItem icon="smile" iconColor="green">
          <Body color="light" text="Conversation resolved" />
        </TimelineItem>
      </Timeline>
    </Flex>
    <Flex key="timestamp" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="timestamp" />
      <Timestamp align="left" border="default" showDate={false} text="" timestamp={cardHighlightNow} timezone="America/New_York" />
    </Flex>
    <Flex key="title" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="title" />
      <Title border="default" marginBottom="sm" size={3} tag="h1" text="Default Color" />
    </Flex>
    <Flex key="title_count" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="title_count" />
      <TitleCount border="default" count={527} title="Remodeling Consultants" />
    </Flex>
    <Flex key="title_detail" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="title_detail" />
      <TitleDetail border="default" detail="Commits data and history" title="Email Notifications" />
    </Flex>
    <Flex key="toggle" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="toggle" />
      <Toggle border="default" marginBottom="sm" size="sm">
        <input className="my_custom_input" name="custom_checkbox" type="checkbox" value="ABC" />
      </Toggle>
    </Flex>
    <Flex key="tooltip" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="tooltip" />
      <Tooltip border="default" marginBottom="sm" placement="top" text="Tooltip opened by click! Click trigger again to close." useClickToOpen zIndex={10}>
        <Button text="Click trigger" />
      </Tooltip>
    </Flex>
    <Flex key="typeahead" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="typeahead" />
      <Typeahead
          border="default"
          createable
          id="typeahead-creatable-card-highlight"
          label="Colors"
          name="foo"
          options={cardHighlightTypeaheadColorOptions}
          pills
          placeholder="All Colors"
      />
    </Flex>
    <Flex key="user" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="user" />
      <User
          align="left"
          avatar
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          border="default"
          name="Anna Black"
          orientation="horizontal"
          size="md"
          subtitle={(
            <Flex align="center">
              <Icon icon="users" />
              <Caption paddingLeft="xs" text="Admin" />
            </Flex>
          )}
          territory="PHL"
          title="Remodeling Consultant"
      />
    </Flex>
    <Flex key="user_badge" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="user_badge" />
      <UserBadge badge="veteran" border="default" size="md" />
    </Flex>
    <Flex key="weekday_stacked" marginBottom="md" orientation="column">
      <Caption marginBottom="xxs" text="weekday_stacked" />
      <WeekdayStacked border="default" compact date={cardHighlightNow} variant="expanded" />
    </Flex>
  </Flex>
)

export default Showcase
