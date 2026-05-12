import { Link } from "react-router-dom";
import { Flex, Image, Icon } from "playbook-ui";
import { useDarkMode } from "../contexts/DarkModeContext";
// @ts-ignore
import PBLogoMobile from "../../../../images/pb-logo-mobile.svg";

const MobileNav = () => {
  const { darkMode } = useDarkMode();
  return (
    <Flex
      align="center"
      justify="center"
      className={`pb--page--mobileNav ${darkMode ? 'dark' : ''}`}
      shadow="deep"
    >
      <Link to="/beta">
        <Image alt="Playbook logo" url={PBLogoMobile} />
      </Link>
    </Flex>
  );
};

interface MobileHamburgerProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileHamburger = ({ isOpen, onToggle }: MobileHamburgerProps) => {
  const { darkMode } = useDarkMode();
  return (
    <Icon
      icon="bars"
      className="pb--page--hamburger"
      onClick={onToggle}
      cursor="pointer"
      dark={darkMode}
      htmlOptions={{ onClick: onToggle, "aria-expanded": isOpen, "aria-label": isOpen ? "Close navigation menu" : "Open navigation menu" }}
    />
  );
};

export default MobileNav;
