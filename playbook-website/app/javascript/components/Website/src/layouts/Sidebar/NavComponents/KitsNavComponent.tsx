import { useState, useEffect } from "react";
import { NavItem } from "playbook-ui";
import { useNavigate, useLocation } from "react-router-dom";
import { linkFormat } from "../../../../../../utilities/website_sidebar_helper";

export const kitsType = (type: string | null | undefined) => {
  if (type === null || type === undefined) {
    return "react";
  } else {
    return type;
  }
};

export const KitsNavItem = ({
  link,
  kitIndex,
  collapsibles,
  type,
  dark,
  updateTopLevelNav,
  parentIndex,
}: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentURL = location.pathname + location.search;
  const [collapsed] = collapsibles[kitIndex];
  //set up custom toggling
  const handleMainClick = (index:number, categoryKey:string) => {
    const linkPath = generateLink(categoryKey, null, type);
    if (linkPath && navigate) {
      navigate(linkPath);
    }
    
    collapsibles.forEach(([, , setCollapsed], idx) => {
      if (idx === index) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
      updateTopLevelNav(parentIndex);
    });
    //return true at end to disable default collapsible behavior
    return true;
  };

  //make sure kits nav will stay toggled open when nested item is clicked
  const updateKitsNav = (index:number) => {
    collapsibles.forEach((collapsible:any, i:number) => {
      const [, , setCollapsed] = collapsible;
      if (i !== index) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    });
  };

  //click on nested items
  const handleSubItemClick = (subLinkIndex:number, sublink:string, Index:number) => {
    const linkPath = generateLink(Object.keys(link)[0], sublink, type);
    if (navigate) {
      navigate(linkPath);
    }
    
    updateTopLevelNav(parentIndex);
    updateKitsNav(Index);
  };

  //click on non-collapsible navitem click
  const handleNonCollapseLinkClick = (linkName:string) => {
    const linkPath = generateLink(null, linkName, type);
    if (navigate) {
      navigate(linkPath);
    }
    
    updateTopLevelNav(parentIndex);
  };

  const generateLink = (categoryKey:string, sublink:string | null, type:string | null | undefined) => {
    const basePrefix = "/beta";
    
    if (sublink) {
      if (categoryKey === "advanced_table") {
        return `${basePrefix}/kits/advanced_table/${sublink}/${kitsType(type)}`;
      } else {
        return `${basePrefix}/kits/${sublink}/${kitsType(type)}`;
      }
    } else {
      return `${basePrefix}/kit_category/${categoryKey}?type=${kitsType(type)}`;
    }
  };

  if (typeof link === "object") {
    const categoryKey = Object.keys(link)[0];
    const sublinks = link[categoryKey];
    
    // Check if any child is active - use exact path matching
    const hasActiveSublink = sublinks.some((sublink:string) => {
      if (categoryKey === "advanced_table") {
        // For advanced_table, check for /kits/advanced_table/sublink/ pattern
        const exactPath = `/beta/kits/advanced_table/${sublink}/`;
        return currentURL.startsWith(exactPath) || currentURL.includes(`/kits/advanced_table/${sublink}/react`) || currentURL.includes(`/kits/advanced_table/${sublink}/rails`);
      } else {
        const exactPath = `/beta/kits/${sublink}/`;
        return currentURL.startsWith(exactPath) || currentURL.includes(`/kits/${sublink}/react`) || currentURL.includes(`/kits/${sublink}/rails`);
      }
    });
    
    // Parent category should only be active if we're on the category page itself, not a sublink
    const isActiveCategory = currentURL.includes(`/kit_category/${categoryKey}`) && !hasActiveSublink;

    //useState for handling collapsed state - should be expanded if any child is active
    const [toggleNav, setToggleNav] = useState(
      !(isActiveCategory || hasActiveSublink)
    );
    
    //useEffect to handle toggle - auto-expand if child is active
    useEffect(() => {
      // Auto-expand if we're on this category or any of its children
      if (isActiveCategory || hasActiveSublink) {
        setToggleNav(false);
      } else {
        setToggleNav(collapsed);
      }
    }, [collapsed, location]);

    //click event for right icon
    const handleIconClick = (index:number) => {
      collapsibles.forEach(([, ,], idx:number) => {
        if (idx === index) {
          toggleNav === true ? setToggleNav(false) : setToggleNav(true);
        }
      });
    };

    const calculateIsActiveCategory = (i:number, categoryKey:string | null, sublink:string | null) => {
      if (sublink) {
        // Child item - check if this specific sublink is active with exact path matching
        // For advanced_table parent, need to check advanced_table path pattern
        const parentCategoryKey = categoryKey || Object.keys(link)[0];
        if (parentCategoryKey === "advanced_table") {
          const exactPath = `/beta/kits/advanced_table/${sublink}/`;
          return currentURL.startsWith(exactPath) || currentURL.includes(`/kits/advanced_table/${sublink}/react`) || currentURL.includes(`/kits/advanced_table/${sublink}/rails`);
        } else {
          const exactPath = `/beta/kits/${sublink}/`;
          return currentURL.startsWith(exactPath) || currentURL.includes(`/kits/${sublink}/react`) || currentURL.includes(`/kits/${sublink}/rails`);
        }
      } else {
        // Category item: only active on category page, not when a child is active
        const onCategoryPage = currentURL.includes(`/kit_category/${categoryKey}`);
        const hasActiveChild = sublinks.some((sl:string) => {
          if (categoryKey === "advanced_table") {
            const exactPath = `/beta/kits/advanced_table/${sl}/`;
            return currentURL.startsWith(exactPath) || currentURL.includes(`/kits/advanced_table/${sl}/react`) || currentURL.includes(`/kits/advanced_table/${sl}/rails`);
          } else {
            const exactPath = `/beta/kits/${sl}/`;
            return currentURL.startsWith(exactPath) || currentURL.includes(`/kits/${sl}/react`) || currentURL.includes(`/kits/${sl}/rails`);
          }
        });
        return onCategoryPage && !hasActiveChild;
      }
    };

    return (
      <NavItem
        active={calculateIsActiveCategory(kitIndex, categoryKey, null)}
        collapsed={toggleNav}
        collapsible
        collapsibleTrail
        cursor="pointer"
        dark={dark}
        fontSize="small"
        iconRight={["plus", "minus"]}
        key={`${categoryKey}-${kitIndex}`}
        marginBottom="none"
        marginTop="xxs"
        onClick={() => handleMainClick(kitIndex, categoryKey)}
        onIconRightClick={() => handleIconClick(kitIndex)}
        paddingY="xxs"
        text={linkFormat(categoryKey)}
      >
        {sublinks.map((sublink:string, j:number) => (
          <NavItem
            active={calculateIsActiveCategory(j, null, sublink)}
            cursor="pointer"
            dark={dark}
            fontSize="small"
            key={`${sublink}-${j}`}
            marginY="none"
            onClick={() => handleSubItemClick(j, sublink, kitIndex)}
            paddingY="xxs"
            text={linkFormat(sublink)}
          />
        ))}
      </NavItem>
    );
  } else {
    // Non-collapsible kit: check exact path match
    const exactPath = `/beta/kits/${link}/`;
    const isActive = currentURL.startsWith(exactPath) || currentURL.includes(`/kits/${link}/react`) || currentURL.includes(`/kits/${link}/rails`);
    
    return (
      <NavItem
        active={isActive}
        cursor="pointer"
        dark={dark}
        fontSize="small"
        key={`${link}-${kitIndex}`}
        marginBottom="none"
        marginTop="xxs"
        onClick={() => handleNonCollapseLinkClick(link)}
        text={linkFormat(link)}
        paddingY="xxs"
      />
    );
  }
};
