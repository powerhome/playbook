import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import Background from '../../../pb_background/_background'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import ButtonToolbar from '../../../pb_button_toolbar/_button_toolbar'
import Caption from '../../../pb_caption/_caption'
import Card from '../../../pb_card/_card'
import Container from '../../../pb_container/_container'
import Currency from '../../../pb_currency/_currency'
import DashboardValue from '../../../pb_dashboard_value/_dashboard_value'
import Detail from '../../../pb_detail/_detail'
import Flex from '../../../pb_flex/_flex'
import FormPill from '../../../pb_form_pill/_form_pill'
import Highlight from '../../../pb_highlight/_highlight'
import IconStatValue from '../../../pb_icon_stat_value/_icon_stat_value'
import IconValue from '../../../pb_icon_value/_icon_value'
import LabelValue from '../../../pb_label_value/_label_value'
import Legend from '../../../pb_legend/_legend'
import Message from '../../../pb_message/_message'
import MultipleUsers from '../../../pb_multiple_users/_multiple_users'
import MultipleUsersStacked from '../../../pb_multiple_users_stacked/_multiple_users_stacked'
import ProgressStep from '../../../pb_progress_step/_progress_step'
import ProgressStepItem from '../../../pb_progress_step/_progress_step_item'
import StarRating from '../../../pb_star_rating/_star_rating'
import StatValue from '../../../pb_stat_value/_stat_value'
import Timeline from '../../../pb_timeline/_timeline'
import Title from '../../../pb_title/_title'
import TitleCount from '../../../pb_title_count/_title_count'
import TitleDetail from '../../../pb_title_detail/_title_detail'
import { globalProps } from '../../globalProps'
import { globalEventProps } from '../../globalEventProps'

const optedInKits = [
  { Kit: Background, name: 'Background', extraProps: { children: 'Test' } },
  { Kit: Body, name: 'Body', extraProps: { text: 'Test' } },
  { Kit: Caption, name: 'Caption', extraProps: { text: 'Test' } },
  { Kit: Card, name: 'Card', extraProps: { children: 'Test' } },
  { Kit: Container, name: 'Container', extraProps: { children: 'Test' } },
  { Kit: Currency, name: 'Currency', extraProps: { amount: '100.00', label: 'Total' } },
  { Kit: DashboardValue, name: 'DashboardValue', extraProps: { statLabel: 'Sales', statValue: { value: 100 } } },
  { Kit: Detail, name: 'Detail', extraProps: { text: 'Test' } },
  { Kit: Flex, name: 'Flex', extraProps: { children: 'Test' } },
  { Kit: Highlight, name: 'Highlight', extraProps: { text: 'Test' } },
  { Kit: IconStatValue, name: 'IconStatValue', extraProps: { icon: 'heart', text: 'Likes', value: 42 } },
  { Kit: IconValue, name: 'IconValue', extraProps: { icon: 'heart', text: 'Favorites' } },
  { Kit: LabelValue, name: 'LabelValue', extraProps: { label: 'Label', value: 'Value' } },
  { Kit: Legend, name: 'Legend', extraProps: { text: 'Series A' } },
  { Kit: Message, name: 'Message', extraProps: { label: 'Sender', message: 'Test' } },
  { Kit: MultipleUsers, name: 'MultipleUsers', extraProps: { users: [{ name: 'Pat' }] } },
  { Kit: MultipleUsersStacked, name: 'MultipleUsersStacked', extraProps: { users: [{ name: 'Pat' }] } },
  { Kit: ProgressStepItem, name: 'ProgressStepItem', extraProps: { children: 'Step', status: 'active' } },
  { Kit: StatValue, name: 'StatValue', extraProps: { unit: 'mg', value: 100 } },
  { Kit: Timeline.Item, name: 'TimelineItem', extraProps: { children: 'Event' } },
  { Kit: Title, name: 'Title', extraProps: { text: 'Test' } },
  { Kit: TitleCount, name: 'TitleCount', extraProps: { count: 12, title: 'Items' } },
  { Kit: TitleDetail, name: 'TitleDetail', extraProps: { detail: 'Detail', title: 'Title' } },
]

describe('onClick GlobalEventProps', () => {
  describe('globalEventProps helper', () => {
    test('returns onClick when provided', () => {
      const onClick = jest.fn()
      expect(globalEventProps({ onClick })).toEqual({ onClick })
    })

    test('returns an empty object when onClick is absent', () => {
      expect(globalEventProps({})).toEqual({})
    })

    test('does not generate CSS classes', () => {
      const onClick = jest.fn()
      expect(globalProps({ onClick })).toBe('')
    })
  })

  describe('attaches to the kit root element', () => {
    optedInKits.forEach(({ Kit, name, extraProps }) => {
      test(`fires on ${name}`, () => {
        const onClick = jest.fn()
        const testId = `onclick-${name.toLowerCase()}`
        render(
          <Kit
              data={{ testid: testId }}
              htmlOptions={{ 'data-testid': testId }}
              onClick={onClick}
              {...extraProps}
          />
        )

        fireEvent.click(screen.getByTestId(testId))
        expect(onClick).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('conflict with htmlOptions.onClick', () => {
    test('first-class onClick wins over htmlOptions.onClick', () => {
      const htmlOnClick = jest.fn()
      const firstClassOnClick = jest.fn()
      render(
        <Card
            data={{ testid: 'onclick-precedence' }}
            htmlOptions={{ onClick: htmlOnClick }}
            onClick={firstClassOnClick}
        >
          {'Test'}
        </Card>
      )

      fireEvent.click(screen.getByTestId('onclick-precedence'))
      expect(firstClassOnClick).toHaveBeenCalledTimes(1)
      expect(htmlOnClick).not.toHaveBeenCalled()
    })

    test('htmlOptions.onClick still works when first-class onClick is omitted', () => {
      const htmlOnClick = jest.fn()
      render(
        <Body
            data={{ testid: 'onclick-html-options' }}
            htmlOptions={{ onClick: htmlOnClick }}
            text="Test"
        />
      )

      fireEvent.click(screen.getByTestId('onclick-html-options'))
      expect(htmlOnClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('kit-specific onClick remains unchanged', () => {
    test('Button onClick still fires on the button element', () => {
      const onClick = jest.fn()
      render(
        <Button
            data={{ testid: 'onclick-button' }}
            onClick={onClick}
            text="Click"
        />
      )

      fireEvent.click(screen.getByTestId('onclick-button'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    test('Button explicit onClick overrides htmlOptions.onClick', () => {
      const htmlOnClick = jest.fn()
      const kitOnClick = jest.fn()
      render(
        <Button
            data={{ testid: 'onclick-button-precedence' }}
            htmlOptions={{ onClick: htmlOnClick }}
            onClick={kitOnClick}
            text="Click"
        />
      )

      fireEvent.click(screen.getByTestId('onclick-button-precedence'))
      expect(kitOnClick).toHaveBeenCalledTimes(1)
      expect(htmlOnClick).not.toHaveBeenCalled()
    })

    test('Button with link ignores kit onClick and keeps htmlOptions.onClick', () => {
      const kitOnClick = jest.fn()
      const htmlOnClick = jest.fn()
      render(
        <Button
            data={{ testid: 'onclick-button-link' }}
            htmlOptions={{ onClick: htmlOnClick }}
            link="#test"
            onClick={kitOnClick}
            text="Link"
        />
      )

      fireEvent.click(screen.getByTestId('onclick-button-link'))
      expect(htmlOnClick).toHaveBeenCalledTimes(1)
      expect(kitOnClick).not.toHaveBeenCalled()
    })

    test('FormPill onClick still fires only from the close control', () => {
      const onClick = jest.fn()
      render(
        <FormPill
            data={{ testid: 'onclick-form-pill' }}
            onClick={onClick}
            text="Tag"
        />
      )

      const pill = screen.getByTestId('onclick-form-pill')
      fireEvent.click(pill)
      expect(onClick).not.toHaveBeenCalled()

      fireEvent.click(pill.querySelector('.pb_form_pill_close'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    test('StarRating onClick still receives the star value, not a mouse event', () => {
      const onClick = jest.fn()
      render(
        <StarRating
            data={{ testid: 'onclick-star-rating' }}
            onClick={onClick}
            rating={0}
            variant="interactive"
        />
      )

      fireEvent.click(screen.getByLabelText('Rate 1 out of 5 stars'))
      expect(onClick).toHaveBeenCalledWith(1)
      expect(onClick.mock.calls[0][0]).toBe(1)
    })

    test('ButtonToolbar typed onClick is still not attached to the root', () => {
      const onClick = jest.fn()
      render(
        <ButtonToolbar
            data={{ testid: 'onclick-button-toolbar' }}
            onClick={onClick}
            text="Toolbar"
        />
      )

      fireEvent.click(screen.getByTestId('onclick-button-toolbar'))
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('event bubbling', () => {
    test('child Button click also fires parent Card onClick', () => {
      const cardOnClick = jest.fn()
      const buttonOnClick = jest.fn()
      render(
        <Card
            data={{ testid: 'onclick-bubble-card' }}
            onClick={cardOnClick}
        >
          <Button
              data={{ testid: 'onclick-bubble-button' }}
              onClick={buttonOnClick}
              text="Inner"
          />
        </Card>
      )

      fireEvent.click(screen.getByTestId('onclick-bubble-button'))
      expect(buttonOnClick).toHaveBeenCalledTimes(1)
      expect(cardOnClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('value and summary kits fire once from nested regions', () => {
    test('Currency label and value regions each invoke onClick once', () => {
      const onClick = jest.fn()
      const { container } = render(
        <Currency
            amount="42.00"
            data={{ testid: 'onclick-currency-regions' }}
            label="Balance"
            onClick={onClick}
        />
      )

      fireEvent.click(screen.getByText('Balance'))
      fireEvent.click(container.querySelector('.pb_currency_value'))
      expect(onClick).toHaveBeenCalledTimes(2)
    })

    test('Currency unstyled branch still attaches root onClick', () => {
      const onClick = jest.fn()
      render(
        <Currency
            amount="10.00"
            data={{ testid: 'onclick-currency-unstyled' }}
            label="Cash"
            onClick={onClick}
            unstyled
        />
      )

      fireEvent.click(screen.getByTestId('onclick-currency-unstyled'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    test('LabelValue default and details variants fire once', () => {
      const defaultOnClick = jest.fn()
      const detailsOnClick = jest.fn()
      render(
        <>
          <LabelValue
              data={{ testid: 'onclick-label-value-default' }}
              label="Status"
              onClick={defaultOnClick}
              value="Open"
          />
          <LabelValue
              data={{ testid: 'onclick-label-value-details' }}
              description="Meta"
              icon="calendar"
              label="Event"
              onClick={detailsOnClick}
              title="Kickoff"
              variant="details"
          />
        </>
      )

      fireEvent.click(screen.getByText('Status'))
      fireEvent.click(screen.getByText('Open'))
      expect(defaultOnClick).toHaveBeenCalledTimes(2)

      fireEvent.click(screen.getByText('Event'))
      fireEvent.click(screen.getByText('Kickoff'))
      expect(detailsOnClick).toHaveBeenCalledTimes(2)
    })

    test('IconStatValue icon and value regions fire once each', () => {
      const onClick = jest.fn()
      const { container } = render(
        <IconStatValue
            data={{ testid: 'onclick-icon-stat-value' }}
            icon="heart"
            onClick={onClick}
            text="Likes"
            value={7}
        />
      )

      fireEvent.click(container.querySelector('[class*="pb_icon_circle_kit"]'))
      fireEvent.click(screen.getByText('7'))
      fireEvent.click(screen.getByText('Likes'))
      expect(onClick).toHaveBeenCalledTimes(3)
    })

    test('DashboardValue nested StatValue does not duplicate the handler', () => {
      const onClick = jest.fn()
      render(
        <DashboardValue
            data={{ testid: 'onclick-dashboard-value' }}
            onClick={onClick}
            statLabel="Revenue"
            statValue={{ unit: 'USD', value: 99 }}
        />
      )

      fireEvent.click(screen.getByText('Revenue'))
      fireEvent.click(screen.getByText('99'))
      expect(onClick).toHaveBeenCalledTimes(2)
    })
  })

  describe('whole-kit handlers preserve nested content behavior', () => {
    test('Message nested content fires once with the Message root as currentTarget', () => {
      const currentTargets = []
      const onClick = jest.fn((event) => currentTargets.push(event.currentTarget))
      render(
        <Message
            data={{ testid: 'onclick-message' }}
            label="Sender"
            message="Click this message"
            onClick={onClick}
        />
      )

      fireEvent.click(screen.getByText('Click this message'))

      expect(onClick).toHaveBeenCalledTimes(1)
      expect(currentTargets[0]).toBe(screen.getByTestId('onclick-message'))
    })

    test('Message child handlers still fire and bubble once to the Message root', () => {
      const messageOnClick = jest.fn()
      const buttonOnClick = jest.fn()
      render(
        <Message
            label="Sender"
            message="Message"
            onClick={messageOnClick}
        >
          <Button
              onClick={buttonOnClick}
              text="Reply"
          />
        </Message>
      )

      fireEvent.click(screen.getByRole('button', { name: 'Reply' }))

      expect(buttonOnClick).toHaveBeenCalledTimes(1)
      expect(messageOnClick).toHaveBeenCalledTimes(1)
    })

    test('MultipleUsers tooltip avatar fires once with the kit root as currentTarget', () => {
      const currentTargets = []
      const onClick = jest.fn((event) => currentTargets.push(event.currentTarget))
      render(
        <MultipleUsers
            data={{ testid: 'onclick-multiple-users' }}
            onClick={onClick}
            users={[{ imageUrl: 'pat.jpg', name: 'Pat', tooltip: 'Pat tooltip' }]}
            withTooltip
        />
      )

      fireEvent.click(screen.getByAltText('Pat'))

      expect(onClick).toHaveBeenCalledTimes(1)
      expect(currentTargets[0]).toBe(screen.getByTestId('onclick-multiple-users'))
    })

    test('MultipleUsers overflow count fires the whole-kit handler once', () => {
      const onClick = jest.fn()
      render(
        <MultipleUsers
            maxDisplayedUsers={2}
            onClick={onClick}
            users={[
              { imageUrl: 'pat.jpg', name: 'Pat' },
              { name: 'Sam' },
              { name: 'Alex' },
            ]}
        />
      )

      fireEvent.click(screen.getByText('+2'))

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    test('MultipleUsersStacked avatar and overflow badge each fire once from the root', () => {
      const currentTargets = []
      const onClick = jest.fn((event) => currentTargets.push(event.currentTarget))
      render(
        <MultipleUsersStacked
            data={{ testid: 'onclick-multiple-users-stacked' }}
            onClick={onClick}
            users={[
              { imageUrl: 'pat.jpg', name: 'Pat' },
              { name: 'Sam' },
              { name: 'Alex' },
            ]}
        />
      )

      fireEvent.click(screen.getByAltText('Pat'))
      fireEvent.click(screen.getByText('+2'))

      expect(onClick).toHaveBeenCalledTimes(2)
      expect(currentTargets).toEqual([
        screen.getByTestId('onclick-multiple-users-stacked'),
        screen.getByTestId('onclick-multiple-users-stacked'),
      ])
    })
  })

  describe('item kits isolate siblings and identify currentTarget', () => {
    test('Timeline.Item siblings stay isolated', () => {
      let currentTarget = null
      const firstOnClick = jest.fn((event) => {
        currentTarget = event.currentTarget
      })
      const secondOnClick = jest.fn()
      render(
        <Timeline>
          <Timeline.Item
              htmlOptions={{ 'data-testid': 'onclick-timeline-item-1' }}
              onClick={firstOnClick}
          >
            {'Alpha'}
          </Timeline.Item>
          <Timeline.Item
              htmlOptions={{ 'data-testid': 'onclick-timeline-item-2' }}
              onClick={secondOnClick}
          >
            {'Beta'}
          </Timeline.Item>
        </Timeline>
      )

      const firstItem = screen.getByTestId('onclick-timeline-item-1')
      fireEvent.click(firstItem)
      expect(firstOnClick).toHaveBeenCalledTimes(1)
      expect(secondOnClick).not.toHaveBeenCalled()
      expect(currentTarget).toBe(firstItem)
    })

    test('ProgressStepItem siblings stay isolated', () => {
      let currentTarget = null
      const firstOnClick = jest.fn((event) => {
        currentTarget = event.currentTarget
      })
      const secondOnClick = jest.fn()
      render(
        <ProgressStep>
          <ProgressStepItem
              data={{ testid: 'onclick-progress-step-1' }}
              onClick={firstOnClick}
              status="complete"
          >
            {'Ordered'}
          </ProgressStepItem>
          <ProgressStepItem
              data={{ testid: 'onclick-progress-step-2' }}
              onClick={secondOnClick}
              status="active"
          >
            {'Shipped'}
          </ProgressStepItem>
        </ProgressStep>
      )

      const firstItem = screen.getByTestId('onclick-progress-step-1')
      fireEvent.click(firstItem)
      expect(firstOnClick).toHaveBeenCalledTimes(1)
      expect(secondOnClick).not.toHaveBeenCalled()
      expect(currentTarget).toBe(firstItem)
    })

    test('Legend attaches once on its outer root', () => {
      let currentTarget = null
      const onClick = jest.fn((event) => {
        currentTarget = event.currentTarget
      })
      render(
        <Legend
            data={{ testid: 'onclick-legend' }}
            onClick={onClick}
            text="Series A"
        />
      )

      const legend = screen.getByTestId('onclick-legend')
      fireEvent.click(screen.getByText('Series A'))
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(currentTarget).toBe(legend)
    })
  })
})
