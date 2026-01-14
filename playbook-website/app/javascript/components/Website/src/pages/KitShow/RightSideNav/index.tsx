import {
  Background,
  Caption,
  Nav,
  NavItem,
} from "playbook-ui"
import { linkFormat } from '../../../../../../utilities/website_sidebar_helper'

interface RightSideNavProps {
  examples: any[]
}

const RightSideNav = ({ examples }: RightSideNavProps) => {
  return (
    <Background
      backgroundColor="white"
      className="right-side-nav"
      display={{ xs: "none", sm: "none", md: "none", lg: "block" }}
      paddingTop="xl"
      position="sticky"
      style={{ 
        width: "206px", 
        top: "20px", 
        height: "fit-content",
        flexShrink: 0
      }}
    >
      <Caption
        marginBottom="sm"
        paddingX="md"
        text="On This Page"
        size="xs"
      />
      <Nav variant="subtle">
        {examples && examples.map((example: any, index: number) => (
          <NavItem
            key={index}
            link={`#${example.name}`}
            text={linkFormat(example.name)}
            fontSize="sm"
          />
        ))}
      </Nav>
    </Background>
  )
}

export default RightSideNav