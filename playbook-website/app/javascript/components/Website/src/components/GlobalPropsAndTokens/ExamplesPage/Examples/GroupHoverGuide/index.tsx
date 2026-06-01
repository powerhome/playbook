import {
  Flex,
  Card,
  User,
  Caption,
  Avatar,
  FlexItem,
  IconCircle,
} from "playbook-ui";

const GroupHoverGuide = () => {
  return (
    <Flex width="100%" justify="between">
      <FlexItem fixedSize="48%">
        <Card background="neutral_subtle" cursor="pointer" padding="sm">
          <Flex align="center" justify="between">
            <Flex align="center">
              <Avatar
                imageAlt="Anna Black"
                imageUrl="https://randomuser.me/api/portraits/women/44.jpg"
                marginRight="xs"
                name="Anna Black"
                size="md"
              />
              <User
                align="center"
                name="Anna Black"
                orientation="horizontal"
                size="md"
                title="Remodeling Consultant"
              />
            </Flex>
          </Flex>
          <Caption
            size="xs"
            text="Hello!"
            textAlign="center"
          />
        </Card>
        <Caption textAlign="center" size="xs" marginTop="xs">
          False
        </Caption>
      </FlexItem>
      <FlexItem fixedSize="48%">
        <Card
          background="neutral_subtle"
          cursor="pointer"
          groupHover
          hover={{ background: "warning_subtle" }}
          padding="sm"
        >
          <Flex align="center" justify="between">
            <Flex align="center">
              <Avatar
                groupHover
                hover={{ scale: "lg" }}
                imageAlt="Anna Black"
                imageUrl="https://randomuser.me/api/portraits/women/44.jpg"
                marginRight="xs"
                name="Anna Black"
                size="md"
              />
              <User
                align="center"
                groupHover
                hover={{ shadow: "deep", background: "success_subtle" }}
                name="Anna Black"
                orientation="horizontal"
                size="md"
                title="Remodeling Consultant"
              />
            </Flex>
            <IconCircle
              groupHover
              hover={{ visible: true }}
              icon="👻"
              size="md"
              variant="royal"
            />
          </Flex>
          <Caption
            groupHover
            hover={{ color: "error", underline: true }}
            size="xs"
            text="Hello!"
            textAlign="center"
          />
        </Card>
        <Caption textAlign="center" size="xs" marginTop="xs">
          True
        </Caption>
      </FlexItem>
    </Flex>
  );
};
export default GroupHoverGuide;
