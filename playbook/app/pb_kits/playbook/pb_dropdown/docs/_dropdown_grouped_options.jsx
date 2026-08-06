import React from 'react'
import Dropdown from '../_dropdown'
import Caption from '../../pb_caption/_caption'
import SectionSeparator from '../../pb_section_separator/_section_separator'

const DropdownGroupedOptions = (props) => {

  const sections = [
    {
      title: "Profile",
      items: [
        { label: "View Profile", value: "profile", id: "profile" },
        { label: "Account Settings", value: "settings", id: "settings" },
      ],
    },
    {
      title: "Workspace",
      items: [
        { label: "Projects", value: "projects", id: "projects" },
        { label: "Billing", value: "billing", id: "billing" },
      ],
    },
    {
      title: "Support",
      items: [
        { label: "Help Center", value: "help", id: "help" },
        { label: "Contact Support", value: "support", id: "support" },
      ],
    },
  ]
  const options = sections.flatMap((section) => section.items)

  return (
    <div>
      <Dropdown
          label="Grouped Options"
          marginBottom="md"
          options={options}
          {...props}
      >
        <Dropdown.Trigger />
        <Dropdown.Container>
          {sections.map((section) => (
            <React.Fragment key={section.title}>
              <Caption
                  color="light"
                  padding="xs"
              >
                {section.title}
              </Caption>
              <SectionSeparator />

              {section.items.map((option) => (
                <Dropdown.Option
                    key={option.id}
                    option={option}
                />
              ))}
            </React.Fragment>
          ))}
        </Dropdown.Container>
      </Dropdown>
      <Dropdown
          label="Grouped Options Minimalist"
          options={options}
          separators={false}
          {...props}
      >
        <Dropdown.Trigger />
        <Dropdown.Container>
          {sections.map((section) => (
            <React.Fragment key={section.title}>
              <SectionSeparator
                  paddingY="xs"
              >
                <Caption paddingX="xs">
                  {section.title}
                </Caption>
              </SectionSeparator>

              {section.items.map((option) => (
                <Dropdown.Option
                    key={option.id}
                    option={option}
                />
              ))}
            </React.Fragment>
          ))}
        </Dropdown.Container>
      </Dropdown>
    </div>
  )
}

export default DropdownGroupedOptions
