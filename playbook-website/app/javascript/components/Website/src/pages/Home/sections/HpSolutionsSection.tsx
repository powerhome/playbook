import { useCallback, useLayoutEffect, useRef, type PointerEvent } from "react"
import { useNavigate } from "react-router-dom"
import {
  Background,
  Body,
  Button,
  Card,
  Flex,
  FlexItem,
  Icon,
  Title,
  User,
} from "playbook-ui"

import hpHtmlCss from "images/hp-htmlcss-solutions.svg"
import hpRails from "images/hp-rails-solutions.svg"
import hpReact from "images/hp-react-solutions.svg"
import hpSwift from "images/hp-swift-solutions.svg"
import { USER_SOLUTIONS_SNIPPET } from "../userSolutionsSnippet"
import LanguageStack from "./LanguageStack"

const GUIDE = {
  explore: "/guides/getting_started",
  htmlCss: "/guides/getting_started/HTML&_CSS",
  rails: "/guides/getting_started/ruby_on_rails_setup",
  react: "/guides/getting_started/react_setup",
  swift: "/guides/getting_started/swift_setup",
}

const captionReact =
  "Endlessly flexible presentational UI components with encapsulated styles and constraint based theme props."
const captionRails =
  "100+ highly customizable ViewComponents. Build design driven UI in Rails with ViewComponents."
const captionSwift =
  "Finally a Design System built for SwiftUI. Get cross device consistency by using Playbook for SwiftUI."
const captionHtml =
  "Utility classes help you work within the constraints of a system instead of littering your stylesheets with arbitrary values."

/**
 * “Design, develop, deliver” solutions strip — ported from `HpSolutionsComponent`.
 */
export default function HpSolutionsSection() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const codeCardRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)

  const moveCodePanel = useCallback((clientX: number) => {
    const container = containerRef.current
    const codeCard = codeCardRef.current
    if (!container || !codeCard) return

    const containerRect = container.getBoundingClientRect()
    const minX = 5
    const maxX = Math.max(minX, containerRect.width - 5)
    const nextX = Math.min(
      maxX,
      Math.max(minX, clientX - containerRect.left),
    )

    codeCard.style.transform = `translateX(${nextX}px) translateY(0)`
    codeCard.style.transition = "none"
  }, [])

  const startDragging = (event: PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    moveCodePanel(event.clientX)
  }

  const dragCodePanel = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return

    event.preventDefault()
    moveCodePanel(event.clientX)
  }

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  useLayoutEffect(() => {
    const positionCodePanel = () => {
      const container = containerRef.current
      const codeCard = codeCardRef.current
      if (!container || !codeCard) return
      const mid = container.getBoundingClientRect().width / 2
      codeCard.style.transform = `translateX(${mid}px) translateY(0)`
      codeCard.style.transition = "none"
    }
    positionCodePanel()
    window.addEventListener("resize", positionCodePanel)
    return () => window.removeEventListener("resize", positionCodePanel)
  }, [])

  return (
    <Background
        backgroundColor="light"
        display="flex"
        justifyContent="center"
        paddingX="md"
        paddingY={{ xs: "xl", md: "none" }}
    >
      <Flex
          className="solutionsFlexContainer width-full"
          flexDirection={{ default: "column", xl: "row" }}
          marginY="xl"
          maxWidth="xxl"
      >
        <FlexItem
            className="solutionsContainer width-full"
            display={{ xs: "none", sm: "flex" }}
            marginBottom={{ lg: "xl", break: "at" }}
            marginRight={{ xl: "xl" }}
            marginTop={{ xl: "lg" }}
            shadow="deeper"
        >
          <div
              className="solutionsContainer width-full"
              ref={containerRef}
              style={{ position: "relative" }}
          >
            <Card
                borderRadius="lg"
                className="solutionsCard width-full"
                justifyContent="center"
            >
              <User
                  align="center"
                  avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
                  name="Anna Black"
                  orientation="horizontal"
                  size="lg"
                  title="LVL II • Sales Representative"
              />
            </Card>

            <div className="solutionsCard secondSolutionsCard width-full"
                ref={codeCardRef}
            >
              <Card
                  background="dark"
                  borderRadius="lg"
                  className="width-full"
                  dark
                  margin="none"
                  padding="none"
                  shadow="deeper"
              >
                <div
                    className="vertical-bar"
                    onPointerCancel={stopDragging}
                    onPointerDown={startDragging}
                    onPointerMove={dragCodePanel}
                    onPointerUp={stopDragging}
                    role="presentation"
                    style={{ touchAction: "none" }}
                >
                  <Icon icon="grip-lines-vertical" />
                </div>
                <div className="pb--codeCopy">
                  <pre className="highlight highlightSolutions">
                    <code>{USER_SOLUTIONS_SNIPPET}</code>
                  </pre>
                </div>
              </Card>
            </div>
          </div>
        </FlexItem>

        <FlexItem marginLeft={{ xl: "xl" }}>
          <Flex
              alignItems={{ xs: "center", sm: "start" }}
              orientation="column"
          >
            <Title
                color="link"
                marginTop={{ lg: "lg", xl: "none", default: "xl" }}
                size={4}
                text="DESIGN, DEVELOP, DELIVER"
                textAlign={{ xs: "center", sm: "start" }}
            />

            <FlexItem marginTop="sm">
              <Title
                  display={{ xs: "none", sm: "flex" }}
                  marginBottom={{ md: "sm", xl: "lg" }}
                  size={2}
                  tag="h2"
                  text="Create solutions to repetitive problems, for multiple languages and access to anywhere!"
                  textAlign="start"
              />
            </FlexItem>

            <FlexItem marginBottom={{ md: "none", xs: "lg", default: "none" }}>
              <Body
                  color="light"
                  text="Playbook was created for Power by Power. Playbook is an open-source, cross-platform design system that gives designers and developers the frameworks they need to create engaging product experiences—accessibility, internationalization, and performance included."
                  textAlign={{ xs: "center", sm: "start" }}
              />
            </FlexItem>

            <Flex
                className="width-full card-container"
                display={{ xs: "none", default: "flex" }}
                gap="md"
                justify="between"
                marginY={{ md: "xl", xl: "sm", default: "xl" }}
            >
              <LanguageStack caption={captionReact}
                  href={GUIDE.react}
                  img={hpReact}
                  label="React"
              />
              <LanguageStack caption={captionRails}
                  href={GUIDE.rails}
                  img={hpRails}
                  label="Rails"
              />
              <LanguageStack caption={captionSwift}
                  href={GUIDE.swift}
                  img={hpSwift}
                  label="swift"
              />
              <LanguageStack caption={captionHtml}
                  href={GUIDE.htmlCss}
                  img={hpHtmlCss}
                  label="HTML-CSS"
              />
            </Flex>

            <Flex
                alignSelf="stretch"
                className="explore-button"
                marginTop={{ sm: "xl", xl: "xl", default: "none" }}
            >
              <Button
                  icon="arrow-right"
                  iconRight
                  onClick={() => {
                    navigate(GUIDE.explore)
                  }}
                  size="lg"
                  text="Explore Playbook Solutions"
              />
            </Flex>
          </Flex>
        </FlexItem>
      </Flex>
    </Background>
  )
}
