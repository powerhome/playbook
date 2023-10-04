import React, { useState } from "react";
import { Flex, Card, Toggle, Body } from "playbook-ui";

const SubscribeToggleCard = () => {
  const [isSubscribed, setIsSubscribed] = useState(true);
  const handleSetIsSubscribed = ({ target }) => {
    setIsSubscribed((target.value = !isSubscribed));
  };

  return (
    <div className="SubscribeToggle">
      <Flex>
        <Card
          className="card-min-width"
          borderNone
          borderRadius="xl"
          shadow="deep"
          paddingY="sm"
        >
          <Flex align="center" justify="between" gap="xs">
            <Toggle>
              <input
                onChange={handleSetIsSubscribed}
                checked={isSubscribed}
                type="checkbox"
              />
            </Toggle>
            <Body
              color="light"
              text={
                isSubscribed === true
                  ? "Subscribed to weekly updates"
                  : "Subscribe to weekly updates"
              }
            />
          </Flex>
        </Card>
      </Flex>
    </div>
  );
};

export default SubscribeToggleCard;
