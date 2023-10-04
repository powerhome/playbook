import React from "react";
import { Background } from "playbook-ui";
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
      >
        <WelcomeComponent />
        <Background backgroundColor="white" maxWidth="xl">
          <ConnectedDevicesCard />
          <HoverCard />
          <LettuceCheckboxCard />
          <NewsNavCard />
          <NotificationsLargeCard />
          <NotificationsSmallCard />
          <OrderDetailsCard />
          <SelectPlanCard />
          <SubscribeToggleCard />
          <TicketsChartCard />
        </Background>
      </Background>
    </>
  );
};

export default HomepageHero;
