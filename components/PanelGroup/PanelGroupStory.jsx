import React from "react"
import Icon from "../Icon/Icon"
import { boolean, text, select } from "@storybook/addon-knobs"

import Text from "../Text/Text"
import PanelGroup from "./PanelGroup"

function ValidationComplete() {
  return (
    <span className="text-power-green text-small font-weight-normal">
      {'Complete '}
      <Icon name="check-circle" />
    </span>
  )
}

function ValidationIncomplete() {
  return (
    <span className="text-power-red text-small font-weight-normal">
      {'Not Complete '}
      <Icon name="exclamation-circle" />
    </span>
  )
}

const userIcon = (
  <Icon name="user" />
)

const largeUserIcon = (
  <Icon name="user-circle" size="2x" />
)

const phoneIcon = (
  <Icon name="phone" />
)

const homeIcon = (
  <Icon name="home" />
)

const dollarIcon = (
  <Icon name="usd-circle" />
)

export default function PanelGroupStory(stories) {
  stories.add("PanelGroup", () => {
    const outerActivePanelOptions = {
      ["main-applicant"]: "Main Applicant",
      ["co-applicant"]: "Co-Applicant",
    }

    const innerActivePanelOptions = {
      ["application-info"]: "Application Info",
      ["contact-info"]: "Contact Information",
      ["income-sources"]: "Income Source",
      ["home-info"]: "Applicant Home Information",
    }

    const outerPanelGroupProps = {
      activePanel: select("Active Outer Panel Group", outerActivePanelOptions, "main-applicant", "outer-active-panel")
    }

    const innerPanelGroupProps = {
      activePanel: select("Active Inner Panel Group", innerActivePanelOptions, "", "outer-active-panel")
    }

    return (
      <PanelGroup {...outerPanelGroupProps}>
        <PanelGroup.Panel icon={largeUserIcon} name="main-applicant" title="Applicant Name" subtitle="Main Applicant" notification={ValidationIncomplete()}>
          <PanelGroup inner {...innerPanelGroupProps}>
            <PanelGroup.Panel icon={userIcon} name="application-info" title="Application Information" notification={ValidationIncomplete()}>
              <Text>Now you see me!</Text>
            </PanelGroup.Panel>

            <PanelGroup.Panel icon={phoneIcon} name="contact-info" title="Contact Information" notification={ValidationIncomplete()}>
              <Text>Now you see me!</Text>
            </PanelGroup.Panel>

            <PanelGroup.Panel icon={dollarIcon} name="income-sources" title="Income Sources" notification={ValidationComplete()}>
              <Text>Now you see me!</Text>
            </PanelGroup.Panel>

            <PanelGroup.Panel icon={homeIcon} name="home-info" title="Applicant Home Information" notification={ValidationComplete()}>
              <Text>Now you see me!</Text>
            </PanelGroup.Panel>
          </PanelGroup>
        </PanelGroup.Panel>

        <PanelGroup.Panel icon={largeUserIcon} name="co-applicant" title="Co-Applicant Name" subtitle="Co-Applicant" notification={ValidationIncomplete()}>
          <PanelGroup inner {...innerPanelGroupProps}>
            <PanelGroup.Panel icon={userIcon} name="application-info" title="Application Information" notification={ValidationIncomplete()}>
              <Text>Now you see me!</Text>
            </PanelGroup.Panel>

            <PanelGroup.Panel icon={phoneIcon} name="contact-info" title="Contact Information" notification={ValidationIncomplete()}>
              <Text>Now you see me!</Text>
            </PanelGroup.Panel>

            <PanelGroup.Panel icon={dollarIcon} name="income-sources" title="Income Sources" notification={ValidationComplete()}>
              <Text>Now you see me!</Text>
            </PanelGroup.Panel>

            <PanelGroup.Panel icon={homeIcon} name="home-info" title="Applicant Home Information" notification={ValidationComplete()}>
              <Text>Now you see me!</Text>
            </PanelGroup.Panel>
          </PanelGroup>
        </PanelGroup.Panel>
      </PanelGroup>
    )
  })
}
