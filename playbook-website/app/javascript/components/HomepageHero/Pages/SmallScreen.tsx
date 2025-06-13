import React from "react";
import { Background, Image } from "playbook-ui";
import WelcomeComponent from "./Welcome";
import BlurBackground from "./BlurBackground";
import {
  ConnectedDevicesCard,
  OrderDetailsCard,
  SubscribeToggleCard,
  TicketsChartCard,
} from "../HeroComponents";

// @ts-ignore
import GridSmall from "../../../images/SmallBackgroundGrid.svg";

const SmallScreen = () => {
  return (
    <>
      <Background
        alignItems="center"
        backgroundColor="white"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        paddingTop="xl"
        paddingBottom="sm"
        width="xl"
      >
        <WelcomeComponent
          fixedSize="599px"
          headerAlign="center"
          buttonsAlignment="center"
          displayProps={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        />
      </Background>

      <Background
        className="homepage_hero_container_cards"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <Image
          url={GridSmall}
          className="homepage_hero_container_cards_grid3"
        />
        <BlurBackground
          firstBlurClass="blur_5"
          firstBlurHeight="129px"
          firstBlurWidth="128px"
          secondBlurClass="blur_6"
          secondBlurHeight="160px"
          secondBlurWidth="252px"
        />

        <ConnectedDevicesCard />
        <OrderDetailsCard />
        <SubscribeToggleCard />
        <TicketsChartCard />
      </Background>
    </>
  );
};

export default SmallScreen;
