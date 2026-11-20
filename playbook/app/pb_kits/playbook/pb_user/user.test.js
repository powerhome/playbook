import React from 'react'
import { render, screen , cleanup} from '../utilities/test-utils'
import User from './_user'
import Caption from "../pb_caption/_caption"

test('subtitle prop adds subtitle text', () => {
  render(
    <User
        data={{ testid: 'test-subtitle' }}
        subtitle='test subtitle'
    />
  )

  expect(screen.getByTestId('test-subtitle')).toHaveTextContent('test subtitle')
})

test('subtitle prop accepts a node', () => {
  const TestCaption = <Caption text='test caption' />

  render(
    <User
        data={{ testid: 'test-subtitle-block' }}
        subtitle={TestCaption}
    />
  )

  expect(screen.getByTestId('test-subtitle-block')).toHaveTextContent('test caption')
})

test('bold prop applies correct styling when false', () => {
  render(
    <User
        bold={false}
        data={{ testid: 'test-bold-false' }}
        name="Anna Black"
    />
  )
  const titleElement = screen.getByText("Anna Black")
  expect(titleElement).toBeInTheDocument()

  expect(titleElement).toHaveClass('pb_title_kit pb_title_4 pb_title_thin')
})

test('align prop adds desired class', () => {
  [
    "left",
    "center",
    "right"
  ].forEach((alignProp) => {
    render(
      <User
          align={alignProp}
          data={{ testid: 'test-user-kit' }}
          name="Anna Black"
      />
    )
    const kit = screen.getByTestId('test-user-kit')
    expect(kit.className).toContain(`pb_user_kit_${alignProp}`)

    cleanup()
  })
})

test('avatar prop adds default avatar img', () => {
  render(
    <User
        avatar
        data={{ testid: 'test-user-kit' }}
    />
  )

  const container = screen.getByTestId('test-user-kit')
  const avatarWrapper = container.querySelector('.avatar_wrapper')

  expect(avatarWrapper).toBeInTheDocument()
  expect(avatarWrapper).toHaveClass('avatar_wrapper')
})

test('avatarUrl prop adds avatar img', () => {
  const avatarUrl = 'https://example.com/avatar.jpg'
  render(
    <User
        avatarUrl={avatarUrl}
        data={{ testid: 'test-user-kit' }}
    />
  )

  const container = screen.getByTestId('test-user-kit')
  const avatarImg = container.querySelector('img')

  expect(avatarImg).toBeInTheDocument()
  expect(avatarImg).toHaveAttribute('src', avatarUrl)
})

test('name prop adds name text', () => {
  const name = 'Anna Black'
  render(
    <User
        data={{ testid: 'test-name' }}
        name={name}
    />
  )

  const titleElement = screen.getByText(name)
  expect(titleElement).toBeInTheDocument()
})

test('nameStyle prop changes the typography kit', () => {
  const name = 'Anna Black'
  const kitTypes = ['body', 'caption', 'detail']

  kitTypes.forEach((typeKit) => {
    render(
      <User
          data={{ testid: 'test-user-kit' }}
          name={name}
          nameStyle={typeKit}
      />
    )

    const container = screen.getByTestId('test-user-kit')
    const subcomponent = container.querySelector(`[class*="pb_${typeKit}_kit"]`)

    expect(subcomponent).toBeInTheDocument()
    expect(subcomponent).toHaveTextContent(name)

    cleanup()
  })
})

test('orientation prop adds desired class', () => {
  [
    "horizontal",
    "vertical"
  ].forEach((orientation) => {
    render(
      <User
          data={{ testid: 'test-user-kit' }}
          name="Anna Black"
          orientation={orientation}
      />
    )

    const container = screen.getByTestId('test-user-kit')
    expect(container.className).toContain(orientation)

    cleanup()
  })
})

test('size prop adds desired class', () => {
  [
    "sm",
    "md",
    "lg"
  ].forEach((size) => {
    render(
      <User
          data={{ testid: 'test-user-kit' }}
          name="Anna Black"
          size={size}
      />
    )

    const container = screen.getByTestId('test-user-kit')
    expect(container.className).toContain(size)

    cleanup()
  })
})

test('title prop adds title text', () => {
  const title = 'Remodeling Consultant'
  render(
    <User
        data={{ testid: 'test-title' }}
        name="Anna Black"
        title={title}
    />
  )

  const titleElement = screen.getByText(title)
  expect(titleElement).toBeInTheDocument()
})

test('titleStyle prop changes the typography kit', () => {
  const title = 'Remodeling Consultant'
  const kitTypes = ['caption', 'detail']

  kitTypes.forEach((typeKit) => {
    render(
      <User
          data={{ testid: 'test-user-kit' }}
          name="Anna Black"
          title={title}
          titleStyle={typeKit}
      />
    )

    const container = screen.getByTestId('test-user-kit')
    const subcomponent = container.querySelector(`[class*="pb_${typeKit}_kit"]`)

    expect(subcomponent).toBeInTheDocument()
    expect(subcomponent).toHaveTextContent(title)

    cleanup()
  })
})

test('territory prop adds territory text', () => {
  const territory = 'PHI'
  render(
    <User
        data={{ testid: 'test-territory' }}
        name="Anna Black"
        territory={territory}
        title="Remodeling Consultant"
    />
  )

  const titleElement = screen.getByText(`${territory} • Remodeling Consultant`)
  expect(titleElement).toBeInTheDocument()
})

describe('status prop', () => {
  const testId = 'test-status'
  describe('status prop adds status indicator', () => {
    test('when avatarUrl present', () => {
      render(
        <User
            avatarUrl='https://example.com/avatar.jpg'
            data={{ testid: testId }}
            status='online'
        />
      )

      const userStatus = screen.getByTestId('test-status')
      const onlineStatus = userStatus.querySelector('.pb_online_status_kit')

      expect(onlineStatus).toBeInTheDocument()
    })
    test('when avatar props set to true', () => {
      render(
        <User
            avatar
            data={{ testid: testId }}
            status='online'
        />
      )

      const userStatus = screen.getByTestId('test-status')
      const onlineStatus = userStatus.querySelector('.pb_online_status_kit')

      expect(onlineStatus).toBeInTheDocument()
    })
  })
  describe('dark prop colors the status ring', () => {
    test('adds the dark class to the presence indicator', () => {
      render(
        <User
            avatar
            dark
            data={{ testid: testId }}
            status='online'
        />
      )

      const onlineStatus = screen.getByTestId(testId).querySelector('.pb_online_status_kit')

      expect(onlineStatus).toHaveClass('dark')
    })
    test('leaves the presence indicator light by default', () => {
      render(
        <User
            avatar
            data={{ testid: testId }}
            status='online'
        />
      )

      const onlineStatus = screen.getByTestId(testId).querySelector('.pb_online_status_kit')

      expect(onlineStatus).not.toHaveClass('dark')
    })
  })
  describe('stats prop does not add status indicator', () => {
    test('when avatar and avatarUrl not present', () => {
      render(
        <User
            data={{ testid: testId }}
            status='online'
        />
      )

      const userStatus = screen.getByTestId('test-status')
      const onlineStatus = userStatus.querySelector('.pb_online_status_kit')

      expect(onlineStatus).not.toBeInTheDocument()
    })
  })
})
