import { useState } from "react";
import { Layout } from "playbook-ui";
import Sidebar from "./src/layouts/Sidebar";
import LayoutRight from "./src/layouts/LayoutRight";
import Header from "./src/layouts/Header";
import MobileNav, { MobileHamburger } from "./src/components/MobileNav";
import { useLoaderData } from "react-router-dom";
import { PlatformContext } from "./src/contexts/PlatformContext";

function Website() {
  const { 
    kits, 
    dark, 
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

  const [platform, setPlatform] = useState(type || 'react');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <PlatformContext.Provider value={{ platform, setPlatform }}>
      <MobileNav 
        isOpen={mobileNavOpen}
        onToggle={() => setMobileNavOpen(!mobileNavOpen)}
      />
      <Header 
        dark={dark}
        PBversion={PBversion || "Latest"}
        search_list={search_list || []}
        global_props_and_tokens={global_props_and_tokens || []}
        platform={platform}
        setPlatform={setPlatform}
      />
      <Layout className="pb--page--content pb--website--new" dark={dark}>
        <MobileHamburger 
          isOpen={mobileNavOpen}
          onToggle={() => setMobileNavOpen(!mobileNavOpen)}
        />
        <Layout.Side className="pb--page--sideNav">
          <Sidebar
            building_blocks={building_blocks || []}
            dark={dark}
            type={type || "react"}
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
        {kits.length > 0 && <LayoutRight dark={dark} />}
      </Layout>
    </PlatformContext.Provider>
  );
}

export default Website;
