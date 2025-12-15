import React from 'react'
import { render, screen } from '../utilities/test-utils'
import Contact from './_contact'

test('returns namespaced class name', () => {
  render(
    <Contact
        contactDetail="Cell"
        contactType="cell"
        contactValue="349-185-9988"
        data={{ testid: 'class-name-test' }}
    />
  )

  const kit = screen.getByTestId('class-name-test')
  expect(kit).toHaveClass('pb_contact_kit')
})

test('returns correct icon', () => {
 render(
    <>
      <Contact
          contactDetail="Cell"
          contactType="cell"
          contactValue="349-185-9988"
          data={{ testid: 'test-cell' }}
      />
      <Contact
          contactDetail="Home"
          contactValue="5555555555"
          data={{ testid: 'test-home' }}
      />
      <Contact
          contactDetail="Work"
          contactType="work"
          contactValue="3245627482"
          data={{ testid: 'test-work' }}
      />
      <Contact
          contactDetail="Work-Cell"
          contactType="work-cell"
          contactValue="3245627482"
          data={{ testid: 'test-work-cell' }}
      />
      <Contact
          contactDetail="Email"
          contactType="email"
          contactValue="your.email@powerhrg.com"
          data={{ testid: 'test-email' }}
      />
      <Contact
          contactDetail="Wrong-Phone"
          contactType="wrong-phone"
          contactValue="3245627482"
          data={{ testid: 'test-wrong-phone' }}
      />
      <Contact
          contactDetail="Wrong-Type"
          contactType="wrong-type"
          contactValue="3245627482"
          data={{ testid: 'test-wrong-type' }}
      />
      <Contact
          contactDetail="Ext"
          contactType='extension'
          contactValue="1234"
          data={{ testid: 'test-extension' }}
      />
      <Contact
          contactDetail="International"
          contactType="international"
          contactValue="+44 20 7946 0958"
          data={{ testid: 'test-international' }}
      />
      <Contact
          contactDetail=""
          contactType=""
          contactValue="3245627482"
          data={{ testid: 'test-empty' }}
      />
    </>
  )

  expect(screen.getByTestId('test-cell').querySelector('.pb_custom_icon')).toBeInTheDocument()
  expect(screen.getByTestId('test-home').querySelector('.pb_custom_icon')).toBeInTheDocument()
  expect(screen.getByTestId('test-work').querySelector('.pb_custom_icon')).toBeInTheDocument()
  expect(screen.getByTestId('test-work-cell').querySelector('.pb_custom_icon')).toBeInTheDocument()
  expect(screen.getByTestId('test-email').querySelector('.pb_custom_icon')).toBeInTheDocument()
  expect(screen.getByTestId('test-wrong-phone').querySelector('.pb_custom_icon')).toBeInTheDocument()
  expect(screen.getByTestId('test-wrong-type').querySelector('.pb_custom_icon')).toBeInTheDocument()
  expect(screen.getByTestId('test-extension').querySelector('.pb_custom_icon')).toBeInTheDocument()
  expect(screen.getByTestId('test-international').querySelector('.pb_custom_icon')).toBeInTheDocument()
  expect(screen.getByTestId('test-empty').querySelector('.pb_custom_icon')).toBeInTheDocument()
})

test("not compliant values return null in US phone related contact types", () => {
  const notCompliantValues = [
    "349-185-998223",
    "349-1858",
    "",
    "2",
    "string",
  ]
  const contactTypes = [
    "cell",
    "work",
    "work-cell",
    "wrong-number",
    "wrong-phone",
    "wrong-type",
    "extension",
  ]

  const buildData = contactTypes.reduce((response, type) => {
    notCompliantValues.forEach((value) => response.push({ type, value }))
    return response
  }, [])

  const { rerender } = render(
    <Contact
        contactType=""
        contactValue=""
        data={{ testid: `contact-kit-null-test` }}
    />
  )
  buildData.map(({ type, value }) => {
    rerender(
      <Contact
          contactType={type}
          contactValue={value}
          data={{ testid: `contact-kit-null-test` }}
      />
    )
    expect(screen.getByTestId("contact-kit-null-test")).toHaveTextContent(
      "null"
    )
  })
})

test('international contact type preserves original format', () => {
  render(
    <Contact
        contactType="international"
        contactValue="+44 20 7946 0958"
        data={{ testid: 'test-international-format' }}
    />
  )

  const kit = screen.getByTestId('test-international-format')
  expect(kit).toHaveTextContent('+44 20 7946 0958')
})

test('iconEnabled prop hides icon when false', () => {
  render(
    <>
      <Contact
          contactType="home"
          contactValue="2125551234"
          data={{ testid: 'test-with-icon' }}
          iconEnabled
      />
      <Contact
          contactType="home"
          contactValue="2125551234"
          data={{ testid: 'test-without-icon' }}
          iconEnabled={false}
      />
    </>
  )

  // With icon enabled, should have icon
  expect(screen.getByTestId('test-with-icon').querySelector('.pb_custom_icon')).toBeInTheDocument()
  
  // Without icon, should not have icon
  expect(screen.getByTestId('test-without-icon').querySelector('.pb_custom_icon')).not.toBeInTheDocument()
  
  // But should still have the formatted phone number
  expect(screen.getByTestId('test-without-icon')).toHaveTextContent('(212) 555-1234')
})

test('unstyled prop renders without Body wrapper', () => {
  render(
    <>
      <Contact
          contactType="home"
          contactValue="2125551234"
          data={{ testid: 'test-styled' }}
      />
      <Contact
          contactType="home"
          contactValue="2125551234"
          data={{ testid: 'test-unstyled' }}
          unstyled
      />
    </>
  )

  // Styled version should have Body wrapper with pb_contact_kit class
  const styled = screen.getByTestId('test-styled')
  const styledBody = styled.querySelector('span.pb_contact_kit')
  expect(styledBody).toBeInTheDocument()
  expect(styledBody).toHaveTextContent('(212) 555-1234')

  // Unstyled version should be a span without Body wrapper
  const unstyled = screen.getByTestId('test-unstyled')
  expect(unstyled.tagName).toBe('SPAN')
  expect(unstyled.querySelector('span.pb_contact_kit')).not.toBeInTheDocument()
  expect(unstyled).toHaveTextContent('(212) 555-1234')
})

test('unstyled and iconEnabled work together', () => {
  render(
    <Contact
        contactType="home"
        contactValue="2125551234"
        data={{ testid: 'test-unstyled-no-icon' }}
        iconEnabled={false}
        unstyled
    />
  )

  const kit = screen.getByTestId('test-unstyled-no-icon')
  expect(kit.tagName).toBe('SPAN')
  expect(kit.querySelector('.pb_custom_icon')).not.toBeInTheDocument()
  expect(kit.querySelector('.pb_body_kit')).not.toBeInTheDocument()
  expect(kit).toHaveTextContent('(212) 555-1234')
})
