import { useState, useEffect } from "react";
import { NavItem } from "playbook-ui";
import { useNavigate, useLocation } from "react-router-dom";

type CollapsibleGroupConfig = {
  parentKey: string;
  childPrefix: string;
  stripNamePrefix: RegExp;
};

const COLLAPSIBLE_GROUPS: CollapsibleGroupConfig[] = [
  {
    parentKey: "flex_box",
    childPrefix: "flex_box_",
    stripNamePrefix: /^Flex Box\s+/,
  },
  {
    parentKey: "grid",
    childPrefix: "grid_",
    stripNamePrefix: /^Grid\s+/,
  },
];

export const OtherNavItems = ({
  name,
  dark,
  updateTopLevelNav,
  parentIndex,
  getting_started,
  design_guidelines,
  whats_new,
  global_props_and_tokens,
}: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentURL = location.pathname + location.search;

  const createLink = (path: string) => path;

  let menuItems: { [key: string]: string }[] | string[] = [];

  const guidesNavItems = getting_started["pages"].map((guide) => ({
    name: guide.title,
    link: createLink(`/${guide.url}`),
  }));

  const designGuidesNavItems = design_guidelines["pages"].map((guide) => ({
    name: guide.title,
    link: createLink(`/${guide.url}`),
  }));

  const whatsNewNavItems = whats_new["pages"].map((guide) => ({
    name: guide.title,
    link: createLink(`/${guide.url}`),
  }));

  const globalPropsMenu =
    global_props_and_tokens?.global_props
      ?.map((item: string) => {
        let displayName = item
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char: string) => char.toUpperCase());

        const menuItem: any = {
          name: displayName,
          link: createLink(`/global_props/${item}`),
          itemKey: item,
        };

        const group = COLLAPSIBLE_GROUPS.find(
          (g) => item === g.parentKey || item.startsWith(g.childPrefix)
        );

        if (group) {
          if (item === group.parentKey) {
            menuItem.tag = `${group.parentKey}_parent`;
          } else {
            menuItem.tag = `${group.parentKey}_child`;
            menuItem.name = displayName.replace(group.stripNamePrefix, "");
          }
        }

        return menuItem;
      })
      .sort((a, b) => a.name.localeCompare(b.name)) || [];

  const tokensMenu =
    global_props_and_tokens?.tokens
      ?.map((item: Record<string, any>) => ({
        name: item
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char: string) => char.toUpperCase()),
        link: createLink(`/tokens/${item}`),
      }))
      .sort((a, b) => a.name.localeCompare(b.name)) || [];

  if (name === "Global Props") {
    menuItems = globalPropsMenu;
  } else if (name === "Tokens") {
    menuItems = tokensMenu;
  } else if (name === "Getting Started") {
    menuItems = guidesNavItems;
  } else if (name === "Design Guidelines") {
    menuItems = designGuidesNavItems;
  } else if (name === "What's New") {
    menuItems = whatsNewNavItems;
  }

  const handleItemClick = (link) => {
    if (navigate) {
      navigate(link.link);
    }
    updateTopLevelNav(parentIndex);
  };

  const activeForItems = (link) => {
    const normalizedCurrentURL = currentURL.replace(/\/(react|rails)$/, "");
    return link.link === currentURL || link.link === normalizedCurrentURL;
  };

  const collapsibleTags = COLLAPSIBLE_GROUPS.flatMap((g) => [
    `${g.parentKey}_parent`,
    `${g.parentKey}_child`,
  ]);

  const otherItems = menuItems.filter(
    (item: any) => !item?.tag || !collapsibleTags.includes(item.tag)
  );

  const groups = COLLAPSIBLE_GROUPS.map((config) => {
    const parent = menuItems.find(
      (item: any) => item?.tag === `${config.parentKey}_parent`
    );
    const children = menuItems.filter(
      (item: any) => item?.tag === `${config.parentKey}_child`
    );
    return { config, parent, children };
  }).filter((g) => g.parent);

  const allItemsToRender: any[] = [...otherItems];

  groups.forEach(({ config, parent, children }) => {
    const insertIndex = allItemsToRender.findIndex(
      (item: any) =>
        ((item as any).name as string).localeCompare(
          (parent as any).name as string
        ) > 0
    );
    const parentWithFlag = {
      ...(parent as any),
      isCollapsibleParent: true,
      groupKey: config.parentKey,
      children,
    };
    if (insertIndex === -1) {
      allItemsToRender.push(parentWithFlag);
    } else {
      allItemsToRender.splice(insertIndex, 0, parentWithFlag);
    }
  });

  const [collapsedByGroup, setCollapsedByGroup] = useState<
    Record<string, boolean>
  >(() =>
    Object.fromEntries(
      COLLAPSIBLE_GROUPS.map((g) => [
        g.parentKey,
        !currentURL.startsWith(`/global_props/${g.parentKey}`),
      ])
    )
  );

  useEffect(() => {
    COLLAPSIBLE_GROUPS.forEach((g) => {
      if (currentURL.startsWith(`/global_props/${g.parentKey}`)) {
        setCollapsedByGroup((prev) => ({ ...prev, [g.parentKey]: false }));
      }
    });
  }, [location.pathname]);

  return (
    <>
      {allItemsToRender.map((link: any, i: number) => {
        if (link.isCollapsibleParent) {
          const children = link.children || [];
          const isOnChildPage = children.some((child: any) => {
            const normalizedCurrentURL = currentURL.replace(
              /\/(react|rails)$/,
              ""
            );
            return (
              child.link === currentURL || child.link === normalizedCurrentURL
            );
          });

          const isParentActive =
            !isOnChildPage &&
            (currentURL === link.link ||
              currentURL.replace(/\/(react|rails)$/, "") === link.link);

          const collapsed = collapsedByGroup[link.groupKey] ?? true;

          return (
            <NavItem
              active={isParentActive}
              collapsed={collapsed}
              collapsible={children.length > 0}
              collapsibleTrail={children.length > 0}
              cursor="pointer"
              dark={dark}
              fontSize="small"
              iconRight={children.length > 0 ? ["plus", "minus"] : undefined}
              key={`${link.link}-${link.groupKey}-parent`}
              marginBottom="none"
              marginTop="xxs"
              onClick={() => handleItemClick(link)}
              onIconRightClick={
                children.length > 0
                  ? () =>
                      setCollapsedByGroup((prev) => ({
                        ...prev,
                        [link.groupKey]: !prev[link.groupKey],
                      }))
                  : undefined
              }
              paddingY="xxs"
              text={link.name}
            >
              {children.map((child: any, childIndex: number) => (
                <NavItem
                  active={activeForItems(child)}
                  cursor="pointer"
                  dark={dark}
                  fontSize="small"
                  key={`${child.link}-${childIndex}`}
                  marginBottom="none"
                  marginTop="xxs"
                  onClick={() => handleItemClick(child)}
                  paddingY="xxs"
                  text={child.name}
                />
              ))}
            </NavItem>
          );
        }

        return (
          <NavItem
            active={activeForItems(link)}
            cursor="pointer"
            dark={dark}
            fontSize="small"
            key={`${link.link}-${i}`}
            marginBottom="none"
            marginTop="xxs"
            onClick={() => handleItemClick(link)}
            paddingY="xxs"
            text={link.name}
          />
        );
      })}
    </>
  );
};
