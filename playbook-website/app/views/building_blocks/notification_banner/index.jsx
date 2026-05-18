import React from "react";
import { Body, Card, Flex, Icon, Title } from "playbook-ui";

const NotificationBanner = (props) => {

  return (
    <>
    <Flex orientation="column" gap="md">
      {/* Card #1 - Success */}
      <Card
          background="success_subtle"
          highlight={{ color: 'success', position: 'side' }}
          padding="xs"
          paddingRight="sm"
      >
        <Flex
            paddingLeft="xxs"
            paddingTop="xxs"
        >
          <Flex
              paddingRight="xs"
          >
            <Icon
                icon="check"
                size="lg"
            /> 
          </Flex>
          <Flex
              gap="xxs"
              orientation="column"
          >
            <Title
                size={4}
                text="Great Job!"
            />
            <Body text="This is body text explaining what was so great!" />
          </Flex>
        </Flex>
      </Card>
      {/* Card #2 - Error */}
      <Card
          background="error_subtle"
          highlight={{ color: 'error', position: 'side' }}
          padding="xs"
          paddingRight="sm"
      >
        <Flex
            paddingLeft="xxs"
            paddingTop="xxs"
        >
          <Flex
              paddingRight="xs"
          >
            <Icon
                icon="exclamation-circle"
                size="lg"
            /> 
          </Flex>
          <Flex
              gap="xxs"
              orientation="column"
          >
            <Title
                size={4}
                text="Oh No!"
            />
            <Body text="This is body text explaining what went wrong!" />
          </Flex>
        </Flex>
      </Card>
      {/* Card #3 - Warning */}
      <Card
          background="warning_subtle"
          highlight={{ color: 'warning', position: 'side' }}
          padding="xs"
          paddingRight="sm"
      >
        <Flex
            paddingLeft="xxs"
            paddingTop="xxs"
        >
          <Flex
              paddingRight="xs"
          >
            <Icon
                icon="exclamation-triangle"
                size="lg"
            /> 
          </Flex>
          <Flex
              gap="xxs"
              orientation="column"
          >
            <Title
                size={4}
                text="Watch Out!"
            />
            <Body text="This is body text explaining what to watch out for!" />
          </Flex>
        </Flex>
      </Card>
      {/* Card #4 - Neutral */}
      <Card
          background="neutral_subtle"
          highlight={{ color: 'neutral', position: 'side' }}
          padding="xs"
          paddingRight="sm"
      >
        <Flex
            paddingLeft="xxs"
            paddingTop="xxs"
        >
          <Flex
              paddingRight="xs"
          >
            <Icon
                icon="info-circle"
                size="lg"
            /> 
          </Flex>
          <Flex
              gap="xxs"
              orientation="column"
          >
            <Title
                size={4}
                text="Some information"
            />
            <Body text="This is body text explaining something for you" />
          </Flex>
        </Flex>
      </Card>
      {/* Card #5 - Info: Showing Long Text with No Width Restriction */}
      <Card
          background="info_subtle"
          highlight={{ color: 'info', position: 'side' }}
          padding="xs"
          paddingRight="sm"
      >
        <Flex
            paddingLeft="xxs"
            paddingTop="xxs"
        >
          <Flex
              paddingRight="xs"
          >
            <Icon
                icon="info-circle"
                size="lg"
            /> 
          </Flex>
          <Flex
              gap="xxs"
              orientation="column"
          >
            <Title
                size={4}
                text="Some information!"
            />
            <Body text="This is body text explaining something for you that is long but has no width restriction so will span the width of the page!" />
          </Flex>
        </Flex>
      </Card>
      {/* End of example stop here if copy+pasting */}
    </Flex>
    </>
  );
}

export default NotificationBanner;