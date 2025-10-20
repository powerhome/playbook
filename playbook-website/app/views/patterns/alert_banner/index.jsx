import React from "react";
import { Body, Card, Flex, Icon, Title } from "playbook-ui";

const AlertBanner = (props) => {

  return (
    <>
    <Flex orientation="column" gap="md">
      {/* Card #1 - Success */}
      <Card
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
              paddingTop="xs"
          >
            <Icon
                color="success"
                icon="check-circle"
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
              paddingTop="xs"
          >
            <Icon
                color="error"
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
              paddingTop="xs"
          >
            <Icon
                color="warning"
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
              paddingTop="xs"
          >
            <Icon
                color="neutral"
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
              paddingTop="xs"
          >
            <Icon
                color="info"
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
      {/* Card #6 - Primary: Showing Long Text with Width Restriction */}
      <Card
          highlight={{ color: 'primary', position: 'side' }}
          padding="xs"
          paddingRight="sm"
          width="sm"
      >
        <Flex
            paddingLeft="xxs"
            paddingTop="xxs"
        >
          <Flex
              paddingRight="xs"
              paddingTop="xs"
          >
            <Icon
                color="primary"
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
            <Body text="This is body text explaining something for you that is long and wraps to the next line because the card has a width restriction in place" />
          </Flex>
        </Flex>
      </Card>
      {/* End of example stop here if copy+pasting */}
    </Flex>
    </>
  );
}

export default AlertBanner;