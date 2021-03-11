import React from 'react'
import { render, screen } from '../utilities/test-utils'
import BreadCrumbs from './_bread_crumbs'
import BreadCrumbItem from './_bread_crumb_item'
import { Icon, Title } from '../'

it('should render bread crumbs', () => {
  const testId = 'breadCrumbs'
  render(
    <BreadCrumbs
        data={{ testid: testId }}
        name={name}
    >
      <Icon
          icon="home"
          size="1x"
      />
      <BreadCrumbItem
          dark
          href="/home"
      >
        <Title
            size="4"
            tag="span"
            text="Home"
        />
      </BreadCrumbItem>
    </BreadCrumbs>
  )
  const kit = screen.getByTestId(testId)
  const label = screen.getByText('Home')

  expect(kit).toHaveClass('pb_bread_crumbs_kit')
  expect(label).toHaveTextContent('Home')
})
