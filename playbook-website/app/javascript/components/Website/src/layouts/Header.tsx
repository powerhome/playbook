import { Flex, Image, Badge, SectionSeparator, FlexItem } from "playbook-ui";
// @ts-ignore
import PBLogo from "../../../../images/pb-logo.svg";
import KitSearch from "../../../KitSearch";
import { PlatformToggle } from "../components/PlatformToggle";

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
      <Flex orientation="row" align="center" paddingX="md">
        {/* Logo and Version Badge */}
        <FlexItem fixedSize="250px">
          <Flex
            orientation="row"
            align="center"
            gap="sm"
            paddingTop="xs"
            paddingBottom="xxs"
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
        {/* React/Rails/Swift Toggle */}
        <FlexItem marginLeft="xl">
          <PlatformToggle 
            platform={platform}
            setPlatform={setPlatform}
          />
        </FlexItem>
        {/* Search Bar */}
        <Flex
          orientation="row"
          align="center"
          paddingTop="xs"
          paddingBottom="xs"
        >
          <KitSearch
            classname="desktop-kit-search"
            id="desktop-kit-search"
            kits={search_list}
            global_props_and_tokens={global_props_and_tokens}
            marginBottom="none"
          />
        </Flex>
      </Flex>
      <SectionSeparator width="100%" />
    </>
  );
};

export default Header;
