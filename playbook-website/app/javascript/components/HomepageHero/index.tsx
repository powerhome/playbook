import React, { useState, useEffect } from "react";
import { Background } from "playbook-ui";
import MaxScreen from "./HeroComponents/MaxScreen";
import MediumScreen from "./HeroComponents/MediumScreen";
import SmallScreen from "./HeroComponents/SmallScreen";

const HomepageHero = () => {
  const [isMax, setIsMax] = useState(window.innerWidth > 1376);
  const [isMedium, setIsMedium] = useState(window.innerWidth > 1218);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMax(window.innerWidth > 1376);
      setIsMedium(window.innerWidth > 1218);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setIsMax(window.innerWidth > 1376);
        setIsMedium(window.innerWidth > 1218);
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
      {isMax ? <MaxScreen /> : isMedium ? <MediumScreen /> : <SmallScreen />}
    </Background>
  );
};

export default HomepageHero;
