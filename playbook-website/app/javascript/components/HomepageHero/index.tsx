import React from "react";
import {
  Background,
} from "playbook-ui";
import WelcomeComponent from "./HeroComponents/Welcome";


const HomepageHero = () => {
  return (
    <>
      <Background
        className="homepage_hero_container"
        paddingX="md"
        paddingTop="xl"
        backgroundColor="white"
      >
        <WelcomeComponent/>
        <Background maxWidth="xl">
          

        </Background>
      </Background>
    </>
  );
};

export default HomepageHero;
