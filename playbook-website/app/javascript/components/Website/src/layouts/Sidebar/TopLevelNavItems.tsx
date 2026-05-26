import { useState, useEffect } from "react";
import { NavItem, useCollapsible } from "playbook-ui";
import { useNavigate, useLocation } from "react-router-dom";
import { KitsNavItem, kitsType } from "./NavComponents/KitsNavComponent";
import { SideBarNavItems } from "./MenuData/SidebarNavItems";
import { OtherNavItems } from "./NavComponents/OtherNavComponent";

export const TopLevelNavItem = ({
  dark,
  type,
  kits,
  kit,
  category,
  collapsibles,
  building_blocks,
  getting_started,
  design_guidelines,
  whats_new,
  global_props_and_tokens,
}: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentURL = location.pathname + location.search;
  //hook into collapsible logic for top level item
  const topLevelCollapsibles = SideBarNavItems.map(() => useCollapsible());

  //logic to make it so no navigation if already on that page(prevent unneeded rerenders)
  const TopLevelLink = (link) => {
    if (link === "/kits") {
      const kitsLink = `/kits${kitsType(type) ? `?type=${kitsType(type)}` : ""}`;
      return currentURL === kitsLink ? "" : kitsLink;
    } else {
      return currentURL === link ? "" : link;
    }
  };

  //set up toggling for top level item
  const handleComponentsClick = (item, index) => {
    const linkPath = TopLevelLink(SideBarNavItems[index].link);
    if (linkPath && navigate) {
      navigate(linkPath);
    }
    
    topLevelCollapsibles.forEach(([, , setCollapsed], idx) => {
      if (idx === index) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    });
    //return true at end to disable default collapsible behavior
    return true;
  };

  const activeTopLevel = (link, hasChildren) => {
    // Special handling for items with children
    if (hasChildren) {
      // Top level items with children should be active ONLY on their exact main page
      if (link === "/kits") {
        return currentURL === "/kits" || currentURL.startsWith("/kits?");
      }
      if (link === "/changelog") {
        return currentURL === "/changelog" || currentURL === "/changelog?";
      }
      if (link === "/guides/getting_started") {
        return currentURL === "/guides/getting_started" || currentURL === "/guides/getting_started?";
      }
      if (link === "/guides/design_guidelines") {
        return currentURL === "/guides/design_guidelines" || currentURL === "/guides/design_guidelines?";
      }
      if (link === "/global_props") {
        return currentURL === "/global_props" || currentURL === "/global_props?";
      }
      if (link === "/tokens") {
        return currentURL === "/tokens" || currentURL === "/tokens?";
      }
      
      // For other items with children, only active on exact match
      return currentURL === link || currentURL.startsWith(`${link}?`);
    }
    
    // Items without children can use startsWith
    return currentURL.startsWith(link);
  };
  
  const shouldExpandTopLevel = (link) => {
    // Expand if current URL is under this section
    if (link === "/kits") {
      return currentURL.startsWith("/kits") || currentURL.startsWith("/kit_category");
    }
    if (link === "/changelog") {
      return currentURL.startsWith("/changelog");
    }
    if (link === "/guides/getting_started") {
      return currentURL.startsWith("/guides/getting_started");
    }
    if (link === "/guides/design_guidelines") {
      return currentURL.startsWith("/guides/design_guidelines");
    }
    if (link === "/global_props") {
      return currentURL.startsWith("/global_props");
    }
    if (link === "/tokens") {
      return currentURL.startsWith("/tokens");
    }
    
    return currentURL.startsWith(link);
  };

  //extract render logic out of return for better performance
  const renderTopItems = (name, key, children, leftIcon, link, i) => {
    const [collapsed] = topLevelCollapsibles[i];

    //check if on current page for initial collapse state
    const onCurrentPage = () => {
      return shouldExpandTopLevel(link);
    };

    //use state to handle toggle logic to make sure both main click and right icon click works as expected
    const [toggleTopNav, setToggleTopNav] = useState(
      onCurrentPage() ? false : true
    );

    //sync collapsed state with collapsible hook and re-check if should be expanded on location change
    useEffect(() => {
      // If we should be expanded based on current URL, don't collapse
      if (shouldExpandTopLevel(link)) {
        setToggleTopNav(false);
      } else {
        setToggleTopNav(collapsed);
      }
    }, [collapsed, location]);

    //right icon click for top level item
    const handleComponentsIconClick = (i) => {
      topLevelCollapsibles.forEach(([, toggle], idx) => {
        if (idx === i) {
          toggleTopNav === true
            ? setToggleTopNav(false)
            : setToggleTopNav(true);
        }
      });
    };

    //callback function so top level nav item stays toggled opwn if child is clicked
    const updateTopLevelNav = (index) => {
      topLevelCollapsibles.forEach((collapsible, i) => {
        const [, , setCollapsed] = collapsible;

        if (i !== index) {
          setCollapsed(true);
        } else {
          setCollapsed(false);
        }
      });
    };

    return (
      <NavItem
        active={activeTopLevel(link, children)}
        collapsed={children && toggleTopNav}
        collapsible={children}
        collapsibleTrail={children}
        cursor="pointer"
        dark={dark}
        fontSize="small"
        fontWeight="bolder"
        iconLeft={leftIcon}
        iconRight={children && ["plus", "minus"]}
        key={key}
        marginY="none"
        onClick={() => handleComponentsClick(key, i)}
        onIconRightClick={children && (() => handleComponentsIconClick(i))}
        paddingY="xxs"
        text={name}
      >
        {children && (
          <>
            {name === "Components" ? (
              <>
                {kits.map((link, index) => (
                  <KitsNavItem
                    link={link}
                    key={`kits-nav-item-${index}`}
                    kitIndex={index}
                    collapsibles={collapsibles}
                    category={category}
                    type={type}
                    dark={dark}
                    kit={kit}
                    updateTopLevelNav={updateTopLevelNav}
                    parentIndex={i}
                  />
                ))}
              </>
            ) : (
              <OtherNavItems
                name={name}
                dark={dark}
                building_blocks={building_blocks}
                updateTopLevelNav={updateTopLevelNav}
                parentIndex={i}
                getting_started={getting_started}
                design_guidelines={design_guidelines}
                whats_new={whats_new}
                global_props_and_tokens={global_props_and_tokens}
              />
            )}
          </>
        )}
      </NavItem>
    );
  };

  return (
    <>
      {SideBarNavItems.map(({ name, key, children, leftIcon, link }, i) => {
        return renderTopItems(name, key, children, leftIcon, link, i);
      })}
    </>
  );
};
