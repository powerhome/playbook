import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { matchSorter, rankings } from 'match-sorter'

import {
  Background,
  Body,
  Button,
  Caption,
  Card,
  Collapsible,
  Container,
  Dropdown,
  EmptyState,
  Flex,
  Nav,
  NavItem,
  SectionSeparator,
  Title,
  TextInput,
} from 'playbook-ui'

import IconCard from './IconCard'

import {
  SyntaxHighlightedCode,
  type SyntaxLanguage,
} from "../SyntaxHighlightedCode";

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

const descriptionText = 'Icons are a core part of Playbook’s visual language. Our custom icon set is designed to support clear, consistent, and accessible interfaces. Use them to enhance navigation, reinforce meaning, and improve communication across all digital products.'
const dropdownLabel = 'Icon Categories'

// Renders children only once the section scrolls near the viewport.
// A placeholder div reserves approximate space to prevent layout shift.
// to speed up the initial render
const LazySection = ({ children, estimatedHeight = '200px' }: { children: React.ReactNode, estimatedHeight?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { rootMargin: '300px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : estimatedHeight }}>
      {visible ? children : null}
    </div>
  )
}

type DocCodeSnippetProps = {
  code: string;
  language: SyntaxLanguage;
};

const DocCodeSnippet = ({ code, label, language }: DocCodeSnippetProps) => (
  <Card borderNone borderRadius="md" padding="none" width="100%">
    <Caption color="lighter" paddingBottom="xs" text={label} />
    <SyntaxHighlightedCode code={code} language={language} />
  </Card>
);

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
              <Card padding="none">
                <Collapsible collapsed={false}>
                  <Collapsible.Main padding="none">
                    <Caption text="Icon CSS API" />
                  </Collapsible.Main>
                  <Collapsible.Content padding="none">
                    <Container>
                      <Flex gap="xs" marginTop="md" orientation="column">
                        <Title size={4} text="Overview" />
                        <Body text="Every icon on this page can be rendered with a single CSS class without the need of importing the Icon component. It's as simple as adding the class to any element and the icon appears: pb-icon-{icon-name}." />
                        <Body text="{icon-name} is the kebab-case name printed under each Icon in the Cards below (e.g. the asterisk Icon maps to pb-icon-asterisk). Click on any Icon to copy its name." />
                        <Body text="Icons are decorative by default, so mark the element aria-hidden='true' unless it's conveying meaning with no adjacent text as a label." />
                        <DocCodeSnippet
                          code={`<span className="pb-icon-asterisk" aria-hidden="true"></span>`}
                          language="html"
                        />
                      </Flex>
                      <Flex gap="xs" marginTop="md" orientation="column">
                        <Title size={4} text="Controlling Size" />
                        <Body text="Size is set with the --pb-icon-size custom property and not a font-size or size attribute. It needs to be set inline or in a stylesheet rule targeting the class." />
                        <DocCodeSnippet
                          code={`<span className="pb-icon-asterisk" style="--pb-icon-size: 1em" aria-hidden="true"></span>`}
                          language="html"
                        />
                        <Body text="For Playbook and matching the Icon component sizes, following this mapping: xs=0.75em, sm=0.875em, 1x=1em (default), lg=1.33em, 2x=2em, 3x=3em, 4x=4em, 5x=5em" />
                      </Flex>
                      <Flex gap="xs" marginTop="md" orientation="column">
                        <Title size={4} text="Controlling Color" />
                        <Body text="Icons render in currentColor, so set color on the element the same way you would for other text." />
                        <DocCodeSnippet
                          code={`<span className="pb-icon-asterisk" style="color: blue;" aria-hidden="true"></span>`}
                          language="html"
                        />
                      </Flex>
                      <Flex gap="xs" marginTop="md" orientation="column">
                        <Title size={4} text="Animating an Icon" />
                        <Body text="Animations can be added through utility classes." />
                        <DocCodeSnippet
                          code={`<span className="pb-icon-asterisk" pb-icon-spin aria-hidden="true"></span>`}
                          language="html"
                        />
                      </Flex>
                      <Flex gap="xs" marginTop="md" orientation="column">
                        <Title size={4} text="Setup / Import" />
                        <Body text="To use the Icon CSS classes, import the Playbook Icons stylesheet into your application. For JavaScript applications, you can import the stylesheet from your application entrypoint or a dedicated Playbook Icons entrypoint." />
                        <DocCodeSnippet
                          code={`import "@powerhome/playbook-icons/css/pb-icons.css"`}
                          language="jsx"
                        />
                        <Body text="For a Rails engine, add the Playbook Icons CSS directory to the asset and Sass load paths in the engine initializer." />
                        <DocCodeSnippet
                          code={`initializer "nitro_theme.playbook_icons_assets" do |app|
  playbook_icons_css = app.root.join(
    "node_modules",
    "@powerhome",
    "playbook-icons",
    "css"
  )

  app.config.assets.paths << playbook_icons_css
  app.config.sass.load_paths << playbook_icons_css
end`}
                          language="ruby"
                        />
                      </Flex>
                    </Container>
                  </Collapsible.Content>
                </Collapsible>
              </Card>
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
                displayedSections.map(([category, icons]) => (
                  <Flex alignSelf="stretch"
                    alignItems="stretch"
                    gap="sm"
                    key={category}
                    orientation="column"
                  >
                    <Caption
                      id={getCategoryId(category)}
                      size="lg"
                      text={category}
                    />
                    <LazySection estimatedHeight="150px">
                      <div className="pb_layout_kit_collection icon-grid">
                        <div className="layout_body">
                        {icons
                          .slice()
                          .sort((left, right) => left.name.localeCompare(right.name))
                          .map((icon) => (
                            <IconCard
                              iconName={icon.name}
                              key={`${category}-${icon.name}`}
                            />
                          ))}
                        </div>
                      </div>
                    </LazySection>
                  </Flex>
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