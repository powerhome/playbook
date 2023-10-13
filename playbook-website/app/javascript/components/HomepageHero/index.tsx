import React, { useState, useEffect } from "react";
import { Background } from "playbook-ui";
import MaxScreen from "./HeroComponents/MaxScreen";
import MediumScreen from "./HeroComponents/MediumScreen";
import SmallScreen from "./HeroComponents/SmallScreen";
import MobileScreen from "./HeroComponents/MobileScreen";

const HomepageHero = () => {
  const [isMax, setIsMax] = useState(window.innerWidth > 1376);
  const [isMedium, setIsMedium] = useState(window.innerWidth > 1218);
  const [isMobile, setIsMobile] = useState(window.innerWidth > 575);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMax(window.innerWidth > 1376);
      setIsMedium(window.innerWidth > 1218);
      setIsMobile(window.innerWidth > 575);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setIsMax(window.innerWidth > 1376);
        setIsMedium(window.innerWidth > 1218);
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
      {isMax ? (
        <MaxScreen />
      ) : isMedium ? (
        <MediumScreen />
      ) : isMobile ? (
        <SmallScreen />
      ) : (
        <MobileScreen />
      )}
    </Background>
  );
};

export default HomepageHero;
