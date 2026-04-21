import React, { useState, useEffect } from "react";
import { Background, Flex } from "playbook-ui";
import MaxScreen from "./Pages/MaxScreen";
import MediumScreen from "./Pages/MediumScreen";
import SmallScreen from "./Pages/SmallScreen";
import MobileScreen from "./Pages/MobileScreen";
import {
  betaHomepageHeroCTALinks,
  defaultHomepageHeroCTALinks,
} from "./ctaLinks";

export type HomepageHeroProps = {
  /** When true, CTA buttons route into the beta docs app (/beta/kits, etc.). */
  beta?: boolean;
};

const HomepageHero = ({ beta = false }: HomepageHeroProps) => {
  const ctaLinks = beta ? betaHomepageHeroCTALinks : defaultHomepageHeroCTALinks;
  const [isMax, setIsMax] = useState(window.innerWidth > 1376);
  const [isMedium, setIsMedium] = useState(window.innerWidth > 1147);
  const [isMobile, setIsMobile] = useState(window.innerWidth > 575);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMax(window.innerWidth > 1376);
      setIsMedium(window.innerWidth > 1147);
      setIsMobile(window.innerWidth > 575);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setIsMax(window.innerWidth > 1376);
        setIsMedium(window.innerWidth > 1147);
        setIsMobile(window.innerWidth > 575);
      });
    };
  }, []);
  return (
    <Background
        backgroundColor="white"
        className="homepage_hero_wrapper"
        display="flex"
        justifyContent="center"
    >
      <Flex
          className="homepage_hero_container"
          marginX="md"
          maxWidth="xl"
          orientation="column"
          paddingTop="xl"
          position="relative"
          width="xl"
      >
        {isMax ? (
          <MaxScreen ctaLinks={ctaLinks} />
        ) : isMedium ? (
          <MediumScreen ctaLinks={ctaLinks} />
        ) : isMobile ? (
          <SmallScreen ctaLinks={ctaLinks} />
        ) : (
          <MobileScreen ctaLinks={ctaLinks} />
        )}
      </Flex>
    </Background>
  );
};

export default HomepageHero
