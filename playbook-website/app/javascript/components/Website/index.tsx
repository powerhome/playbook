import { useMemo, useState } from "react";
import { Layout } from "playbook-ui";
import Sidebar from "./src/layouts/Sidebar";
import LayoutRight from "./src/layouts/LayoutRight";
import Header from "./src/layouts/Header";
import MobileNav, { MobileHamburger } from "./src/components/MobileNav";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { PlatformContext } from "./src/contexts/PlatformContext";
import { DarkModeProvider, useDarkMode } from "./src/contexts/DarkModeContext";

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
    building_blocks,
    global_props_and_tokens
  }: any = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const normalizedPath = location.pathname.replace(/\/+$/, "") || "/";

  const platform = useMemo(() => {
    const pathPlatform = normalizedPath.match(/\/(react|rails|swift)$/)?.[1];
    const queryPlatform = new URLSearchParams(location.search).get("type");
    return pathPlatform || queryPlatform || type || "react";
  }, [normalizedPath, location.search, type]);

  const handlePlatformChange = (nextPlatform: string) => {
    const isKitDetailRoute =
      /^\/beta\/kits\/advanced_table\/[^/]+\/(react|rails|swift)$/.test(normalizedPath) ||
      /^\/beta\/kits\/[^/]+\/(react|rails|swift)$/.test(normalizedPath);

    if (isKitDetailRoute) {
      const nextPath = normalizedPath.replace(/\/(react|rails|swift)$/, `/${nextPlatform}`);
      if (nextPath !== normalizedPath) {
        navigate(`${nextPath}${location.search}${location.hash}`);
      }
      return;
    }

    const isCategoryOrKitsIndex =
      normalizedPath === "/beta/kits" || /^\/beta\/kit_category\/[^/]+$/.test(normalizedPath);

    if (isCategoryOrKitsIndex) {
      const params = new URLSearchParams(location.search);
      params.set("type", nextPlatform);
      navigate(`${normalizedPath}?${params.toString()}${location.hash}`);
    }
  };

  return (
    <PlatformContext.Provider value={{ platform, setPlatform: handlePlatformChange }}>
      <div className={darkMode ? "dark" : ""}>
        <MobileNav 
          isOpen={mobileNavOpen}
          onToggle={() => setMobileNavOpen(!mobileNavOpen)}
        />
        <Header 
          PBversion={PBversion || "Latest"}
          search_list={search_list || []}
          global_props_and_tokens={global_props_and_tokens || []}
          platform={platform}
          setPlatform={handlePlatformChange}
        />
        <Layout className="pb--page--content pb--website--new" dark={darkMode}>
          <MobileHamburger 
            isOpen={mobileNavOpen}
            onToggle={() => setMobileNavOpen(!mobileNavOpen)}
          />
          <Layout.Side className="pb--page--sideNav">
            <Sidebar
              building_blocks={building_blocks || []}
              dark={darkMode}
              type={platform || "react"}
              category={category}
              kit={kit}
              kits_with_status={kits_with_status || kits}
              getting_started={getting_started || { pages: [] }}
              global_props_and_tokens={global_props_and_tokens || []}
              design_guidelines={design_guidelines || { pages: [] }}
              icons={icons || []}
              whats_new={whats_new || { pages: [] }}
              beta={true}
            />
          </Layout.Side>
          {kits.length > 0 && <LayoutRight dark={darkMode} />}
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
