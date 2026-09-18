import type { PromptBuilderPlanItem } from "../promptCompiler";
import { createKit, createTitle } from "../PromtBuilderRecipes/utils";

const exampleSection = (
  caption: string,
  children: PromptBuilderPlanItem[],
) =>
  createKit(
    "flex",
    { marginBottom: "lg", orientation: "column" },
    [
      createKit("caption", { paddingBottom: "md", text: caption }),
      ...children,
    ],
  );

export const customUserDisplayPlan = (): PromptBuilderPlanItem[] => [
  createKit(
    "flex",
    { orientation: "column" },
    [
      createKit("avatar", {
        imageAlt: "Tori Johnson Standing",
        imageUrl: "https://randomuser.me/api/portraits/women/27.jpg",
        name: "Tori Johnson",
        size: "md",
        status: "offline",
      }),
      createKit(
        "flex",
        { align: "center", justify: "center", orientation: "row" },
        [
          createKit("title", {
            paddingRight: "xs",
            size: 4,
            text: "Tori Johnson",
          }),
          createKit("badge", {
            dark: true,
            text: "inactive",
            variant: "neutral",
          }),
        ],
      ),
      createKit("body", {
        color: "light",
        text: "User Experience Designer",
      }),
      createKit("body", {
        color: "light",
        text: "PHL • User Experience",
      }),
    ],
  ),
];

export const notificationBannerPlan = (): PromptBuilderPlanItem[] => {
  const banner = (
    background: string,
    highlightColor: string,
    icon: string,
    title: string,
    body: string,
    width?: string,
  ) =>
    createKit(
      "card",
      {
        background,
        highlight: { color: highlightColor, position: "side" },
        padding: "xs",
        paddingRight: "sm",
        ...(width ? { width } : {}),
      },
      [
        createKit(
          "flex",
          { paddingLeft: "xxs", paddingTop: "xxs" },
          [
            createKit(
              "flex",
              { paddingRight: "xs" },
              [createKit("icon", { icon, size: "lg" })],
            ),
            createKit(
              "flex",
              { gap: "xxs", orientation: "column" },
              [
                createKit("title", { size: 4, text: title }),
                createKit("body", { text: body }),
              ],
            ),
          ],
        ),
      ],
    );

  return [
    createKit(
      "flex",
      { gap: "md", orientation: "column" },
      [
        banner(
          "success_subtle",
          "success",
          "check",
          "Great Job!",
          "This is body text explaining what was so great!",
        ),
        banner(
          "error_subtle",
          "error",
          "exclamation-circle",
          "Oh No!",
          "This is body text explaining what went wrong!",
        ),
        banner(
          "warning_subtle",
          "warning",
          "exclamation-triangle",
          "Watch Out!",
          "This is body text explaining what to watch out for!",
        ),
        banner(
          "neutral_subtle",
          "neutral",
          "info-circle",
          "Some information",
          "This is body text explaining something for you that is long but has no width restriction so will span the width of the page!",
        ),
        banner(
          "info_subtle",
          "info",
          "info-circle",
          "Some information!",
          "This is body text explaining something for you that is long and wraps to the next line because the card has a width restriction in place.",
          "sm",
        ),
      ],
    ),
  ];
};

export const globalPositioningPlan = (): PromptBuilderPlanItem[] => [
  createKit(
    "flex",
    { orientation: "column" },
    [
      exampleSection("EXAMPLE 1: Image kit with Badge", [
        createKit(
          "flex",
          { position: "relative" },
          [
            createKit("image", {
              alt: "picture of a misty forest",
              size: "xs",
              url: "https://unsplash.it/500/400/?image=634",
            }),
            createKit(
              "card",
              {
                borderNone: true,
                padding: "none",
                position: "absolute",
                right: "xs",
                top: "xs",
              },
              [
                createKit("badge", {
                  rounded: true,
                  text: "1",
                  variant: "notification",
                }),
              ],
            ),
          ],
        ),
      ]),
      exampleSection("EXAMPLE 2: Card kit with Badge", [
        createKit(
          "card",
          { position: "relative" },
          [
            createKit("body", {
              text: "A bunch of awesome content goes here. Yeah! It sure does! Okay!",
            }),
            createKit(
              "card",
              {
                borderNone: true,
                bottom: "xs",
                left: "xs",
                padding: "none",
                position: "absolute",
              },
              [createKit("badge", { text: "+1", variant: "primary" })],
            ),
          ],
        ),
      ]),
      exampleSection("EXAMPLE 3: Card kit with IconCircle", [
        createKit(
          "card",
          { position: "relative" },
          [
            createKit("body", {
              text: "A bunch of awesome content goes here. Yeah! It sure does! Okay!",
            }),
            createKit(
              "card",
              {
                borderNone: true,
                borderRadius: "rounded",
                bottom: "sm",
                left: "sm",
                padding: "none",
                position: "absolute",
              },
              [
                createKit("icon_circle", {
                  icon: "rocket",
                  size: "sm",
                  variant: "orange",
                }),
              ],
            ),
          ],
        ),
      ]),
      exampleSection("EXAMPLE 4: NavItem with a Badge", [
        createKit(
          "nav",
          { link: "#", orientation: "horizontal" },
          [],
          `<NavItem link="#">
  <Flex position="relative">
    First
    <Badge
      position="absolute"
      right="sm"
      rounded
      text="1"
      top="xs"
      variant="notification"
    />
  </Flex>
</NavItem>
<NavItem active link="#" text="Second" />
<NavItem link="#" text="Third" />`,
        ),
      ]),
      exampleSection("EXAMPLE 5: Avatar kit with a Badge", [
        createKit(
          "flex",
          { position: "relative" },
          [
            createKit("avatar", {
              imageAlt: "Terry Johnson Standing",
              imageUrl: "https://randomuser.me/api/portraits/men/44.jpg",
              name: "Terry Johnson",
              size: "lg",
            }),
            createKit("badge", {
              position: "absolute",
              right: "xs",
              rounded: true,
              text: "5",
              top: "xs",
              variant: "notification",
            }),
          ],
        ),
      ]),
      exampleSection("EXAMPLE 6: Avatar kit with a Card and Badge", [
        createKit(
          "flex",
          { justify: "center", position: "relative" },
          [
            createKit("avatar", {
              imageAlt: "Terry Johnson Standing",
              imageUrl: "https://randomuser.me/api/portraits/men/44.jpg",
              name: "Terry Johnson",
              size: "lg",
            }),
            createKit(
              "card",
              {
                borderNone: true,
                borderRadius: "rounded",
                bottom: "xs",
                padding: "none",
                position: "absolute",
              },
              [
                createKit("badge", {
                  rounded: true,
                  text: "On Roadtrip",
                  variant: "neutral",
                }),
              ],
            ),
          ],
        ),
      ]),
    ],
  ),
];

const tableFilterChildren = `<Table.Head>
  <Table.Row>
    <Table.Header text="Territory ID" />
    <Table.Header text="Name" />
    <Table.Header text="Title" />
    <Table.Header text="Department" />
    <Table.Header text="Branch" />
    <Table.Header text="Start Date" textAlign="right" />
  </Table.Row>
</Table.Head>
<Table.Body>
  <Table.Row>
    <Table.Cell text="1" numberSpacing="tabular" />
    <Table.Cell text="Ashlee" />
    <Table.Cell text="Nitro Producteer" />
    <Table.Cell text="Business Technology" />
    <Table.Cell text="Philadelphia" />
    <Table.Cell text="Jan 1, 2025" textAlign="right" />
  </Table.Row>
  <Table.Row>
    <Table.Cell text="2" numberSpacing="tabular" />
    <Table.Cell text="Nick" />
    <Table.Cell text="UX Engineer II" />
    <Table.Cell text="Business Technology" />
    <Table.Cell text="Philadelphia" />
    <Table.Cell text="Jan 2, 2025" textAlign="right" />
  </Table.Row>
  <Table.Row>
    <Table.Cell text="3" numberSpacing="tabular" />
    <Table.Cell text="Nida" />
    <Table.Cell text="Senior UX Engineer" />
    <Table.Cell text="Business Technology" />
    <Table.Cell text="Philadelphia" />
    <Table.Cell text="Jan 3, 2025" textAlign="right" />
  </Table.Row>
  <Table.Row>
    <Table.Cell text="4" numberSpacing="tabular" />
    <Table.Cell text="Justin" />
    <Table.Cell text="Director of User Experience Engineering" />
    <Table.Cell text="Business Technology" />
    <Table.Cell text="Philadelphia" />
    <Table.Cell text="Jan 4, 2025" textAlign="right" />
  </Table.Row>
  <Table.Row>
    <Table.Cell text="5" numberSpacing="tabular" />
    <Table.Cell text="Edward" />
    <Table.Cell text="UX Designer" />
    <Table.Cell text="Business Technology" />
    <Table.Cell text="Philadelphia" />
    <Table.Cell text="Jan 5, 2025" textAlign="right" />
  </Table.Row>
</Table.Body>`;

export const tableFilterCardPlan = (): PromptBuilderPlanItem[] => [
  createTitle("Title Goes Here", 3),
  createKit(
    "card",
    { padding: "none" },
    [
      createKit(
        "flex",
        { align: "stretch", gap: "none", orientation: "column" },
        [
          {
            ...createKit("filter", {
              background: false,
              double: true,
              maxHeight: "50vh",
              minWidth: "xs",
              results: 50,
              sortOptions: {
                territory_id: "Territory ID",
                first_name: "Name",
                started_on: "Start Date",
                department_name: "Department",
                title_name: "Title",
                branch_branch_name: "Branch",
              },
              sortValue: [{ name: "started_on", dir: "asc" }],
            }),
            structureMode: "double",
          },
          createKit("section_separator"),
          {
            ...createKit(
              "table",
              {
                collapse: "md",
                container: false,
                size: "sm",
              },
              [],
              tableFilterChildren,
            ),
            structureMode: "subcomponents",
          },
        ],
      ),
    ],
  ),
];

export const BUILDING_BLOCK_PLANS: Record<
  string,
  () => PromptBuilderPlanItem[]
> = {
  custom_user_display: customUserDisplayPlan,
  global_positioning: globalPositioningPlan,
  notification_banner: notificationBannerPlan,
  table_filter_card: tableFilterCardPlan,
};
