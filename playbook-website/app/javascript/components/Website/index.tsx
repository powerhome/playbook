/* eslint-disable react/react-in-jsx-scope */
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";
import { Flex, Icon, Layout, SectionSeparator, Body } from "playbook-ui";
import Sidebar from "./src/layouts/Sidebar";
import LayoutRight from "./src/layouts/LayoutRight";
import Header from "./src/layouts/Header";
import MobileNav, { MobileHamburger } from "./src/components/MobileNav";
import { PlatformToggle } from "./src/components/PlatformToggle";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { PlatformContext } from "./src/contexts/PlatformContext";
import { DarkModeProvider, useDarkMode } from "./src/contexts/DarkModeContext";
import {
  DEFAULT_PLATFORM,
  resolvePlatform,
  rewriteLegacySwiftPath,
  syncStoredPlatformFromLocation,
  writeStoredPlatform,
} from "./src/helpers/platform";

function WebsiteContent() {
  const {
    kits,
    type,
    kit,
    kits_with_status,
    PBversion,
    search_list,
    getting_started,
    design_guidelines,
    icons,
    whats_new,
    category,
    global_props_and_tokens,
  }: any = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(89);

  // Close sidebar on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const normalizedPath = location.pathname.replace(/\/+$/, "") || "/";

  useEffect(() => {
    const headerElement = headerRef.current;

    if (!headerElement) return;

    const measureHeader = () => {
      const nextHeight = Math.round(
        headerElement.getBoundingClientRect().height,
      );
      setHeaderHeight(nextHeight || 89);
    };

    measureHeader();

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measureHeader)
        : null;

    observer?.observe(headerElement);
    window.addEventListener("resize", measureHeader);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measureHeader);
    };
  }, []);

  const websiteStyle = {
    "--website-header-height": `${headerHeight}px`,
  } as CSSProperties;

  const platform = useMemo(
    () => resolvePlatform(normalizedPath, location.search, type),
    [normalizedPath, location.search, type],
  );

  useEffect(() => {
    setDesktopSidebarCollapsed(normalizedPath === "/playground");
  }, [normalizedPath]);

  // Keep preference in sync when the URL explicitly sets a platform
  useEffect(() => {
    syncStoredPlatformFromLocation(normalizedPath, location.search);
  }, [normalizedPath, location.search]);

  // Legacy Swift kit platform / ?type=swift → Rails
  useEffect(() => {
    const rewrittenPath = rewriteLegacySwiftPath(normalizedPath);
    const params = new URLSearchParams(location.search);
    const hasSwiftType = params.get("type") === "swift";

    if (!rewrittenPath && !hasSwiftType) return;

    if (hasSwiftType) params.set("type", DEFAULT_PLATFORM);
    const nextPath = rewrittenPath || normalizedPath;
    const search = params.toString();
    navigate(
      `${nextPath}${search ? `?${search}` : ""}${location.hash}`,
      { replace: true },
    );
  }, [normalizedPath, location.search, location.hash, navigate]);

  const handlePlatformChange = (nextPlatform: string) => {
    writeStoredPlatform(nextPlatform);

    const isKitDetailRoute =
      /^\/kits\/advanced_table\/[^/]+\/(react|rails)$/.test(
        normalizedPath,
      ) || /^\/kits\/[^/]+\/(react|rails)$/.test(normalizedPath);

    if (isKitDetailRoute) {
      const nextPath = normalizedPath.replace(
        /\/(react|rails)$/,
        `/${nextPlatform}`,
      );
      if (nextPath !== normalizedPath) {
        navigate(`${nextPath}${location.search}${location.hash}`);
      }
      return;
    }

    const isCategoryOrKitsIndex =
      normalizedPath === "/kits" ||
      /^\/kit_category\/[^/]+$/.test(normalizedPath);

    if (isCategoryOrKitsIndex) {
      const params = new URLSearchParams(location.search);
      params.set("type", nextPlatform);
      navigate(`${normalizedPath}?${params.toString()}${location.hash}`);
    }
  };

  const isKitShowPage =
    /^\/kits\/[^/]+\/(react|rails)$/.test(normalizedPath) ||
    /^\/kits\/advanced_table\/[^/]+\/(react|rails)$/.test(normalizedPath);
  const isKitsPage = normalizedPath === "/kits";
  const isKitsCategoryPage = /^\/kit_category\/[^/]+$/.test(normalizedPath);
  const showPlatformToggle = isKitsPage || isKitsCategoryPage || isKitShowPage;

  return (
    <PlatformContext.Provider
        value={{ platform, setPlatform: handlePlatformChange }}
    >
      <div
          className={`pb--website-shell ${darkMode ? "dark" : ""} ${desktopSidebarCollapsed ? "sidebar-collapsed" : ""}`.trim()}
          style={websiteStyle}
      >
        <MobileNav />
        {showPlatformToggle && (
          <Flex
              align="center"
              dark={darkMode}
              display={{
              xs: "flex",
              sm: "flex",
              md: "flex",
              lg: "none",
              xl: "none",
            }}
              paddingX="sm"
              paddingY="xs"
          >
            <PlatformToggle
                platform={platform}
                setPlatform={handlePlatformChange}
            />
          </Flex>
        )}
        <SectionSeparator
            dark={darkMode}
            display={{
            xs: "block",
            sm: "block",
            md: "block",
            lg: "none",
            xl: "none",
          }}
            width="100%"
        />
        <div ref={headerRef}>
          <Header
              PBversion={PBversion || "Latest"}
              global_props_and_tokens={global_props_and_tokens || []}
              platform={platform}
              search_list={search_list || []}
              setPlatform={handlePlatformChange}
          />
        </div>
        <Layout
            className="pb--page--content pb--website--new"
            collapse="lg"
            dark={darkMode}
        >
          <MobileHamburger
              isOpen={mobileNavOpen}
              onToggle={() => setMobileNavOpen(!mobileNavOpen)}
          />
          {mobileNavOpen && (
            <div
                onClick={() => setMobileNavOpen(false)}
                style={{
                position: "fixed",
                inset: 0,
                zIndex: 99,
              }}
            />
          )}
          <Layout.Side
              className={`pb--page--sideNav ${darkMode ? "dark" : ""} ${mobileNavOpen ? "mobile-open" : ""} ${desktopSidebarCollapsed ? "is-collapsed" : ""}`.trim()}
          >
            <Sidebar
                category={category}
                collapsed={desktopSidebarCollapsed}
                dark={darkMode}
                design_guidelines={design_guidelines || { pages: [] }}
                getting_started={getting_started || { pages: [] }}
                global_props_and_tokens={global_props_and_tokens || []}
                icons={icons || []}
                kit={kit}
                kits_with_status={kits_with_status || kits}
                type={platform || DEFAULT_PLATFORM}
                whats_new={whats_new || { pages: [] }}
            />
            <button
                aria-label={
                desktopSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"
              }
                className="pb--page--sideNav-toggle"
                onClick={() =>
                setDesktopSidebarCollapsed((collapsed) => !collapsed)
              }
                type="button"
            >
              <Icon
                  color="light"
                  icon={
                  desktopSidebarCollapsed
                    ? "angle-double-right"
                    : "angle-double-left"
                }
              />
              <Body
                  color="lighter"
                  marginLeft="xs"
                  text={desktopSidebarCollapsed ? "" : "Collapse Sidebar"}
              />
            </button>
          </Layout.Side>
          {kits.length > 0 && <LayoutRight />}
        </Layout>
      </div>
    </PlatformContext.Provider>
  );
}

function Website() {
  const { dark }: any = useLoaderData();

  return (
    <DarkModeProvider initialDarkMode={!!dark}>
      <WebsiteContent />
    </DarkModeProvider>
  );
}

export default Website;
