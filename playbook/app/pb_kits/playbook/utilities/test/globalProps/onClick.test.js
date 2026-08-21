import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import Body from '../../../pb_body/_body'
import Button from '../../../pb_button/_button'
import ButtonToolbar from '../../../pb_button_toolbar/_button_toolbar'
import Card from '../../../pb_card/_card'
import Flex from '../../../pb_flex/_flex'
import FormPill from '../../../pb_form_pill/_form_pill'
import StarRating from '../../../pb_star_rating/_star_rating'
import Title from '../../../pb_title/_title'
import { globalEventProps, globalProps } from '../../globalProps'

const pocKits = [
  { Kit: Body, name: 'Body', extraProps: { text: 'Test' } },
  { Kit: Card, name: 'Card', extraProps: { children: 'Test' } },
  { Kit: Flex, name: 'Flex', extraProps: { children: 'Test' } },
  { Kit: Title, name: 'Title', extraProps: { text: 'Test' } },
]

describe('onClick global event prop (POC)', () => {
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
    pocKits.forEach(({ Kit, name, extraProps }) => {
      test(`fires on ${name}`, () => {
        const onClick = jest.fn()
        const testId = `onclick-poc-${name.toLowerCase()}`
        render(
          <Kit
              data={{ testid: testId }}
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
})
