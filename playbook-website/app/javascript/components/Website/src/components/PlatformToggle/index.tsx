import { Flex, Icon, Nav, NavItem } from "playbook-ui";
import { ReactSVG } from "./ReactSVG";
import { RailsSVG } from "./RailsSVG";
// import { SwiftSVG } from "./SwiftSVG";
import { useDarkMode } from "../../contexts/DarkModeContext";
import "./styles.scss";

type PlatformToggleProps = {
  platform: string;
  setPlatform: (platform: string) => void;
};

// TODO: Add Swift back in when we have a Swift kit
const platforms = [
  { name: "react", label: "React", Icon: ReactSVG },
  { name: "rails", label: "Rails", Icon: RailsSVG },
  // { name: "swift", label: "Swift", Icon: SwiftSVG },
];


export const PlatformToggle = ({
  platform,
  setPlatform,
}: PlatformToggleProps) => {
  const handlePlatformClick = (name: string) => {
    setPlatform(name);
  };

  const { darkMode } = useDarkMode();

  return (
    <Nav orientation="horizontal" variant="subtle" dark={darkMode}>
      {platforms.map(({ name, label, Icon: PlatformIcon }) => (
        <NavItem
          key={name}
          active={platform === name}
          cursor="pointer"
          className="platform-toggle-item"
          onClick={() => handlePlatformClick(name)}
          dark={darkMode}
        >
          <Flex align="center" gap="xs">
            <Icon dark={darkMode} className="platformIcon" customIcon={<PlatformIcon active={platform === name} />} />
            <span className="pb_nav_list_item_text">{label}</span>
          </Flex>
        </NavItem>
      ))}
    </Nav>
  );
};
