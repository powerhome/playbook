import React, { useState, useEffect } from "react";
import { Background } from "playbook-ui";
import MaxScreen from "./HeroComponents/MaxScreen";
import MediumScreen from "./HeroComponents/MediumScreen";

const HomepageHero = () => {
  const [isMax, setIsMax] = useState(window.innerWidth > 1376);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMax(window.innerWidth > 1376);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setIsMax(window.innerWidth > 1376);
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
      {isMax ? <MaxScreen /> : <MediumScreen />}
    </Background>
  );
};

export default HomepageHero;
