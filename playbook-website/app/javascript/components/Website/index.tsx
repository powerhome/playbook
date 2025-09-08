import { Layout } from "playbook-ui";
import MainSidebar from "../MainSidebar";
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
    patterns, 
    getting_started, 
    design_guidelines, 
    icons, 
    whats_new,
    category
  }: any = useLoaderData();

  return (
    <Layout className="pb--page--content pb--website--new" dark={dark}>
      <Layout.Side className="pb--page--sideNav">
        <MainSidebar
          dark={dark}
          type={type || "react"}
          category={category}
          kit={kit}
          kits_with_status={kits_with_status || kits}
          PBversion={PBversion || "Latest"}
          search_list={search_list || []}
          patterns={patterns || []}
          getting_started={getting_started || []}
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
