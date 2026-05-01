import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { matchSorter, rankings } from 'match-sorter'

import {
  Background,
  Body,
  Button,
  Caption,
  Dropdown,
  EmptyState,
  Flex,
  Nav,
  NavItem,
  SectionSeparator,
  Title,
  SelectableCardIcon,
  TextInput,
} from 'playbook-ui'

type IconCategory = {
  label: string,
  link: string,
  text: string,
  value: string,
}

type IconData = {
  name: string,
}

type IconsByCategory = Record<string, IconData[]>

type IconsIndexProps = {
  bannerImageUrl: string,
  iconCategories: IconCategory[],
  iconKitUrl: string,
  iconsByCategory: IconsByCategory,
}

type IconSectionProps = {
  category: string,
  categoryId: string,
  icons: IconData[],
  initialRender?: boolean,
}

const descriptionText = 'Icons are a core part of Playbook’s visual language. Our custom icon set is designed to support clear, consistent, and accessible interfaces. Use them to enhance navigation, reinforce meaning, and improve communication across all digital products.'
const dropdownLabel = 'Icon Categories'
const ICON_CARD_ESTIMATED_HEIGHT = 152

const IconSection = ({
  category,
  categoryId,
  icons,
  initialRender = false,
}: IconSectionProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [shouldRenderIcons, setShouldRenderIcons] = useState(initialRender)

  useEffect(() => {
    if (initialRender) {
      setShouldRenderIcons(true)
      return
    }

    const section = sectionRef.current
    if (!section || typeof IntersectionObserver === 'undefined') {
      setShouldRenderIcons(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRenderIcons(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '900px 0px',
      }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [initialRender])

  const estimatedPlaceholderHeight = Math.max(Math.ceil(icons.length / 4) * ICON_CARD_ESTIMATED_HEIGHT, 220)

  return (
    <div ref={sectionRef}>
      <Flex
        alignSelf="stretch"
        alignItems="stretch"
        gap="sm"
        orientation="column"
      >
        <Caption
          id={categoryId}
          size="lg"
          text={category}
        />
        <div className="pb_layout_kit_collection icon-grid">
          <div className="layout_body">
            {shouldRenderIcons ? (
              icons
                .slice()
                .sort((left, right) => left.name.localeCompare(right.name))
                .map((icon) => (
                  <SelectableCardIcon
                    className="icon-card"
                    icon={icon.name}
                    key={`${category}-${icon.name}`}
                    titleText={icon.name}
                  />
                ))
            ) : (
              <div
                aria-hidden
                className="icon-grid-placeholder"
                style={{ minHeight: `${estimatedPlaceholderHeight}px` }}
              />
            )}
          </div>
        </div>
      </Flex>
    </div>
  )
}

const IconsIndex = ({
  bannerImageUrl,
  iconCategories,
  iconKitUrl,
  iconsByCategory,
}: IconsIndexProps) => {
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState(dropdownLabel)
  const [searchQuery, setSearchQuery] = useState('')

  const displayedSections = useMemo(() => {
    const sorted = Object.entries(iconsByCategory).sort(([left], [right]) =>
      left.localeCompare(right)
    )
    const q = searchQuery.trim()
    if (!q) return sorted

    return sorted
      .map(([category, icons]) => [
        category,
        matchSorter(icons, q, {
          keys: ['name'],
          threshold: rankings.CONTAINS,
        }),
      ] as [string, IconData[]])
      .filter(([, icons]) => icons.length > 0)
  }, [iconsByCategory, searchQuery])

  const hasVisibleIcons = displayedSections.some(([, icons]) => icons.length > 0)

  const getCategoryId = (category: string) => {
    return iconCategories.find((item) => item.text === category)?.value || category
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleCategorySelect = (option: { label?: string, value?: string } | null): null => {
    if (!option?.value) return null

    setSelectedCategoryLabel(option.label || dropdownLabel)

    const target = document.getElementById(option.value)
    if (target) {
      window.history.replaceState(null, '', `#${option.value}`)
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return null
  }

  return (
    <div className="playbook_icons_index">
    
      <Background
        backgroundColor="dark"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="contain"
        imageUrl={bannerImageUrl}
        display={{ xs: "none" }}
      >
        <div style={{ height: "250px" }} />
      </Background>

      <div className="content-wrapper">
        <Flex gap="md" justify="evenly">
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <Flex 
              gap="md"
              maxWidth="lg" 
              orientation="column" 
              width="100%"
            >
              <Title size={{ xs: 3, sm: 2, md: 1, lg: 1, xl: 1 }} text="Icons" />

              <div className="description-default">
                <Body paddingBottom="sm" text={descriptionText} />
                <a href={iconKitUrl} rel="noreferrer" target="_blank">
                  To use them in your project, check out our Icon kit.
                </a>
              </div>

              <div className="description-mobile">
                <Body paddingBottom="xs" text={descriptionText} />
                <a href={iconKitUrl} rel="noreferrer" target="_blank">
                  To use them in your project, check out our Icon kit.
                </a>
              </div>

              <div className="icons-index-toolbar">
                <div className="icons-index-search">
                  <TextInput
                    marginBottom="none"
                    name="icons_index_search"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSearchQuery(e.target.value)
                    }
                    placeholder="Search for icons..."
                    value={searchQuery}
                    width="100%"
                  />
                </div>

                <Dropdown id="icon-category-dropdown" onSelect={handleCategorySelect} options={iconCategories}>
                  <Dropdown.Trigger>
                    <div data-dropdown-custom-trigger>
                      <Button
                        icon="sort"
                        iconRight
                        id="icon-category-trigger-button"
                        text={selectedCategoryLabel}
                        variant="secondary"
                      />
                    </div>
                  </Dropdown.Trigger>
                  <Dropdown.Container maxWidth="xs">
                    {iconCategories.map((option) => (
                      <Dropdown.Option key={option.value} option={option}>
                        <Body size="sm" text={option.label} />
                      </Dropdown.Option>
                    ))}
                  </Dropdown.Container>
                </Dropdown>
              </div>

              {!hasVisibleIcons ? (
                <Flex justify="center" width="100%">
                  <EmptyState
                    header="No results"
                    image="default"
                    size="lg"
                  />
                </Flex>
              ) : (
                displayedSections.map(([category, icons], index) => (
                  <IconSection
                    category={category}
                    categoryId={getCategoryId(category)}
                    icons={icons}
                    initialRender={index < 2}
                    key={category}
                  />
                ))
              )}
            </Flex>
          </div>

          <SectionSeparator className="icon-categories-section-separator" orientation="vertical" />

          <div className="icon-categories-sidebar">
            <Caption text="Icon Categories" />
            <Nav variant="subtle">
              {iconCategories.map((category) => (
                <NavItem key={category.value} link={category.link} text={category.text} />
              ))}
            </Nav>
          </div>
        </Flex>
      </div>
    </div>

  )
}

export default IconsIndex
