import {
  Background,
  Body,
  Button,
  Card,
  Caption,
  Dropdown,
  Flex,
  Icon,
  Nav,
  NavItem,
  SectionSeparator,
  Title,
  SelectableCardIcon
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

const DESCRIPTION_TEXT = 'Icons are a core part of Playbook’s visual language. Our custom icon set is designed to support clear, consistent, and accessible interfaces. Use them to enhance navigation, reinforce meaning, and improve communication across all digital products.'

const IconsIndex = ({
  bannerImageUrl,
  iconCategories,
  iconKitUrl,
  iconsByCategory,
}: IconsIndexProps) => {
  const sortedSections = Object.entries(iconsByCategory).sort(([left], [right]) =>
    left.localeCompare(right)
  )

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
                <Body paddingBottom="sm" text={DESCRIPTION_TEXT} />
                <a href={iconKitUrl} rel="noreferrer" target="_blank">
                  To use them in your project, check out our Icon kit.
                </a>
              </div>

              <div className="description-mobile">
                <Body paddingBottom="xs" text={DESCRIPTION_TEXT} />
                <a href={iconKitUrl} rel="noreferrer" target="_blank">
                  To use them in your project, check out our Icon kit.
                </a>
              </div>

              <Dropdown id="icon-category-dropdown" options={iconCategories}>
                <Dropdown.Trigger>
                  <div data-dropdown-custom-trigger>
                    <Button
                      fullWidth
                      icon="sort"
                      iconRight
                      id="icon-category-trigger-button"
                      text="Icon Categories"
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

              {sortedSections.map(([category, icons]) => (
                <Flex alignSelf="stretch" 
                  alignItems="stretch"
                  gap="sm"
                  key={category}
                  orientation="column" 
                  >
                  <Caption 
                    size="lg" 
                    text={category}
                  />
                  <div className="pb_layout_kit_collection icon-grid">
                    <div className="layout_body">
                      {icons
                        .slice()
                        .sort((left, right) => left.name.localeCompare(right.name))
                        .map((icon) => (
                          <SelectableCardIcon className="icon-card" icon={icon.name} titleText={icon.name} key={`${category}-${icon.name}`}/>
                        ))}
                    </div>
                  </div>
                </Flex>
              ))}
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