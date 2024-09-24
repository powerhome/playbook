import React from 'react'
import { render, screen } from '../utilities/test-utils'

import MultipleUsersStacked from './_multiple_users_stacked'

const testId = 'multipleUsersStacked'
const className = 'custom-class-name'
const nameUser1 = 'Patrick Welch'
const nameUser2 = 'Lucille Sanchez'
const imageUser1 = 'https://randomuser.me/api/portraits/men/9.jpg'
const imageUser2 = 'https://randomuser.me/api/portraits/women/6.jpg'

const MultipleUsersStackedDefault = () => {
    return (
        <MultipleUsersStacked
            aria={{ label: testId }}
            className={className}
            data={{ testid: testId }}
            users={[
                {
                    name: nameUser1,
                    imageUrl: imageUser1,
                    imageAlt: nameUser1,
                },
                {
                    name: nameUser2,
                    imageUrl: imageUser2,
                    imageAlt: nameUser2,
                },
            ]}
        />
    )
}

test('should render alt names and images', () => {
    render(<MultipleUsersStackedDefault />)
    
    const image1 = screen.getByAltText(nameUser1)
    const image2 = screen.getByAltText(nameUser2)

    expect(image1).toHaveAttribute('src', imageUser1)
    expect(image2).toHaveAttribute('src', imageUser2)
})

test('should pass data prop', () => {
    render(<MultipleUsersStackedDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toBeInTheDocument()
})

test('should pass className prop', () => {
    render(<MultipleUsersStackedDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(className)
})

test('should pass aria prop', () => {
    render(<MultipleUsersStackedDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveAttribute('aria-label', testId)
})

const MultipleUsersStackedSingleBubble = () => {
    return (
        <MultipleUsersStacked
            aria={{ label: testId }}
            className={className}
            data={{ testid: testId }}
            users={[
                {
                    name: "user1",
                    imageUrl: "imageUser1",
                    imageAlt: "nameUser1",
                }
            ]}
            variant="bubble"
        />
    )
}

test('should have a single bubble', () => {
    render(<MultipleUsersStackedSingleBubble />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass("pb_multiple_users_stacked_kit_single_bubble")

    const firstItem = kit.querySelector('.first_item');
    expect(firstItem).toBeInTheDocument();
})

const MultipleUsersStackedDoubleBubble = () => {
    return (
        <MultipleUsersStacked
            aria={{ label: testId }}
            className={className}
            data={{ testid: testId }}
            users={[
                {
                    name: "user1",
                    imageUrl: "imageUser1",
                    imageAlt: "nameUser1",
                },
                {
                    name: "user2",
                    imageUrl: "imageUser2",
                    imageAlt: "nameUser2",
                },
            ]}
            variant="bubble"
        />
    )
}

test('should have a double bubble', () => {
    render(<MultipleUsersStackedDoubleBubble />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass("pb_multiple_users_stacked_kit_bubble")

    const firstItem = kit.querySelector('.first_item');
    expect(firstItem).toBeInTheDocument();

    const secondItem = kit.querySelector('.second_item');
    expect(secondItem).toBeInTheDocument();
})

const MultipleUsersStackedTripleBubble = () => {
    return (
        <MultipleUsersStacked
            aria={{ label: testId }}
            className={className}
            data={{ testid: testId }}
            users={[
                {
                    name: "user1",
                    imageUrl: "imageUser1",
                    imageAlt: "nameUser1",
                },
                {
                    name: "user2",
                    imageUrl: "imageUser2",
                    imageAlt: "nameUser2",
                },
                {
                    name: "user3",
                    imageUrl: "imageUser3",
                    imageAlt: "nameUser3",
                },
            ]}
            variant="bubble"
        />
    )
}

test('should have a triple bubble', () => {
    render(<MultipleUsersStackedTripleBubble />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass("pb_multiple_users_stacked_kit_bubble")

    const firstItem = kit.querySelector('.first_item');
    expect(firstItem).toBeInTheDocument();
    expect(firstItem).toHaveClass("triple_bubble")

    const secondItem = kit.querySelector('.second_item');
    expect(secondItem).toBeInTheDocument();
    expect(secondItem).toHaveClass("triple_bubble")

    const thirdItem = kit.querySelector('.third_item');
    expect(thirdItem).toBeInTheDocument();
})

const MultipleUsersStackedQuadrupleBubble = () => {
    return (
        <MultipleUsersStacked
            aria={{ label: testId }}
            className={className}
            data={{ testid: testId }}
            users={[
                {
                    name: "user1",
                    imageUrl: "imageUser1",
                    imageAlt: "nameUser1",
                },
                {
                    name: "user2",
                    imageUrl: "imageUser2",
                    imageAlt: "nameUser2",
                },
                {
                    name: "user3",
                    imageUrl: "imageUser3",
                    imageAlt: "nameUser3",
                },
                {
                    name: "user4",
                    imageUrl: "imageUser4",
                    imageAlt: "nameUser4",
                },
                {
                    name: "user5",
                    imageUrl: "imageUser5",
                    imageAlt: "nameUser5",
                },
            ]}
            variant="bubble"
        />
    )
}

test('should have a quadruple bubble', () => {
    render(<MultipleUsersStackedQuadrupleBubble />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass("pb_multiple_users_stacked_kit_bubble")

    const firstItem = kit.querySelector('.first_item');
    expect(firstItem).toBeInTheDocument();
    expect(firstItem).toHaveClass("quadruple_bubble")

    const secondItem = kit.querySelector('.second_item');
    expect(secondItem).toBeInTheDocument();
    expect(secondItem).toHaveClass("quadruple_bubble")

    const thirdItem = kit.querySelector('.third_item');
    expect(thirdItem).toBeInTheDocument();
    expect(thirdItem).toHaveClass("quadruple_bubble")

    const fourthItem = kit.querySelector('.fourth_item');
    expect(fourthItem).toBeInTheDocument();
})