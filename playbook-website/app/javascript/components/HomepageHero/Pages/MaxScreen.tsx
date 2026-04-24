import React from "react";
import { Background, Image } from "playbook-ui";
import WelcomeComponent from "./Welcome";
import {
  ConnectedDevicesCard,
  HoverCard,
  LettuceCheckboxCard,
  NotificationsLargeCard,
  OrderDetailsCard,
  SelectPlanCard,
  SubscribeToggleCard,
  TicketsChartCard,
} from "../HeroComponents";
// @ts-ignore
import GridLarge from "../../../images/LargeBackgroundGrid.svg";
import BlurBackground from "./BlurBackground";

const MaxScreen = () => {
  return (
    <>
      <Background
        alignItems="center"
        backgroundColor="white"
        display="flex"
        flexDirection="column"
        paddingTop="xl"
      >
        <WelcomeComponent fixedSize="546px" />
      </Background>

      <Background className="homepage_hero_container_cards" position="absolute">
        <Image
          url={GridLarge}
          position="absolute"
          className="homepage_hero_container_cards_grid"
        />

        <BlurBackground
          firstBlurClass="blur_1"
          firstBlurHeight="164.619px"
          firstBlurWidth="219.661px"
          secondBlurClass="blur_2"
          secondBlurHeight="301px"
          secondBlurWidth="402px"
        />
        <TicketsChartCard />
        <NotificationsLargeCard />
        <ConnectedDevicesCard />
        <HoverCard />
        <LettuceCheckboxCard />
        <OrderDetailsCard />
        <SelectPlanCard />
        <SubscribeToggleCard />
      </Background>
    </>
  );
};

export default MaxScreen;
