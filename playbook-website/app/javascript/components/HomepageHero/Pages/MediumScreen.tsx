import React from "react";
import { Background, Image } from "playbook-ui";
import WelcomeComponent from "./Welcome";
import ConnectedDevicesCard from "../HeroComponents/ConnectedDevices";
import NotificationsSmallCard from "../HeroComponents/NotificationsSmall";
import OrderDetailsCard from "../HeroComponents/OrderDetails";
import SelectPlanCard from "../HeroComponents/SelectPlan";
import SubscribeToggleCard from "../HeroComponents/SubscribeToggle";
import TicketsChartCard from "../HeroComponents/TicketsChart";
// @ts-ignore
import GridMedium from "../../../images/MediumBackgroundGrid.svg";
import BlurBackground from "./BlurBackground";

const MediumScreen = () => {
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
      >
        <WelcomeComponent
          fixedSize="963px"
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
        <Image url={GridMedium} />
        <BlurBackground
          firstBlurClass="blur_3"
          firstBlurHeight="138.544px"
          firstBlurWidth="184.867px"
          secondBlurClass="blur_4"
          secondBlurHeight="359.581px"
          secondBlurWidth="479.808px"
        />
        <TicketsChartCard />
        <ConnectedDevicesCard />
        <NotificationsSmallCard />
        <OrderDetailsCard />
        <SelectPlanCard />
        <SubscribeToggleCard />
      </Background>
    </>
  );
};

export default MediumScreen;
