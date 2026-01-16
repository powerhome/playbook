import { Nav, useCollapsible } from "playbook-ui";
import { TopLevelNavItem } from "./TopLevelNavItems";
import FlyingGhosts from "./FlyingGhosts";

const Sidebar = ({
  dark,
  type,
  category,
  kit,
  kits_with_status,
  building_blocks,
  getting_started,
  design_guidelines,
  whats_new,
  icons,
  global_props_and_tokens,
}: any) => {
  
  // --------------Halloween only-----------------------------
  // Check if we're in the last week of October (Oct 25-31)
  // Add special Halloween decorations during this week!
  const isHalloweenWeek = () => {
    const today = new Date();
    const month = today.getMonth(); // 0-indexed, so October is 9
    const date = today.getDate();
    return month === 9 && date >= 25 && date <= 31;
  };
  // --------------------------------------------------------

  const transformKitsData = (kitsArray: any) => {
    return kitsArray.map((kit: any) => {
      // There's only one key per object, so we get the kit name and its components
      const kitName = Object.keys(kit)[0];
      const components = kit[kitName];
  
      // Filter out any components with status 'beta', then map to get their names
      const componentNames = components
        .filter(component => component.status !== 'beta')
        .map(component => component.name);
  
      return { [kitName]: componentNames };
    });
  };
  
  const kits = transformKitsData(kits_with_status);
  
  //hook into collapsible logic for all components nested nav items
  const collapsibles = kits.map(() => useCollapsible());

  //kits in alphabetical order
  kits.map((obj: {[key: string]: string[]}) => {
  
    const key = Object.keys(obj)[0];
    if (key === "advanced_table") return
    const orderedArray = obj[key].sort((a, b) => a.localeCompare(b));
    return { [key]: orderedArray };
  });

  return (
    <>
      {isHalloweenWeek() && <FlyingGhosts />}
      <Nav dark={dark} variant="bold" paddingTop="md">
        <TopLevelNavItem
          dark={dark}
          type={type}
          kits={kits}
          kit={kit}
          category={category}
          collapsibles={collapsibles}
          building_blocks={building_blocks}
          getting_started={getting_started}
          design_guidelines={design_guidelines}
          whats_new={whats_new}
          icons={icons}
          global_props_and_tokens={global_props_and_tokens}
        />
      </Nav>
    </>
  );
};

export default Sidebar;
