import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Title from './_title'

test('returns namespaced class name', () => {
    render(
        <Title
            data={{ testid: 'primary-test' }}
            text="Test colors"
        />
    )

    const kit = screen.getByTestId('primary-test')
    expect(kit).toHaveClass('pb_title_kit_size_3')
})

test('with thin font weight', () => {
    render(
        <Title
            bold={false}
            data={{ testid: 'primary-test' }}
            text="Test thin font weight"
        />
    )

    const kit = screen.getByTestId('primary-test')
    expect(kit).toHaveClass('pb_title_kit_size_3_thin')
})

test('with colors', () => {
    render(
        <Title
            color="success"
            data={{ testid: 'primary-test' }}
            text="Test colors"
        />
    )

    const kit = screen.getByTestId('primary-test')
    expect(kit).toHaveClass('pb_title_kit_size_3_success')
})

test('with responsive title', () => {
    render(
        <Title
            data={{ testid: 'primary-test' }}
            size={{ xs: "3", sm: "2", md: "1" }}
            text="Responsive Title"
        />
    )

    const kit = screen.getByTestId('primary-test')
    expect(kit).toHaveClass('pb_title_kit pb_title_kit_xs_3 pb_title_kit_sm_2 pb_title_kit_md_1')
})
