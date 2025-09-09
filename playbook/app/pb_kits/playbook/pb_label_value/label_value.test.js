import React from 'react'
import { render, screen } from '../utilities/test-utils'

import LabelValue from './_label_value'

const testId = "labelvalue-kit";
jest.useFakeTimers()

describe("LabelValue Kit", () => {
    test("renders LabelValue classname", () => {
        render(
            <LabelValue
                data={{ testid: testId }}
                label="Role"
                value="Administrator, Moderator"
            />
        )
        const kit = screen.getByTestId(testId)
        expect(kit).toHaveClass("pb_label_value_kit")
    })

    test("renders label correctly", () => {
        render(
            <LabelValue
                data={{ testid: testId }}
                label="Role"
                value="Administrator, Moderator"
            />
        )
        const kit = screen.getByTestId(testId)
        const text = kit.querySelector(".pb_caption_kit_md")
        expect(text.textContent).toEqual("Role")
    })

    test("renders value correctly", () => {
        render(
            <LabelValue
                data={{ testid: testId }}
                label="Role"
                value="Administrator, Moderator"
            />
        )
        const kit = screen.getByTestId(testId)
       const text = kit.querySelector(".pb_body_kit")
        expect(text.textContent).toEqual("Administrator, Moderator")
    })

    test("renders icon if included with details variant", () => {
        render(
            <LabelValue
                data={{ testid: testId }}
                icon="truck"
                label="Installer"
                title="JD Installations LLC"
                variant="details"
            />
        )
        const kit = screen.getByTestId(testId)
        const icon = kit.querySelector(".pb_custom_icon")
        expect(icon).toBeInTheDocument()
    })

    test("renders title if included with details variant", () => {
        render(
            <LabelValue
                data={{ testid: testId }}
                icon="truck"
                label="Installer"
                title="JD Installations LLC"
                variant="details"
            />
        )
        const kit = screen.getByTestId(testId)
        const text = kit.querySelector(".pb_title_kit.pb_title_4")
        expect(text.textContent).toEqual("JD Installations LLC")
    })

    test("renders date if included with details variant", () => {
        render(
            <LabelValue
                data={{ testid: testId }}
                date={new Date('18 Nov 2019')}
                description="33-12345"
                icon="home"
                label="Project"
                title="Jefferson-Smith"
                variant="details"
            />
        )
        const text = screen.getByText("11/18", {exact: false})
        expect(text).toBeInTheDocument()
    })

    test("renders title if included with details variant", () => {
        render(
            <LabelValue
                active
                data={{ testid: testId }}
                icon="truck"
                label="Installer"
                title="JD Installations LLC"
                variant="details"
            />
        )
        const kit = screen.getByTestId(testId)
        const activeProp = kit.querySelector(".pb_title_kit.pb_title_4.pb_title_link")
        expect(activeProp).toBeInTheDocument()
    })
})