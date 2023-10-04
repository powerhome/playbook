import React from "react";
import { Background, Flex } from "playbook-ui";
import WelcomeComponent from "./HeroComponents/Welcome";
import ConnectedDevicesCard from "./HeroComponents/ConnectedDevices";
import HoverCard from "./HeroComponents/Hover";
import LettuceCheckboxCard from "./HeroComponents/LettuceCheckbox";
import NewsNavCard from "./HeroComponents/NewsNav";
import NotificationsLargeCard from "./HeroComponents/NotificationsLarge";
import NotificationsSmallCard from "./HeroComponents/NotificationsSmall";
import OrderDetailsCard from "./HeroComponents/OrderDetals";
import SelectPlanCard from "./HeroComponents/SelectPlan";
import SubscribeToggleCard from "./HeroComponents/SubscribeToggle";
import TicketsChartCard from "./HeroComponents/TicketsChart";

const HomepageHero = () => {
  return (
    <>
      <Background
        className="homepage_hero_container"
        paddingX="md"
        paddingTop="xl"
        backgroundColor="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <WelcomeComponent />
        <TicketsChartCard />
        <NotificationsLargeCard />
        {/* <NewsNavCard /> */}
        <ConnectedDevicesCard />
        <HoverCard />
        <LettuceCheckboxCard />
        {/* <NotificationsSmallCard /> */}
        <OrderDetailsCard />
        <SelectPlanCard />
        <SubscribeToggleCard />
      </Background>
    </>
  );
};

export default HomepageHero;
