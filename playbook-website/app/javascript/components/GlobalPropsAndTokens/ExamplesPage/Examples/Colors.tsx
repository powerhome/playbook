import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import { Title, Card, Body } from "playbook-ui";

interface ColorSwatchProps {
  color: string;
  border?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  border,
}) => {
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: 4,
        height: 30,
        width: 48,
        ...(border && { border }),
      }}
    />
  );
};

const Colors = () => {
  return (
    <>
      <ShowPage
        pageType="tokens"
        title="Colors"
        description="Colors in Playbook are defined by tokens, which include base colors as well as colors at a semantic level, such as success, warning, and error. They ensure visual consistency, accessibility, and reliable usage across all components."
      >
        <Title paddingTop="md" size={2}>Base Colors</Title>
        <PropsExamplesTable
          firstColumnBold={false}
          headers={["Color", "Token", "Value"]}
          rows={[
            [
              <ColorSwatch color="#0056CF" />,
              <Title size={4}>$royal</Title>,
              "#0056CF"
            ],
            [
              <ColorSwatch color="#9E64E9" />,
              <Title size={4}>$purple</Title>,
              "#9E64E9"
            ],
            [
              <ColorSwatch color="#00C4D7" />,
              <Title size={4}>$teal</Title>,
              "#00C4D7"
            ],
            [
              <ColorSwatch color="#DA0014" />,
              <Title size={4}>$red</Title>,
              "#DA0014"
            ],
            [
              <ColorSwatch color="#FF4A50" />,
              <Title size={4}>$red_dark</Title>,
              "#FF4A50"
            ],
            [
              <ColorSwatch color="#F9BB00" />,
              <Title size={4}>$yellow</Title>,
              "#F9BB00"
            ],
            [
              <ColorSwatch color="#1CA05C" />,
              <Title size={4}>$green</Title>,
              "#1CA05C"
            ],
            [
              <ColorSwatch color="#FD840C" />,
              <Title size={4}>$orange</Title>,
              "#FD840C"
            ],
            [
              <ColorSwatch color="#FFFFFF" border="1px solid #E4E8F0" />,
              <Title size={4}>$white</Title>,
              "#FFFFFF"
            ],
            [
              <ColorSwatch color="#F3F7FB" border="1px solid #E4E8F0" />,
              <Title size={4}>$silver</Title>,
              "#F3F7FB"
            ],
            [
              <ColorSwatch color="#C1CDD6" border="1px solid #E4E8F0" />,
              <Title size={4}>$slate</Title>,
              "#C1CDD6"
            ],
            [
              <ColorSwatch color="#93A8B8" />,
              <Title size={4}>$default</Title>,
              "#93A8B8"
            ],
            [
              <ColorSwatch color="#242B42" />,
              <Title size={4}>$charcoal</Title>,
              "#242B42"
            ],
            [
              <ColorSwatch color="#000000" />,
              <Title size={4}>$black</Title>,
              "#000000"
            ],
          ]}
        />
        <Title paddingTop="md" size={2}>Main Colors</Title>
        <PropsExamplesTable
          firstColumnBold={false}
          headers={["Color", "Token", "Value"]}
          rows={[
            [
              <ColorSwatch color="#0056CF" />,
              <Title size={4}>$primary</Title>,
              "$royal"
            ],
            [
              <ColorSwatch color="#F9BB00" />,
              <Title size={4}>$secondary</Title>,
              "$yellow"
            ],
            [
              <ColorSwatch color="#9E64E9" />,
              <Title size={4}>$tertiary</Title>,
              "$purple"
            ],
          ]}
        />
        <Title paddingTop="md" size={2}>UI Colors</Title>
        <PropsExamplesTable
          firstColumnBold={false}
          headers={["Color", "Token", "Value", "Use Case"]}
          rows={[
            [
              <ColorSwatch color="#F3F7FB" border="1px solid #E4E8F0" />,
              <Title size={4}>$bg_light</Title>,
              "$silver",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Background</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#0A0527" />,
              <Title size={4}>$bg_dark</Title>,
              "#0A0527",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Background</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#231E3D" />,
              <Title size={4}>$bg_dark_card</Title>,
              "#231E3D",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Background</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#FFFFFF" border="1px solid #E4E8F0" />,
              <Title size={4}>$card_light</Title>,
              "$white",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Card Background</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#231E3D" />,
              <Title size={4}>$card_dark</Title>,
              "mix(white, $bg_dark, 10%)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Card Background</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#E4E8F0" />,
              <Title size={4}>$border_light</Title>,
              "#E4E8F0",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Border</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#FAFDFF" />,
              <Title size={4}>$border_dark</Title>,
              "mix(white, $bg_dark, 20%)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Border</Body>
              </Card>,
            ],
          ]}
        />
        <Title paddingTop="md" size={2}>Text Colors</Title>
        <PropsExamplesTable
          firstColumnBold={false}
          headers={["Color", "Token", "Value", "Use Case"]}
          rows={[
            [
              <ColorSwatch color="#242B42" />,
              <Title size={4}>$text_lt_default</Title>,
              "$charcoal",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Light Mode, Default Text</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#687887" />,
              <Title size={4}>$text_lt_light</Title>,
              "#687887",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Light Mode, Light Text</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#C1CDD6" />,
              <Title size={4}>$text_lt_lighter</Title>,
              "$slate",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Light Mode, Lighter Text</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#157F48" />,
              <Title size={4}>$text_lt_success_sm</Title>,
              "#157F48",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Light Mode, Small Success Text</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#FFFFFF" border="1px solid #E4E8F0" />,
              <Title size={4}>$text_dk_default</Title>,
              "#FFFFFF",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Dark Mode, Default Text</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="rgba(255, 255, 255, 0.6)" border="1px solid #E4E8F0" />,
              <Title size={4}>$text_dk_light</Title>,
              "rgba($white, $opacity_6)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Dark Mode, Light Text</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="rgba(255, 255, 255, 0.4)" border="1px solid #E4E8F0" />,
              <Title size={4}>$text_dk_lighter</Title>,
              "rgba($white, $opacity_4)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Dark Mode, Lighter Text</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#00CA74" />,
              <Title size={4}>$text_dk_success_sm</Title>,
              "#00CA74",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Dark Mode, Small Success Text</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#0056CF" />,
              <Title size={4}>$primary_action</Title>,
              "$primary",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Link Text</Body>
              </Card>,
            ],
          ]}
        />
        <Title paddingTop="md" size={2}>State Colors</Title>
        <PropsExamplesTable
          firstColumnBold={false}
          headers={["Color", "Token", "Value", "Use Case"]}
          rows={[
            [
              <ColorSwatch color="#0056CF" />,
              <Title size={4}>$primary_action</Title>,
              "$primary",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Light Mode, Primary Action</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#0082FF" />,
              <Title size={4}>$primary_action_dark</Title>,
              "#0082FF",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Dark Mode, Primary Action</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="rgba(0, 86, 207, 0.05)" border="1px solid #E4E8F0" />,
              <Title size={4}>$secondary_action</Title>,
              "rgba($primary_action, 0.05)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Light Mode, Secondary Action</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#DCEAF5" border="1px solid #E4E8F0" />,
              <Title size={4}>$hover_light</Title>,
              "darken($silver, 5%)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Light Mode, Hover</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="rgba(255, 255, 255, 0.2)" border="1px solid #E4E8F0" />,
              <Title size={4}>$hover_dark</Title>,
              "rgba($white, $opacity_2)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Dark Mode, Hover</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#0056CF" />,
              <Title size={4}>$focus_color</Title>,
              "$primary",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Primary Focus</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="rgba(242, 247, 253, 0.5)" border="1px solid #E4E8F0" />,
              <Title size={4}>$focus_input_light</Title>,
              "rgba($active_light, $opacity_5)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Light Mode, Secondary Focus</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="rgba(20, 64, 117, 0.5)" />,
              <Title size={4}>$focus_input_dark</Title>,
              "rgba(#144075, $opacity_5)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Dark Mode, Secondary Focus</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#F2F7FD" border="1px solid #E4E8F0" />,
              <Title size={4}>$active_light</Title>,
              "lighten(#E5F2FF, 3.5%)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Light Mode, Active</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#0082FF" />,
              <Title size={4}>$active_dark</Title>,
              "#0082FF",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Dark Mode, Active and Link Text</Body>
              </Card>,
            ],
          ]}
        />
        <Title paddingTop="md" size={2}>Utility Colors</Title>
        <PropsExamplesTable
          firstColumnBold={false}
          headers={["Color", "Token", "Value", "Use Case"]}
          rows={[
            [
              <ColorSwatch color="rgba(60, 106, 172, 0.5)" />,
              <Title size={4}>$shadow</Title>,
              "rgba(#3C6AAC, $opacity_2)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Light Mode, Shadow</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#0A0527" />,
              <Title size={4}>$shadow_dark</Title>,
              "$bg_dark",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Dark Mode, Shadow</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#1C75F2" />,
              <Title size={4}>$gradient_start</Title>,
              "#1C75F2",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Gradient Start</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#0056CF" />,
              <Title size={4}>$gradient_end</Title>,
              "$royal (#0056CF)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Gradient End</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="transparent" border="1px solid #E4E8F0" />,
              <Title size={4}>$transparent</Title>,
              "transparent",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Transparency</Body>
              </Card>,
            ],
          ]}
        />
        <Title paddingTop="md" size={2}>Status Colors</Title>
        <PropsExamplesTable
          firstColumnBold={false}
          headers={["Color", "Token", "Value", "Use Case"]}
          rows={[
            [
              <ColorSwatch color="#0056CF" />,
              <Title size={4}>$primary</Title>,
              "$primary",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Primary</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="rgba(0, 86, 207, 0.1)" />,
              <Title size={4}>$primary_secondary</Title>,
              "lighten($primary, 10%)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Primary Subtle</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#C1CDD6" />,
              <Title size={4}>$neutral</Title>,
              "$slate",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Neutral</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#E0E6EB" />,
              <Title size={4}>$neutral_secondary</Title>,
              "lighten($neutral, 10%)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Neutral Secondary</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="rgba(193, 205, 214, 0.1)" />,
              <Title size={4}>$neutral_subtle</Title>,
              "rgba($neutral, $opacity_1)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Neutral Subtle</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#1CA05C" />,
              <Title size={4}>$success</Title>,
              "$green",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Success</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#24CC75" />,
              <Title size={4}>$success_secondary</Title>,
              "lighten($success, 10%)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Success Secondary</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="rgba(28, 160, 92, 0.1)" />,
              <Title size={4}>$success_subtle</Title>,
              "rgba($success, $opacity_1)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Success Subtle</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#F9BB00" />,
              <Title size={4}>$warning</Title>,
              "$yellow",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Warning</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#FFCB2E" />,
              <Title size={4}>$warning_secondary</Title>,
              "lighten($warning, 10%)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Warning Secondary</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="rgba(249, 187, 0, 0.1)" />,
              <Title size={4}>$warning_subtle</Title>,
              "rgba($warning, $opacity_1)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Warning Subtle</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#DA0014" />,
              <Title size={4}>$error</Title>,
              "$red",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Error</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="rgba(218, 0, 20, 0.1)" />,
              <Title size={4}>$error_subtle</Title>,
              "rgba($error, $opacity_1)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Error Subtle</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#FF4A50" />,
              <Title size={4}>$error_dark</Title>,
              "$red_dark",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Dark Mode, Error</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#00C4D7" />,
              <Title size={4}>$info</Title>,
              "$teal",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Info</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#0AE9FF" />,
              <Title size={4}>$info_secondary</Title>,
              "lighten($teal, 10%)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Info Secondary</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="rgba(0, 196, 215, 0.1)" />,
              <Title size={4}>$info_subtle</Title>,
              "rgba($info, $opacity_1)",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Info Subtle</Body>
              </Card>,
            ],
          ]}
        />
        <Title paddingTop="md" size={2}>Data Colors</Title>
        <PropsExamplesTable
          firstColumnBold={false}
          headers={["Color", "Token", "Value", "Use Case"]}
          rows={[
            [
              <ColorSwatch color="#0056CF" />,
              <Title size={4}>$data_1</Title>,
              "$royal",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Data 1</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#F9BB00" />,
              <Title size={4}>$data_2</Title>,
              "$yellow",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Data 2</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#9E64E9" />,
              <Title size={4}>$data_3</Title>,
              "$purple",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Data 3</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#1CA05C" />,
              <Title size={4}>$data_4</Title>,
              "$green",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Data 4</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#FD840C" />,
              <Title size={4}>$data_5</Title>,
              "$orange",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Data 5</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#144075" />,
              <Title size={4}>$data_6</Title>,
              "#144075",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Data 6</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#00C4D7" />,
              <Title size={4}>$data_7</Title>,
              "$teal",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Data 7</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#DA0014" />,
              <Title size={4}>$data_8</Title>,
              "$red",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Data 8</Body>
              </Card>,
            ],
          ]}
        />
        <Title paddingTop="md" size={2}>Category Colors</Title>
        <PropsExamplesTable
          firstColumnBold={false}
          headers={["Color", "Token", "Value", "Use Case"]}
          rows={[
            [
              <ColorSwatch color="#0056CF" />,
              <Title size={4}>$category_1</Title>,
              "$royal",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 1</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#0CD2E5" />,
              <Title size={4}>$category_2</Title>,
              "#0CD2E5",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 2</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#F9BB00" />,
              <Title size={4}>$category_3</Title>,
              "$yellow",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 3</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#14D595" />,
              <Title size={4}>$category_4</Title>,
              "#14D595",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 4</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#A057FF" />,
              <Title size={4}>$category_5</Title>,
              "#A057FF",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 5</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#FF7034" />,
              <Title size={4}>$category_6</Title>,
              "#FF7034",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 6</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#97DA22" />,
              <Title size={4}>$category_7</Title>,
              "#97DA22",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 7</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#EA599F" />,
              <Title size={4}>$category_8</Title>,
              "#EA599F",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 8</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#0091FF" />,
              <Title size={4}>$category_9</Title>,
              "#0091FF",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 9</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#5027E4" />,
              <Title size={4}>$category_10</Title>,
              "#5027E4",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 10</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#DA0014" />,
              <Title size={4}>$category_11</Title>,
              "$red",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 11</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#109922" />,
              <Title size={4}>$category_12</Title>,
              "#109922",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 12</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#058F9D" />,
              <Title size={4}>$category_13</Title>,
              "#058F9D",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 13</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#A33E6F" />,
              <Title size={4}>$category_14</Title>,
              "#A33E6F",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 14</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#B2171C" />,
              <Title size={4}>$category_15</Title>,
              "#B2171C",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 15</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#0A5C49" />,
              <Title size={4}>$category_16</Title>,
              "#0A5C49",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 16</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#325B91" />,
              <Title size={4}>$category_17</Title>,
              "#325B91",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 17</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#BE4714" />,
              <Title size={4}>$category_18</Title>,
              "#BE4714",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 18</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#000080" />,
              <Title size={4}>$category_19</Title>,
              "#000080",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 19</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#5C0E0A" />,
              <Title size={4}>$category_20</Title>,
              "#5C0E0A",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 20</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#040830" />,
              <Title size={4}>$category_21</Title>,
              "#040830",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Category 21</Body>
              </Card>,
            ],
          ]}
        />
        <Title paddingTop="md" size={2}>Product Colors</Title>
        <PropsExamplesTable
          firstColumnBold={false}
          headers={["Color", "Token", "Value", "Use Case"]}
          rows={[
            [
              <ColorSwatch color="#003DB2" />,
              <Title size={4}>$product_1_background</Title>,
              "#003DB2",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 1 Background</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#0057FF" />,
              <Title size={4}>$product_1_highlight</Title>,
              "#0057FF",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 1 Highlight</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#6000AC" />,
              <Title size={4}>$product_2_background</Title>,
              "#6000AC",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 2 Background</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#8200E9" />,
              <Title size={4}>$product_2_highlight</Title>,
              "#8200E9",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 2 Highlight</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#B85C00" />,
              <Title size={4}>$product_3_background</Title>,
              "#B85C00",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 3 Background</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#CE7500" />,
              <Title size={4}>$product_3_highlight</Title>,
              "#CE7500",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 3 Highlight</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#007E8F" />,
              <Title size={4}>$product_4_background</Title>,
              "#007E8F",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 4 Background</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#00B9D2" />,
              <Title size={4}>$product_4_highlight</Title>,
              "#00B9D2",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 4 Highlight</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#760B24" />,
              <Title size={4}>$product_5_background</Title>,
              "#760B24",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 5 Background</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#B8032E" />,
              <Title size={4}>$product_5_highlight</Title>,
              "#B8032E",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 5 Highlight</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#008540" />,
              <Title size={4}>$product_6_background</Title>,
              "#008540",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 6 Background</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#00A851" />,
              <Title size={4}>$product_6_highlight</Title>,
              "#00A851",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 6 Highlight</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#96006C" />,
              <Title size={4}>$product_7_background</Title>,
              "#96006C",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 7 Background</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#CD0094" />,
              <Title size={4}>$product_7_highlight</Title>,
              "#CD0094",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 7 Highlight</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#144075" />,
              <Title size={4}>$product_8_background</Title>,
              "#144075",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 8 Background</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#1A569E" />,
              <Title size={4}>$product_8_highlight</Title>,
              "#1A569E",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 8 Highlight</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#FCC419" />,
              <Title size={4}>$product_9_background</Title>,
              "#FCC419",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 9 Background</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#FFD43B" />,
              <Title size={4}>$product_9_highlight</Title>,
              "#FFD43B",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 9 Highlight</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#20C997" />,
              <Title size={4}>$product_10_background</Title>,
              "#20C997",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 10 Background</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#38D9A9" />,
              <Title size={4}>$product_10_highlight</Title>,
              "#38D9A9",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Product 10 Highlight</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#003DB2" />,
              <Title size={4}>$windows</Title>,
              "$product_1_background",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Windows</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#6000AC" />,
              <Title size={4}>$siding</Title>,
              "$product_2_background",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Siding</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#B85C00" />,
              <Title size={4}>$doors</Title>,
              "$product_3_background",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Doors</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#007E8F" />,
              <Title size={4}>$solar</Title>,
              "$product_4_background",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Solar</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#760B24" />,
              <Title size={4}>$roofing</Title>,
              "$product_5_background",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Roofing</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#008540" />,
              <Title size={4}>$gutters</Title>,
              "$product_6_background",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Gutters</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#96006C" />,
              <Title size={4}>$insulation</Title>,
              "$product_7_background",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Insulation</Body>
              </Card>,
            ],
            [
              <ColorSwatch color="#144075" />,
              <Title size={4}>$accessories</Title>,
              "$product_8_background",
              <Card borderRadius="sm" background="light" padding="xxs" borderNone>
                <Body>Accessories</Body>
              </Card>,
            ],
          ]}
        />
      </ShowPage>
    </>
  );
};

export default Colors;
