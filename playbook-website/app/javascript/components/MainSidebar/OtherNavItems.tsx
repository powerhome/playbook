import React from "react";
import { NavItem } from "playbook-ui";
import { VisualGuidelinesItems } from "./MenuData/GuidelinesNavItems";

export const renderOtherNavItems = (name, currentURL, dark, samples, guides_nav) => {
  const samplesMenu: string[] = [];

  //Get samples pages from Samples yml file
  for (const key in samples) {
    if (samples.hasOwnProperty(key)) {
      samples[key].forEach((item: string) => samplesMenu.push(item));
    }
  }

  //transform text from samples yml
  const transformMenuTitle = (link) => {
    const words = link
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));

    return words.join(" ");
  };

  return (
    <>
      {name === "Tokens & Guidelines" &&
        VisualGuidelinesItems.map(({ name, link }, i) => (
          <>
            <NavItem
              active={link === currentURL}
              cursor="pointer"
              dark={dark}
              fontSize="small"
              key={`${link}-${i}`}
              link={link}
              marginBottom="none"
              marginTop="xxs"
              text={name}
              paddingY="xxs"
            />
          </>
        ))}
      {name === "UI Samples" && (
        <>
          {samplesMenu.map((link, i) => (
            <NavItem
              active={`/samples/${link}` === currentURL}
              cursor="pointer"
              dark={dark}
              fontSize="small"
              key={`${link}-${i}`}
              link={`/samples/${link}`}
              marginBottom="none"
              marginTop="xxs"
              text={transformMenuTitle(link)}
              paddingY="xxs"
            />
          ))}
        </>
      )}
      {name === "Getting Started" && (
        <>
          {guides_nav && guides_nav.pages.map((link, i) => (
            <NavItem
              active={`/${link.url}` === currentURL}
              cursor="pointer"
              dark={dark}
              fontSize="small"
              key={`${link.title}-${i}`}
              link={`/${link.url}`}
              marginBottom="none"
              marginTop="xxs"
              text={link.title}
              paddingY="xxs"
            />
          ))}
        </>
      )}
    </>
  );
};
