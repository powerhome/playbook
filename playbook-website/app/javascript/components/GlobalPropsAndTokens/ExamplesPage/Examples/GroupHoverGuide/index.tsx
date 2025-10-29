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
        </Card>
        <Caption justifySelf="center" size="xs" marginTop="xs">
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
                name="Anna Black"
                orientation="horizontal"
                size="md"
                title="Remodeling Consultant"
              />
            </Flex>
            <IconCircle
              icon="👻"
              size="md"
              variant="royal"
              groupHover
              hover={{ visible: true }}
            />
          </Flex>
        </Card>
        <Caption justifySelf="center" size="xs" marginTop="xs">
          True
        </Caption>
      </FlexItem>
    </Flex>
  );
};
export default GroupHoverGuide;
