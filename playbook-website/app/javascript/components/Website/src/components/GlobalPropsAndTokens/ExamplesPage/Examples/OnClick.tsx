import { useState } from "react";
import {
  Avatar,
  Background,
  Body,
  Button,
  Caption,
  Card,
  Contact,
  Container,
  Currency,
  DashboardValue,
  Detail,
  Flex,
  Highlight,
  IconStatValue,
  IconValue,
  Image,
  LabelValue,
  Legend,
  List,
  ListItem,
  Message,
  MultipleUsers,
  MultipleUsersStacked,
  Person,
  ProgressStep,
  ProgressStepItem,
  StatValue,
  Table,
  Timeline,
  Title,
  TitleCount,
  TitleDetail,
  LabelPill,
  Pill,
  OnlineStatus,
  Source,
  StatChange,
  User,
  UserBadge,
} from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const clickableDemoHtmlOptions = {
  style: { userSelect: "none" as const },
};

const clickablePointerHtmlOptions = {
  style: { cursor: "pointer" as const, userSelect: "none" as const },
};

const InteractiveExample = ({
  children,
  count,
  label,
  reset,
  statusText,
}: {
  children: React.ReactNode,
  count?: number,
  label?: string,
  reset: () => void,
  statusText?: string,
}) => {
  const summary =
    statusText ||
    `${label}: ${count} click${count === 1 ? "" : "s"}`;

  return (
    <Flex flexDirection="column" gap="xs" width="100%">
      {children}
      <Body color="light" text={summary} />
      <Button
          onClick={reset}
          size="sm"
          text="Reset"
          variant="secondary"
      />
    </Flex>
  );
};

const OnClick = () => {
  const VisualGuideCard = () => {
    const [avatarClicks, setAvatarClicks] = useState(0);
    const [backgroundClicks, setBackgroundClicks] = useState(0);
    const [bodyClicks, setBodyClicks] = useState(0);
    const [captionClicks, setCaptionClicks] = useState(0);
    const [cardClicks, setCardClicks] = useState(0);
    const [contactClicks, setContactClicks] = useState(0);
    const [containerClicks, setContainerClicks] = useState(0);
    const [currencyClicks, setCurrencyClicks] = useState(0);
    const [dashboardValueClicks, setDashboardValueClicks] = useState(0);
    const [detailClicks, setDetailClicks] = useState(0);
    const [flexClicks, setFlexClicks] = useState(0);
    const [highlightClicks, setHighlightClicks] = useState(0);
    const [iconStatValueClicks, setIconStatValueClicks] = useState(0);
    const [iconValueClicks, setIconValueClicks] = useState(0);
    const [imageClicks, setImageClicks] = useState(0);
    const [labelValueClicks, setLabelValueClicks] = useState(0);
    const [legendClicks, setLegendClicks] = useState({ windows: 0, doors: 0, roofing: 0 });
    const [listItemClicks, setListItemClicks] = useState({ one: 0, two: 0, three: 0 });
    const [messageClicks, setMessageClicks] = useState(0);
    const [multipleUsersClicks, setMultipleUsersClicks] = useState(0);
    const [multipleUsersStackedClicks, setMultipleUsersStackedClicks] = useState(0);
    const [progressStepItemClicks, setProgressStepItemClicks] = useState({
      ordered: 0,
      shipped: 0,
      delivered: 0,
    });
    const [personClicks, setPersonClicks] = useState(0);
    const [statValueClicks, setStatValueClicks] = useState(0);
    const [timelineItemClicks, setTimelineItemClicks] = useState({
      started: 0,
      trip: 0,
      resolved: 0,
    });
    const [titleClicks, setTitleClicks] = useState(0);
    const [labelPillClicks, setLabelPillClicks] = useState(0);
    const [pillClicks, setPillClicks] = useState(0);
    const [onlineStatusClicks, setOnlineStatusClicks] = useState(0);
    const [sourceClicks, setSourceClicks] = useState(0);
    const [statChangeClicks, setStatChangeClicks] = useState(0);
    const [titleCountClicks, setTitleCountClicks] = useState(0);
    const [titleDetailClicks, setTitleDetailClicks] = useState(0);
    const [userClicks, setUserClicks] = useState(0);
    const [userBadgeClicks, setUserBadgeClicks] = useState(0);
    const [buttonClicks, setButtonClicks] = useState(0);

    return (
      <Flex gap="sm" wrap width="100%">
        <Card padding="md" width="sm">
          <Title size={4} text="Avatar" />
          <InteractiveExample
              count={avatarClicks}
              label="Avatar"
              reset={() => setAvatarClicks(0)}
          >
            <Avatar
                cursor="pointer"
                htmlOptions={clickableDemoHtmlOptions}
                imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
                name="Avatar Example"
                onClick={() => setAvatarClicks((prev: number) => prev + 1)}
                size="md"
            />
            <Body text="Click the above Avatar example" />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Background" />
          <InteractiveExample
              count={backgroundClicks}
              label="Background"
              reset={() => setBackgroundClicks(0)}
          >
            <Background
                cursor="pointer"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  role: "button",
                  tabIndex: 0,
                }}
                onClick={() => setBackgroundClicks((prev: number) => prev + 1)}
                padding="sm"
            >
              <Body text="Click this Background example" />
            </Background>
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Body" />
          <InteractiveExample
              count={bodyClicks}
              label="Body"
              reset={() => setBodyClicks(0)}
          >
            <Body
                cursor="pointer"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  role: "button",
                  tabIndex: 0,
                }}
                onClick={() => setBodyClicks((prev: number) => prev + 1)}
                text="Click this Body example"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Caption" />
          <InteractiveExample
              count={captionClicks}
              label="Caption"
              reset={() => setCaptionClicks(0)}
          >
            <Caption
                cursor="pointer"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  role: "button",
                  tabIndex: 0,
                }}
                onClick={() => setCaptionClicks((prev: number) => prev + 1)}
                text="Click this Caption example"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Card" />
          <InteractiveExample
              count={cardClicks}
              label="Card"
              reset={() => setCardClicks(0)}
          >
            <Card
                cursor="pointer"
                htmlOptions={clickableDemoHtmlOptions}
                onClick={() => setCardClicks((prev: number) => prev + 1)}
                padding="sm"
            >
              {"Click this Card example"}
            </Card>
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Contact" />
          <InteractiveExample
              count={contactClicks}
              label="Contact"
              reset={() => setContactClicks(0)}
          >
            <Contact
                contactType="email"
                contactValue="clickthiscontact@example.com"
                htmlOptions={clickablePointerHtmlOptions}
                onClick={() => setContactClicks((prev: number) => prev + 1)}
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Container" />
          <InteractiveExample
              count={containerClicks}
              label="Container"
              reset={() => setContainerClicks(0)}
          >
            <Container
                cursor="pointer"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  role: "button",
                  tabIndex: 0,
                }}
                onClick={() => setContainerClicks((prev: number) => prev + 1)}
            >
              <Body text="Click this Container example" />
            </Container>
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Currency" />
          <InteractiveExample
              count={currencyClicks}
              label="Currency"
              reset={() => setCurrencyClicks(0)}
          >
            <Currency
                amount="1,234.56"
                cursor="pointer"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  role: "button",
                  tabIndex: 0,
                }}
                label="Click this Currency"
                onClick={() => setCurrencyClicks((prev: number) => prev + 1)}
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Dashboard Value" />
          <InteractiveExample
              count={dashboardValueClicks}
              label="Dashboard Value"
              reset={() => setDashboardValueClicks(0)}
          >
            <DashboardValue
                cursor="pointer"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  role: "button",
                  tabIndex: 0,
                }}
                onClick={() => setDashboardValueClicks((prev: number) => prev + 1)}
                statChange={{ change: "increase", value: 12 }}
                statLabel="Click this Dashboard Value"
                statValue={{ unit: "USD", value: "98.2" }}
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Detail" />
          <InteractiveExample
              count={detailClicks}
              label="Detail"
              reset={() => setDetailClicks(0)}
          >
            <Detail
                cursor="pointer"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  role: "button",
                  tabIndex: 0,
                }}
                onClick={() => setDetailClicks((prev: number) => prev + 1)}
                text="Click this Detail example"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Flex" />
          <InteractiveExample
              count={flexClicks}
              label="Flex"
              reset={() => setFlexClicks(0)}
          >
            <Flex
                alignItems="center"
                background="light"
                borderRadius="sm"
                cursor="pointer"
                gap="xs"
                htmlOptions={clickableDemoHtmlOptions}
                onClick={() => setFlexClicks((prev: number) => prev + 1)}
                padding="sm"
            >
              <Body text="Click this Flex example" />
            </Flex>
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Highlight" />
          <InteractiveExample
              count={highlightClicks}
              label="Highlight"
              reset={() => setHighlightClicks(0)}
          >
            <Highlight
                cursor="pointer"
                highlightedText={["Highlight"]}
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  role: "button",
                  tabIndex: 0,
                }}
                onClick={() => setHighlightClicks((prev: number) => prev + 1)}
                text="Click this Highlight example"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Icon Stat Value" />
          <InteractiveExample
              count={iconStatValueClicks}
              label="Icon Stat Value"
              reset={() => setIconStatValueClicks(0)}
          >
            <IconStatValue
                cursor="pointer"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  role: "button",
                  tabIndex: 0,
                }}
                icon="heart"
                onClick={() => setIconStatValueClicks((prev: number) => prev + 1)}
                text="Click this Icon Stat Value"
                value={42}
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Icon Value" />
          <InteractiveExample
              count={iconValueClicks}
              label="Icon Value"
              reset={() => setIconValueClicks(0)}
          >
            <IconValue
                cursor="pointer"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  role: "button",
                  tabIndex: 0,
                }}
                icon="heart"
                onClick={() => setIconValueClicks((prev: number) => prev + 1)}
                text="Click this Icon Value"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Image" />
          <InteractiveExample
              count={imageClicks}
              label="Image"
              reset={() => setImageClicks(0)}
          >
            <Image
                alt="Clickable demo"
                cursor="pointer"
                htmlOptions={clickableDemoHtmlOptions}
                onClick={() => setImageClicks((prev: number) => prev + 1)}
                rounded
                size="sm"
                url="https://unsplash.it/500/400/?image=634"
            />
            <Body text="Click the above Image example" />

          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Label Pill" />
          <InteractiveExample
              count={labelPillClicks}
              label="Label Pill"
              reset={() => setLabelPillClicks(0)}
          >
            <LabelPill
                htmlOptions={clickablePointerHtmlOptions}
                label="Queue"
                onClick={() => setLabelPillClicks((prev: number) => prev + 1)}
                pillValue="4"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Label Value" />
          <InteractiveExample
              count={labelValueClicks}
              label="Label Value"
              reset={() => setLabelValueClicks(0)}
          >
            <LabelValue
                cursor="pointer"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  role: "button",
                  tabIndex: 0,
                }}
                label="Click this Label Value"
                onClick={() => setLabelValueClicks((prev: number) => prev + 1)}
                value="Summary"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="md">
          <Title size={4} text="Legend" />
          <InteractiveExample
              reset={() => setLegendClicks({ windows: 0, doors: 0, roofing: 0 })}
              statusText={`Windows: ${legendClicks.windows} · Doors: ${legendClicks.doors} · Roofing: ${legendClicks.roofing}`}
          >
            <Flex flexDirection="column" gap="xs">
              <Legend
                  color="data_1"
                  cursor="pointer"
                  htmlOptions={{
                    ...clickableDemoHtmlOptions,
                    role: "button",
                    tabIndex: 0,
                  }}
                  onClick={() =>
                    setLegendClicks((prev) => ({ ...prev, windows: prev.windows + 1 }))
                  }
                  text="Windows"
              />
              <Legend
                  color="data_2"
                  cursor="pointer"
                  htmlOptions={{
                    ...clickableDemoHtmlOptions,
                    role: "button",
                    tabIndex: 0,
                  }}
                  onClick={() =>
                    setLegendClicks((prev) => ({ ...prev, doors: prev.doors + 1 }))
                  }
                  text="Doors"
              />
              <Legend
                  color="data_3"
                  cursor="pointer"
                  htmlOptions={{
                    ...clickableDemoHtmlOptions,
                    role: "button",
                    tabIndex: 0,
                  }}
                  onClick={() =>
                    setLegendClicks((prev) => ({ ...prev, roofing: prev.roofing + 1 }))
                  }
                  text="Roofing"
              />
            </Flex>
          </InteractiveExample>
        </Card>
        <Card padding="md" width="md">
          <Title size={4} text="ListItem (subcomponent of List)" />
          <InteractiveExample
              reset={() => setListItemClicks({ one: 0, two: 0, three: 0 })}
              statusText={`Item 1: ${listItemClicks.one} · Item 2: ${listItemClicks.two} · Item 3: ${listItemClicks.three}`}
          >
            <List>
              <ListItem
                  cursor="pointer"
                  htmlOptions={{
                    ...clickableDemoHtmlOptions,
                    role: "button",
                  }}
                  onClick={() =>
                    setListItemClicks((prev) => ({ ...prev, one: prev.one + 1 }))
                  }
                  tabIndex={0}
              >
                {"Item 1"}
              </ListItem>
              <ListItem
                  cursor="pointer"
                  htmlOptions={{
                    ...clickableDemoHtmlOptions,
                    role: "button",
                  }}
                  onClick={() =>
                    setListItemClicks((prev) => ({ ...prev, two: prev.two + 1 }))
                  }
                  tabIndex={0}
              >
                {"Item 2"}
              </ListItem>
              <ListItem
                  cursor="pointer"
                  htmlOptions={{
                    ...clickableDemoHtmlOptions,
                    role: "button",
                  }}
                  onClick={() =>
                    setListItemClicks((prev) => ({ ...prev, three: prev.three + 1 }))
                  }
                  tabIndex={0}
              >
                {"Item 3"}
              </ListItem>
            </List>
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Message" />
          <InteractiveExample
              count={messageClicks}
              label="Message"
              reset={() => setMessageClicks(0)}
          >
            <Message
                cursor="pointer"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  role: "button",
                  tabIndex: 0,
                }}
                label="Clyde"
                message="Click this Message example"
                onClick={() => setMessageClicks((prev: number) => prev + 1)}
                timestamp="Now"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Multiple Users" />
          <InteractiveExample
              count={multipleUsersClicks}
              label="Multiple Users"
              reset={() => setMultipleUsersClicks(0)}
          >
            <MultipleUsers
                cursor="pointer"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  "aria-label": "Open team members",
                  role: "button",
                  tabIndex: 0,
                }}
                maxDisplayedUsers={3}
                onClick={() => setMultipleUsersClicks((prev: number) => prev + 1)}
                users={[
                  { name: "Jalen", tooltip: "Jalen" },
                  { name: "Karl-Anthony", tooltip: "Karl-Anthony" },
                  { name: "Josh", tooltip: "Josh" },
                  { name: "Mikal", tooltip: "Mikal" },
                  { name: "OG", tooltip: "OG"}
                ]}
                withTooltip
            />
            <Body text="Click the above Multiple Users example" />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Multiple Users Stacked" />
          <InteractiveExample
              count={multipleUsersStackedClicks}
              label="Multiple Users Stacked"
              reset={() => setMultipleUsersStackedClicks(0)}
          >
            <MultipleUsersStacked
                cursor="pointer"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  "aria-label": "Open stacked team members",
                  role: "button",
                  tabIndex: 0,
                }}
                onClick={() => setMultipleUsersStackedClicks((prev: number) => prev + 1)}
                users={[
                  { name: "Breanna" },
                  { name: "Sabrina" },
                  { name: "Jonquel" },
                ]}
            />
            <Body text="Click the above Multiple Users Stacked example" />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Online Status" />
          <InteractiveExample
              count={onlineStatusClicks}
              label="Online Status"
              reset={() => setOnlineStatusClicks(0)}
          >
            <OnlineStatus
                cursor="pointer"
                htmlOptions={clickableDemoHtmlOptions}
                onClick={() => setOnlineStatusClicks((prev: number) => prev + 1)}
                size="lg"
                status="online"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Person" />
          <InteractiveExample
              count={personClicks}
              label="Person"
              reset={() => setPersonClicks(0)}
          >
            <Person
                firstName="Click"
                htmlOptions={clickablePointerHtmlOptions}
                lastName="ThisPersonExample"
                onClick={() => setPersonClicks((prev: number) => prev + 1)}
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Pill" />
          <InteractiveExample
              count={pillClicks}
              label="Pill"
              reset={() => setPillClicks(0)}
          >
            <Pill
                cursor="pointer"
                htmlOptions={clickableDemoHtmlOptions}
                onClick={() => setPillClicks((prev: number) => prev + 1)}
                text="Click this Pill example"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="md">
          <Title size={4} text="ProgressStepItem (subcomponent of Progress Step)" />
          <InteractiveExample
              reset={() =>
                setProgressStepItemClicks({ ordered: 0, shipped: 0, delivered: 0 })
              }
              statusText={`Ordered: ${progressStepItemClicks.ordered} · Shipped: ${progressStepItemClicks.shipped} · Delivered: ${progressStepItemClicks.delivered}`}
          >
            <ProgressStep icon orientation="vertical">
              <ProgressStepItem
                  cursor="pointer"
                  htmlOptions={{
                    ...clickableDemoHtmlOptions,
                    role: "button",
                    tabIndex: 0,
                  }}
                  onClick={() =>
                    setProgressStepItemClicks((prev) => ({
                      ...prev,
                      ordered: prev.ordered + 1,
                    }))
                  }
                  status="complete"
              >
                {"Ordered"}
              </ProgressStepItem>
              <ProgressStepItem
                  cursor="pointer"
                  htmlOptions={{
                    ...clickableDemoHtmlOptions,
                    role: "button",
                    tabIndex: 0,
                  }}
                  onClick={() =>
                    setProgressStepItemClicks((prev) => ({
                      ...prev,
                      shipped: prev.shipped + 1,
                    }))
                  }
                  status="active"
              >
                {"Shipped"}
              </ProgressStepItem>
              <ProgressStepItem
                  cursor="pointer"
                  htmlOptions={{
                    ...clickableDemoHtmlOptions,
                    role: "button",
                    tabIndex: 0,
                  }}
                  onClick={() =>
                    setProgressStepItemClicks((prev) => ({
                      ...prev,
                      delivered: prev.delivered + 1,
                    }))
                  }
                  status="inactive"
              >
                {"Delivered"}
              </ProgressStepItem>
            </ProgressStep>
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Source" />
          <InteractiveExample
              count={sourceClicks}
              label="Source"
              reset={() => setSourceClicks(0)}
          >
            <Source
                htmlOptions={clickablePointerHtmlOptions}
                onClick={() => setSourceClicks((prev: number) => prev + 1)}
                source="Click this Source example"
                type="retail"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Stat Change" />
          <InteractiveExample
              count={statChangeClicks}
              label="Stat Change"
              reset={() => setStatChangeClicks(0)}
          >
            <StatChange
                change="increase"
                htmlOptions={clickablePointerHtmlOptions}
                onClick={() => setStatChangeClicks((prev: number) => prev + 1)}
                value="12.4"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Stat Value" />
          <InteractiveExample
              count={statValueClicks}
              label="Stat Value"
              reset={() => setStatValueClicks(0)}
          >
            <StatValue
                cursor="pointer"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  role: "button",
                  tabIndex: 0,
                }}
                onClick={() => setStatValueClicks((prev: number) => prev + 1)}
                unit="mg"
                value={104}
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="md">
          <Title size={4} text="Timeline.Item (subcomponent of Timeline)" />
          <InteractiveExample
              reset={() =>
                setTimelineItemClicks({ started: 0, trip: 0, resolved: 0 })
              }
              statusText={`Started: ${timelineItemClicks.started} · Trip: ${timelineItemClicks.trip} · Resolved: ${timelineItemClicks.resolved}`}
          >
            <Timeline orientation="vertical">
              <Timeline.Item
                  cursor="pointer"
                  htmlOptions={{
                    ...clickableDemoHtmlOptions,
                    role: "button",
                    tabIndex: 0,
                  }}
                  icon="user"
                  iconColor="royal"
                  onClick={() =>
                    setTimelineItemClicks((prev) => ({
                      ...prev,
                      started: prev.started + 1,
                    }))
                  }
              >
                <Body color="light" text="Conversation started" />
              </Timeline.Item>
              <Timeline.Item
                  cursor="pointer"
                  htmlOptions={{
                    ...clickableDemoHtmlOptions,
                    role: "button",
                    tabIndex: 0,
                  }}
                  icon="check"
                  iconColor="teal"
                  onClick={() =>
                    setTimelineItemClicks((prev) => ({
                      ...prev,
                      trip: prev.trip + 1,
                    }))
                  }
              >
                <Body color="light" text="Trip #12422" />
              </Timeline.Item>
              <Timeline.Item
                  cursor="pointer"
                  htmlOptions={{
                    ...clickableDemoHtmlOptions,
                    role: "button",
                    tabIndex: 0,
                  }}
                  icon="smile"
                  iconColor="green"
                  onClick={() =>
                    setTimelineItemClicks((prev) => ({
                      ...prev,
                      resolved: prev.resolved + 1,
                    }))
                  }
              >
                <Body color="light" text="Conversation resolved" />
              </Timeline.Item>
            </Timeline>
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Title" />
          <InteractiveExample
              count={titleClicks}
              label="Title"
              reset={() => setTitleClicks(0)}
          >
            <Title
                cursor="pointer"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  role: "button",
                  tabIndex: 0,
                }}
                onClick={() => setTitleClicks((prev: number) => prev + 1)}
                size={4}
                text="Click this Title example"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Title Count" />
          <InteractiveExample
              count={titleCountClicks}
              label="Title Count"
              reset={() => setTitleCountClicks(0)}
          >
            <TitleCount
                align="left"
                count={12}
                cursor="pointer"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  role: "button",
                  tabIndex: 0,
                }}
                onClick={() => setTitleCountClicks((prev: number) => prev + 1)}
                title="Click this Title Count"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Title Detail" />
          <InteractiveExample
              count={titleDetailClicks}
              label="Title Detail"
              reset={() => setTitleDetailClicks(0)}
          >
            <TitleDetail
                cursor="pointer"
                detail="Click anywhere on this summary"
                htmlOptions={{
                  ...clickableDemoHtmlOptions,
                  role: "button",
                  tabIndex: 0,
                }}
                onClick={() => setTitleDetailClicks((prev: number) => prev + 1)}
                title="Title Detail"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="User" />
          <InteractiveExample
              count={userClicks}
              label="User"
              reset={() => setUserClicks(0)}
          >
            <User
                avatar
                cursor="pointer"
                htmlOptions={clickableDemoHtmlOptions}
                name="Click ThisUser"
                onClick={() => setUserClicks((prev: number) => prev + 1)}
                title="Example"
            />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="User Badge" />
          <InteractiveExample
              count={userBadgeClicks}
              label="User Badge"
              reset={() => setUserBadgeClicks(0)}
          >
            <UserBadge
                badge="veteran"
                htmlOptions={clickablePointerHtmlOptions}
                onClick={() => setUserBadgeClicks((prev: number) => prev + 1)}
                size="md"
            />
            <Body text="Click the above User Badge example" />
          </InteractiveExample>
        </Card>
        <Card padding="md" width="sm">
          <Title size={4} text="Button (kit-specific)" />
          <InteractiveExample
              count={buttonClicks}
              label="Button"
              reset={() => setButtonClicks(0)}
          >
            <Button
                onClick={() => setButtonClicks((prev: number) => prev + 1)}
                text="Uses kit-specific onClick"
            />
          </InteractiveExample>
        </Card>
      </Flex>
    );
  };

  return (
    <ShowPage
      pageType="global_event_props"
      title="onClick"
      description={
        <>
          <code>onClick</code> is a Global Event Prop for React kits that opt
          into <code>GlobalEventProps</code>. It attaches a mouse event handler
          to the kit&apos;s root element and is separate from the class-based
          Global Props system. Rails kits do not support it — event handlers are
          JavaScript callbacks, so they belong in React rather than server-rendered
          props.
        </>
      }
      descriptionSecondary={
        <>
          Kits that already define their own <code>onClick</code> keep that
          kit-specific API and behavior. Use{" "}
          <code>cursor=&quot;pointer&quot;</code> and, when needed,{" "}
          <code>htmlOptions</code> for accessibility attributes like{" "}
          <code>role</code>, <code>tabIndex</code>, and an accessible name.
          Adding a role and tab stop does not add keyboard activation; use an
          appropriate native interactive element when possible, or implement
          equivalent keyboard behavior. For repeated content (Timeline.Item, ListItem,
          ProgressStepItem), attach <code>onClick</code> on each item —
          sibling items do not share a handler. These are subcomponents, so
          they do not add a Global Event Props tab on their parent kit show
          pages (List, Progress Step, Timeline). Legend attaches to its outer root
          (one Legend instance = one series entry).
        </>
      }
      VisualGuideCard={VisualGuideCard()}
    >
      <PropsExamplesTable
        headers={["Supported Kit", "Type", "React Example", "Notes"]}
        rows={[
          [
            "Avatar",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-avatar-react"
              text={`<Avatar name="Harvey Specter" onClick={() => alert("clicked")} cursor="pointer" />`}
            />,
            "Attached to the root Avatar element.",
          ],
          [
            "Body",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-body-react"
              text={`<Body onClick={() => alert("clicked")} text="Clickable body" />`}
            />,
            "Attached to the root Body element.",
          ],
          [
            "Caption",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-caption-react"
              text={`<Caption onClick={() => alert("clicked")} text="Clickable caption" />`}
            />,
            "Attached to the root Caption element.",
          ],
          [
            "Card",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-card-react"
              text={`<Card onClick={() => alert("clicked")} cursor="pointer">Content</Card>`}
            />,
            "Attached to the root Card tag.",
          ],
          [
            "Contact",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-contact-react"
              text={`<Contact contactType="email" contactValue="email@example.com" onClick={() => alert("clicked")} />`}
            />,
            "Attached to the root Contact element for styled and unstyled variants.",
          ],
          [
            "Currency",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-currency-react"
              text={`<Currency amount="100" label="Total" onClick={() => alert("clicked")} cursor="pointer" />`}
            />,
            "Attached once to the root Currency element. Label and value clicks bubble to the same handler.",
          ],
          [
            "Dashboard Value",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-dashboard-value-react"
              text={`<DashboardValue onClick={() => alert("clicked")} cursor="pointer" statLabel="Sales" statValue={{ value: 100 }} />`}
            />,
            "Attached once to the root Dashboard Value element.",
          ],
          [
            "Detail",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-detail-react"
              text={`<Detail onClick={() => alert("clicked")} text="Clickable detail" />`}
            />,
            "Attached to the root Detail element.",
          ],
          [
            "Flex",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-flex-react"
              text={`<Flex onClick={() => alert("clicked")} cursor="pointer">...</Flex>`}
            />,
            "Attached to the root Flex div.",
          ],
          [
            "Highlight",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-highlight-react"
              text={`<Highlight onClick={() => alert("clicked")} text="Clickable highlight" />`}
            />,
            "Attached to the root Highlight element.",
          ],
          [
            "Icon Stat Value",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-icon-stat-value-react"
              text={`<IconStatValue icon="heart" value={42} text="Likes" onClick={() => alert("clicked")} cursor="pointer" />`}
            />,
            "Attached once to the root Icon Stat Value element. Icon, value, and label clicks share one handler.",
          ],
          [
            "Icon Value",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-icon-value-react"
              text={`<IconValue icon="heart" text="Favorites" onClick={() => alert("clicked")} cursor="pointer" />`}
            />,
            "Attached once to the root Icon Value element.",
          ],
          [
            "Image",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-image-react"
              text={`<Image alt="Demo" url="https://example.com/image.jpg" onClick={() => alert("clicked")} cursor="pointer" />`}
            />,
            "Attached to the root Image element.",
          ],
          [
            "Label Pill",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-label-pill-react"
              text={`<LabelPill label="Queue" onClick={() => alert("clicked")} pillValue="4" />`}
            />,
            "Attached to the root Label Pill element.",
          ],
          [
            "Label Value",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-label-value-react"
              text={`<LabelValue label="Status" value="Open" onClick={() => alert("clicked")} cursor="pointer" />`}
            />,
            "Attached once to the root Label Value element for default and details variants.",
          ],
          [
            "Legend",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-legend-react"
              text={`<Legend text="Series A" onClick={() => alert("clicked")} cursor="pointer" />`}
            />,
            "Attached to the outer Legend root. Per-entry callbacks across many Legend instances stay consumer-owned.",
          ],
          [
            "ListItem (subcomponent of List)",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-list-item-react"
              text={`<ListItem onClick={() => alert("clicked")} cursor="pointer">Row</ListItem>`}
            />,
            "Attached to each ListItem root (ordinary and draggable). Sibling items keep separate handlers. Not shown on the List kit Global Event Props tab.",
          ],
          [
            "Message",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-message-react"
              text={`<Message label="Pat" message="Hello" onClick={() => alert("clicked")} cursor="pointer" />`}
            />,
            "Attached once to the root Message element. Clicks from message content and children bubble to the whole-kit handler.",
          ],
          [
            "Multiple Users",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-multiple-users-react"
              text={`<MultipleUsers users={users} withTooltip onClick={() => alert("clicked")} cursor="pointer" />`}
            />,
            "Attached once to the root Multiple Users element. Avatar, tooltip trigger, and overflow count clicks bubble to the whole-kit handler; this is not a per-user callback.",
          ],
          [
            "Multiple Users Stacked",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-multiple-users-stacked-react"
              text={`<MultipleUsersStacked users={users} onClick={() => alert("clicked")} cursor="pointer" />`}
            />,
            "Attached once to the root Multiple Users Stacked element. Avatar and overflow badge clicks bubble to the whole-kit handler; this is not a per-user callback.",
          ],
          [
            "Online Status",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-online-status-react"
              text={`<OnlineStatus cursor="pointer" onClick={() => alert("clicked")} status="online" />`}
            />,
            "Attached to the root Online Status element.",
          ],
          [
            "Person",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-person-react"
              text={`<Person firstName="Harvey" lastName="Specter" onClick={() => alert("clicked")} />`}
            />,
            "Attached to the root Person element.",
          ],
          [
            "Pill",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-pill-react"
              text={`<Pill cursor="pointer" onClick={() => alert("clicked")} text="Clickable pill" />`}
            />,
            "Attached to the root Pill element.",
          ],
          [
            "ProgressStepItem (subcomponent of Progress Step)",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-progress-step-item-react"
              text={`<ProgressStepItem status="active" onClick={() => alert("clicked")} cursor="pointer">Step</ProgressStepItem>`}
            />,
            "Attached to each ProgressStepItem root. Sibling steps do not share a handler. Not shown on the Progress Step kit Global Event Props tab.",
          ],
          [
            "Source",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-source-react"
              text={`<Source onClick={() => alert("clicked")} source="Retail" type="retail" />`}
            />,
            "Attached to the root Source element.",
          ],
          [
            "Stat Change",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-stat-change-react"
              text={`<StatChange change="increase" onClick={() => alert("clicked")} value="12.4" />`}
            />,
            "Attached to the root element when value is set.",
          ],
          [
            "Stat Value",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-stat-value-react"
              text={`<StatValue value={104} unit="mg" onClick={() => alert("clicked")} cursor="pointer" />`}
            />,
            "Attached once to the root Stat Value element.",
          ],
          [
            "Timeline.Item (subcomponent of Timeline)",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-timeline-item-react"
              text={`<Timeline.Item onClick={() => alert("clicked")} cursor="pointer">Event</Timeline.Item>`}
            />,
            "Attached to each Timeline.Item root. Sibling items keep separate handlers. Not shown on the Timeline kit Global Event Props tab.",
          ],
          [
            "Title",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-title-react"
              text={`<Title onClick={() => alert("clicked")} cursor="pointer" text="Clickable title" />`}
            />,
            "Attached to the root Title tag.",
          ],
          [
            "Title Count",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-title-count-react"
              text={`<TitleCount title="Items" count={12} onClick={() => alert("clicked")} cursor="pointer" />`}
            />,
            "Attached once to the root Title Count element.",
          ],
          [
            "Title Detail",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-title-detail-react"
              text={`<TitleDetail title="Name" detail="Role" onClick={() => alert("clicked")} cursor="pointer" />`}
            />,
            "Attached once to the root Title Detail element.",
          ],
          [
            "User",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-user-react"
              text={`<User name="Harvey Specter" title="Attorney" onClick={() => alert("clicked")} cursor="pointer" />`}
            />,
            "Attached to the root User element.",
          ],
          [
            "User Badge",
            <ExampleCodeCard copyIcon={false} text="MouseEventHandler" />,
            <ExampleCodeCard
              id="onclick-user-badge-react"
              text={`<UserBadge badge="veteran" onClick={() => alert("clicked")} />`}
            />,
            "Attached to the root User Badge element.",
          ],
        ]}
      />

      <Card padding="md">
        <Title size={3} text="Precedence with htmlOptions" />
        <Body marginBottom="sm">
          When both are provided, the first-class <code>onClick</code> wins.
          If you omit the first-class prop, <code>htmlOptions.onClick</code>{" "}
          continues to work as before.
        </Body>
      </Card>

      <Card padding="md">
        <Title size={3} text="Kits with kit-specific onClick" />
        <Body marginBottom="sm">
          These kits already expose <code>onClick</code> with their own typing
          and target element. Global Event Props does not change them.
        </Body>
        <Table size="sm">
          <Table.Head>
            <Table.Row>
              <Table.Header>{"Kit"}</Table.Header>
              <Table.Header>{"Signature / Target"}</Table.Header>
              <Table.Header>{"Notes"}</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{"Button"}</Table.Cell>
              <Table.Cell>{"Mouse event on <button> only"}</Table.Cell>
              <Table.Cell>{"Not attached when Button renders as a link."}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"CircleIconButton"}</Table.Cell>
              <Table.Cell>{"Mouse event on inner Button"}</Table.Cell>
              <Table.Cell>{"htmlOptions apply to the wrapper; onClick belongs to the inner Button."}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"FormPill"}</Table.Cell>
              <Table.Cell>{"Mouse event on close icon only"}</Table.Cell>
              <Table.Cell>{"The pill body is not the click target."}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"Nav / Nav.Item"}</Table.Cell>
              <Table.Cell>{"() => void on title / item"}</Table.Cell>
              <Table.Cell>{"Targets navigation controls, not a generic root click."}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"StarRating"}</Table.Cell>
              <Table.Cell>{"(value: number) => void on stars"}</Table.Cell>
              <Table.Cell>{"Different signature from a mouse event handler."}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"Collapsible"}</Table.Cell>
              <Table.Cell>{"() => void via main area"}</Table.Cell>
              <Table.Cell>{"Participates in toggle behavior."}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card>

      <PropsExamplesTable
        headers={["Conflict Case", "Result", "Reason"]}
        rows={[
          [
            "Supported kit + htmlOptions.onClick",
            "First-class onClick wins",
            "globalEventProps is spread after htmlOptions.",
          ],
          [
            "Kit-specific onClick + htmlOptions.onClick",
            "Kit-specific behavior stays",
            "Existing implementations remain unchanged.",
          ],
          [
            "Nested clickable kits",
            "Both can fire",
            "Normal React event bubbling applies unless stopped.",
          ],
          [
            "Sibling ListItem /Timeline.Item / ProgressStepItem",
            "Only the clicked item fires",
            "Each item owns its own onClick on its root.",
          ],
        ]}
      />
    </ShowPage>
  );
};

export default OnClick;
