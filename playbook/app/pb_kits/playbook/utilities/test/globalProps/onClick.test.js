import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import ButtonToolbar from '../../../pb_button_toolbar/_button_toolbar'
import Card from '../../../pb_card/_card'
import Flex from '../../../pb_flex/_flex'
import FormPill from '../../../pb_form_pill/_form_pill'
import LabelPill from '../../../pb_label_pill/_label_pill'
import OnlineStatus from '../../../pb_online_status/_online_status'
import Pill from '../../../pb_pill/_pill'
import Source from '../../../pb_source/_source'
import StarRating from '../../../pb_star_rating/_star_rating'
import StatChange from '../../../pb_stat_change/_stat_change'
import Title from '../../../pb_title/_title'
import { globalProps } from '../../globalProps'
import { globalEventProps } from '../../globalEventProps'

const optedInKits = [
  { Kit: Body, name: 'Body', extraProps: { text: 'Test' } },
  { Kit: Card, name: 'Card', extraProps: { children: 'Test' } },
  { Kit: Flex, name: 'Flex', extraProps: { children: 'Test' } },
  { Kit: Title, name: 'Title', extraProps: { text: 'Test' } },
  { Kit: LabelPill, name: 'LabelPill', extraProps: { label: 'Label', pillValue: '1' } },
  { Kit: Pill, name: 'Pill', extraProps: { text: 'Test' } },
  { Kit: OnlineStatus, name: 'OnlineStatus', extraProps: {} },
  { Kit: Source, name: 'Source', extraProps: { source: 'Test', type: 'retail' } },
  {
    Kit: StatChange,
    name: 'StatChange',
    extraProps: { value: 12 },
    testIdViaHtmlOptions: true,
  },
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
    optedInKits.forEach(({ Kit, name, extraProps, testIdViaHtmlOptions }) => {
      test(`fires on ${name}`, () => {
        const onClick = jest.fn()
        const testId = `onclick-${name.toLowerCase()}`
        const testIdProps = testIdViaHtmlOptions
          ? { htmlOptions: { 'data-testid': testId } }
          : { data: { testid: testId } }
        render(
          <Kit
              {...testIdProps}
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

    test('StatChange first-class onClick wins over htmlOptions.onClick', () => {
      const htmlOnClick = jest.fn()
      const firstClassOnClick = jest.fn()
      render(
        <StatChange
            htmlOptions={{ 'data-testid': 'onclick-stat-change-precedence', onClick: htmlOnClick }}
            onClick={firstClassOnClick}
            value={12}
        />
      )

      fireEvent.click(screen.getByTestId('onclick-stat-change-precedence'))
      expect(firstClassOnClick).toHaveBeenCalledTimes(1)
      expect(htmlOnClick).not.toHaveBeenCalled()
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
})
