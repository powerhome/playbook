import React from "react";
import { Background, Image } from "playbook-ui";
import WelcomeComponent from "./Welcome";
import ConnectedDevicesCard from "../HeroComponents/ConnectedDevices";
import HoverCard from "../HeroComponents/Hover";
import LettuceCheckboxCard from "../HeroComponents/LettuceCheckbox";
import NotificationsLargeCard from "../HeroComponents/NotificationsLarge";
import OrderDetailsCard from "../HeroComponents/OrderDetails";
import SelectPlanCard from "../HeroComponents/SelectPlan";
import SubscribeToggleCard from "../HeroComponents/SubscribeToggle";
import TicketsChartCard from "../HeroComponents/TicketsChart";
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
