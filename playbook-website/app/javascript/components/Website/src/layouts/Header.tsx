import { Flex, Image, Badge, SectionSeparator, FlexItem } from "playbook-ui";
// @ts-ignore
import PBLogo from "../../../../images/pb-logo.svg";
import KitSearch from "../../../KitSearch";
import { PlatformToggle } from "../components/PlatformToggle";
import DarkModeToggle from "../components/DarkModeToggle";

interface HeaderProps {
  dark?: boolean;
  PBversion: string;
  search_list: any[];
  global_props_and_tokens: any;
  platform: string;
  setPlatform: (platform: string) => void;
}

const Header = ({
  dark,
  PBversion,
  search_list,
  global_props_and_tokens,
  platform,
  setPlatform,
}: HeaderProps) => {
  return (
    <>
      <Flex orientation="row" align="center" paddingRight="md">
        {/* Start Logo and Version Badge */}
        <FlexItem fixedSize="250px">
          <Flex
            orientation="row"
            align="center"
            gap="sm"
            paddingTop="xs"
            paddingBottom="xxs"
            paddingLeft="md"
          >
            <a href={"/"}>
              <Image alt="Playbook logo" url={PBLogo} />
            </a>
            <Badge
              text={PBversion}
              dark={dark}
              variant="success"
              marginBottom="xs"
              rounded
            />
          </Flex>
        </FlexItem>
        {/* End Logo and Version Badge */}

        <Flex justify="between" align="center" width="100%">
          {/* Start React/Rails/Swift Toggle */}
          <FlexItem paddingLeft="xl">
            <PlatformToggle platform={platform} setPlatform={setPlatform} />
          </FlexItem>
          {/* End React/Rails/Swift Toggle */}

          {/* Start Search Bar + dark mode toggle */}
          <FlexItem>
            <Flex
              orientation="row"
              align="center"
              paddingTop="xs"
              paddingBottom="xs"
              gap="md"
            >
              <KitSearch
                classname="desktop-kit-search"
                id="desktop-kit-search"
                kits={search_list}
                global_props_and_tokens={global_props_and_tokens}
                marginBottom="none"
              />
              <DarkModeToggle initMode={dark} />
            </Flex>
          </FlexItem>
          {/* End Search Bar + dark mode toggle */}
        </Flex>
      </Flex>
      <SectionSeparator width="100%" />
    </>
  );
};

export default Header;
