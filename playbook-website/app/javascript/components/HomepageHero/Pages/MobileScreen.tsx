import React from "react";
import { Background } from "playbook-ui";
import type { HomepageHeroCTALinks } from "../ctaLinks";
import WelcomeComponent from "./Welcome";

type MobileScreenProps = {
  ctaLinks: HomepageHeroCTALinks;
};

const MobileScreen = ({ ctaLinks }: MobileScreenProps) => {
  return (
    <>
      <Background
        alignItems="center"
        backgroundColor="white"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        paddingY="md"
      >
        <WelcomeComponent
          buttonFullWidth={true}
          buttonsAlignment="center"
          buttonsFlexDirection="column"
          displayProps={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          exploreComponentsLink={ctaLinks.exploreComponents}
          fixedSize="374px"
          getStartedLink={ctaLinks.getStarted}
          headerAlign="center"
          titleSize={3}
        />
      </Background>
    </>
  );
};

export default MobileScreen;
