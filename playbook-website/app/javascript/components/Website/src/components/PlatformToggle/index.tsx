import { Flex, Icon, Nav, NavItem } from "playbook-ui";
import { ReactSVG } from "./ReactSVG";
import { RailsSVG } from "./RailsSVG";
import { SwiftSVG } from "./SwiftSVG";
import "./styles.scss";

type PlatformToggleProps = {
  platform: string;
  setPlatform: (platform: string) => void;
};

const platforms = [
  { name: "react", label: "React", Icon: ReactSVG },
  { name: "rails", label: "Rails", Icon: RailsSVG },
  { name: "swift", label: "Swift", Icon: SwiftSVG },
];

export const PlatformToggle = ({
  platform,
  setPlatform,
}: PlatformToggleProps) => {
  return (
    <Nav link="#" orientation="horizontal" variant="subtle">
      {platforms.map(({ name, label, Icon: PlatformIcon }) => (
        <NavItem
          key={name}
          active={platform === name}
          link="#"
          onClick={() => setPlatform(name)}
          className="platform-toggle-item"
        >
          <Flex align="center" gap="xs">
            <Icon className="platformIcon" customIcon={<PlatformIcon active={platform === name} />} />
            <span className="pb_nav_list_item_text">{label}</span>
          </Flex>
        </NavItem>
      ))}
    </Nav>
  );
};
