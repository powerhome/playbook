import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Flex, Image, Badge, SectionSeparator, FlexItem } from "playbook-ui";
// @ts-ignore
import PBLogo from "../../../../images/pb-logo.svg";
import KitSearch from "../../../KitSearch";
import { PlatformToggle } from "../components/PlatformToggle";
import BetaDarkModeToggle from "../components/BetaDarkModeToggle";
import { useDarkMode } from "../contexts/DarkModeContext";
import "./header.scss";

interface HeaderProps {
  PBversion: string;
  search_list: any[];
  global_props_and_tokens: any;
  platform: string;
  setPlatform: (platform: string) => void;
}

const Header = ({
  PBversion,
  search_list,
  global_props_and_tokens,
  platform,
  setPlatform,
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, setDarkMode } = useDarkMode();

  const isKitShowPage = /^\/beta\/kits\/[^/]+\/(react|rails|swift)$/.test(location.pathname) ||
    /^\/beta\/kits\/advanced_table\/[^/]+\/(react|rails|swift)$/.test(location.pathname);

  const isKitsPage = location.pathname === "/beta/kits";
  const isKitsCategoryPage = /^\/beta\/kit_category\/[^/]+$/.test(location.pathname);

  useEffect(() => {
    if (!isKitShowPage && darkMode) {
      setDarkMode(false);
    }
  }, [isKitShowPage, darkMode, setDarkMode]);
  return (
    <>
      <Flex 
        className="pb--page--header--new"
        orientation="row" 
        align="center"
        display={{ xs: "none", sm: "none", md: "none", lg: "flex" }}
        dark={darkMode}
      >
        {/* Start Logo and Version Badge */}
        <FlexItem fixedSize="250px">
          <Flex
            orientation="row"
            align="center"
            gap="sm"
            paddingTop="xs"
            paddingBottom="xxs"
            paddingX="md"
          >
            <Link to="/beta">
              <Image alt="Playbook logo" url={PBLogo} />
            </Link>
            <Badge
              text={PBversion}
              dark={darkMode}
              variant="success"
              marginBottom="xs"
              rounded
            />
          </Flex>
        </FlexItem>
        {/* End Logo and Version Badge */}

        <Flex justify={!isKitsPage && !isKitsCategoryPage && !isKitShowPage ? "end" : "between"} align="center" width="100%">
          {/* Start React/Rails/Swift Toggle */}
          {(isKitsPage || isKitsCategoryPage || isKitShowPage) && (
            <FlexItem paddingLeft="xl">
              <PlatformToggle platform={platform} setPlatform={setPlatform} />
            </FlexItem>
          )}
          {/* End React/Rails/Swift Toggle */}
          {/* Start Search Bar + dark mode toggle (only on kit show pages) */}
          <FlexItem paddingRight="md">
            <Flex
              orientation="row"
              align="stretch"
              paddingTop="xs"
              paddingBottom="xs"
              gap="md"
            >
              <KitSearch
                betaSearchResetKey={`${location.pathname}${location.search}`}
                classname="desktop-kit-search-new"
                id="desktop-kit-search"
                kits={search_list}
                global_props_and_tokens={global_props_and_tokens}
                beta={true}
                onBetaNavigate={(path) => navigate(path)}
                marginBottom="none"
              />
              {isKitShowPage && <BetaDarkModeToggle />}
            </Flex>
          </FlexItem>
          {/* End Search Bar + dark mode toggle */}
        </Flex>
      </Flex>
      <SectionSeparator width="100%" dark={darkMode} />
    </>
  );
};

export default Header;
