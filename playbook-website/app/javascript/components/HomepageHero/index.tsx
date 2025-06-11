import React, { useState, useEffect } from "react";
import { Background, Flex } from "playbook-ui";
import MaxScreen from "./Pages/MaxScreen";
import MediumScreen from "./Pages/MediumScreen";
import SmallScreen from "./Pages/SmallScreen";
import MobileScreen from "./Pages/MobileScreen";

const HomepageHero = () => {
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
          <MaxScreen />
        ) : isMedium ? (
          <MediumScreen />
        ) : isMobile ? (
          <SmallScreen />
        ) : (
          <MobileScreen />
        )}
      </Flex>
    </Background>
  );
};

export default HomepageHero
