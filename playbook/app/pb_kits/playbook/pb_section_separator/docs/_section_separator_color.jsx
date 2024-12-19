import React from "react"
import { SectionSeparator, Flex, Detail, Icon } from "playbook-ui"

const children = (
  <Flex padding="xs">
    <Icon color="primary"
        icon="arrow-down"
    />
    <Detail
        color="link"
        size="sm"
        text="Children"
    />
  </Flex>
)

const SectionSeparatorColor = (props) => {
  return (
    <div>
      <SectionSeparator text="Default Separator"
          {...props}
      />
      <SectionSeparator color="primary"
          text="Primary Separator"
          {...props}
      />
      <SectionSeparator
          color="primary"
          lineStyle="dashed"
          text="Primary Dashed Separator"
          {...props}
      />
       <SectionSeparator color="primary"
           {...props}
       >
        {children}
      </SectionSeparator>
    </div>
  )
}

export default SectionSeparatorColor
