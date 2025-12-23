import { Layout } from "playbook-ui";
import Sidebar from "./src/layouts/Sidebar";
import LayoutRight from "./src/layouts/LayoutRight";
import { useLoaderData } from "react-router-dom";

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

  return (
    <Layout className="pb--page--content pb--website--new" dark={dark}>
      <Layout.Side className="pb--page--sideNav">
        <Sidebar
          building_blocks={building_blocks || []}
          dark={dark}
          type={type || "react"}
          category={category}
          kit={kit}
          kits_with_status={kits_with_status || kits}
          PBversion={PBversion || "Latest"}
          search_list={search_list || []}
          getting_started={getting_started || []}
          global_props_and_tokens={global_props_and_tokens || []}
          design_guidelines={design_guidelines || []}
          icons={icons || []}
          whats_new={whats_new || []}
          beta={true}
        />
      </Layout.Side>
      {kits.length > 0 && <LayoutRight dark={dark} />}
    </Layout>
  );
}

export default Website;
