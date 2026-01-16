import { Flex, Image, Icon } from "playbook-ui";
// @ts-ignore
import PBLogoMobile from "../../../../images/pb-logo-mobile.svg";

const MobileNav = () => {
  return (
    <Flex
      align="center"
      justify="center"
      className="pb--page--mobileNav"
      shadow="deep"
    >
      <Image alt="Playbook logo" url={PBLogoMobile} />
    </Flex>
  );
};

interface MobileHamburgerProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileHamburger = ({ isOpen, onToggle }: MobileHamburgerProps) => {
  return (
    <>
      <Icon
        icon="bars"
        className="pb--page--hamburger"
        onClick={onToggle}
        cursor="pointer"
      />
      <input
        type="checkbox"
        className="pb--page--checkbox"
        checked={isOpen}
        onChange={onToggle}
      />
    </>
  );
};

export default MobileNav;
