import React, { useState } from "react";
import {
  Flex,
  Card,
  Background,
  SectionSeparator,
  Avatar,
  Title,
  Body,
  Caption,
  Button,
  Icon,
  Badge,
} from "playbook-ui";

const NotificationsLargeCard = () => {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [declined, setDeclined] = useState(false);

  const acceptButtonClicked = () => {
    setLoading(true);

    setTimeout(() => {
      setAccepted(true);
    }, 1000);
  };

  const declineButtonClicked = () => {
    setLoading1(true);

    setTimeout(() => {
      setDeclined(true);
    }, 1000);
  };

  return (
    <div className="NotificationsLarge">
      <Card
        borderNone
        borderRadius="xl"
        shadow="deep"
        padding="none"
        maxWidth="sm"
      >
        <Card.Body padding="none">
          <Background
            className="background-min-height"
            backgroundColor="light"
            paddingY="lg"
            paddingX="md"
          >
            <Flex gap="xs">
              {" "}
              <Avatar
                imageAlt="Jessica Smith"
                imageUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80"
                name="Jessica Smith"
                size="md"
                status="available"
              />
              <Flex
                orientation="column"
                paddingLeft="xxs"
                gap="xxs"
                align="stretch"
              >
                <Body>
                  <b>Jessica Smith</b> wants to edit{" "}
                  <b> Playbook Design Avatars</b>
                </Body>
                <Caption size="xs" text="13 min ago" />
                <Flex
                  gap="xs"
                  paddingTop="xs"
                  display={accepted || declined === true ? "none" : ""}
                >
                  <Button
                    onClick={acceptButtonClicked}
                    size="sm"
                    text={
                      loading === true ? <Icon icon="spinner" spin /> : "Accept"
                    }
                    className="button-padding"
                  />
                  <Button
                    onClick={declineButtonClicked}
                    size="sm"
                    variant="secondary"
                    text={
                      loading1 === true ? (
                        <Icon icon="spinner" spin />
                      ) : (
                        "Decline"
                      )
                    }
                    className="button-padding"
                  />
                </Flex>
                <Flex
                  display={accepted || declined === true ? "" : "none"}
                  justify="end"
                >
                  <Badge
                    variant={accepted === true ? "success" : "error"}
                    text={accepted === true ? "Accepted" : "Declined"}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Background>
        </Card.Body>
        <SectionSeparator card />
        <Card.Body>
          <Flex gap="xs">
            {" "}
            <Avatar
              imageAlt="Nick Amand"
              imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
              name="Nick Amand"
              size="md"
            />
            <Flex orientation="column" gap="xxs" paddingLeft="xxs">
              <Body>
                <b>Nick Amand</b> published to <b> Alerts & Status</b>
              </Body>
              <Caption size="xs" text="2 hours ago" />
              <Flex gap="xs" paddingTop="xs">
                <Title color="link" text={<Icon icon="file-lines" />} />
                <Flex orientation="column">
                  <Title size={4} text="Alerts & Status" />
                  <Caption size="xs" text="2.4 MB" />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NotificationsLargeCard;
