import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import { Title, Link } from "playbook-ui";

const Colors = () => {
  return (
    <>
      <ShowPage
        pageType="tokens"
        title="Colors"
        description={<>Display tokens define how an element is rendered within the layout. Values align with standard CSS display properties and offer consistent layout behavior across components. <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/color" text="Learn more on MDN." /></>}
      >
        <Title size={2}>Base Colors</Title>
        <PropsExamplesTable
          headers={["Color", "Token", "Value"]}
          rows={[
            [
              <div style={{ width: 48, height: 30, backgroundColor: "#0056CF", borderRadius: 4 }} />,
              <Title size={4}>$royal</Title>,
              "#0056CF"
            ],
            [
              <div style={{ width: 48, height: 30, backgroundColor: "#9E64E9", borderRadius: 4 }} />,
              <Title size={4}>$purple</Title>,
              "#9E64E9"
            ],
            [
              <div style={{ width: 48, height: 30, backgroundColor: "#00C4D7", borderRadius: 4 }} />,
              <Title size={4}>$teal</Title>,
              "#00C4D7"
            ],
            [
              <div style={{ width: 48, height: 30, backgroundColor: "#DA0014", borderRadius: 4 }} />,
              <Title size={4}>$red</Title>,
              "#DA0014"
            ],
            [
              <div style={{ width: 48, height: 30, backgroundColor: "#FF4A50", borderRadius: 4 }} />,
              <Title size={4}>$red_dark</Title>,
              "#FF4A50"
            ],
            [
              <div style={{ width: 48, height: 30, backgroundColor: "#F9BB00", borderRadius: 4 }} />,
              <Title size={4}>$yellow</Title>,
              "#F9BB00"
            ],
            [
              <div style={{ width: 48, height: 30, backgroundColor: "#1CA05C", borderRadius: 4 }} />,
              <Title size={4}>$green</Title>,
              "#1CA05C"
            ],
            [
              <div style={{ width: 48, height: 30, backgroundColor: "#FD840C", borderRadius: 4 }} />,
              <Title size={4}>$orange</Title>,
              "#FD840C"
            ],
            [
              <div style={{ width: 48, height: 30, backgroundColor: "#FFFFFF", borderRadius: 4, border: "1px solid #CCC" }} />,
              <Title size={4}>$white</Title>,
              "#FFFFFF"
            ],
            [
              <div style={{ width: 48, height: 30, backgroundColor: "#F3F7FB", borderRadius: 4, border: "1px solid #CCC" }} />,
              <Title size={4}>$silver</Title>,
              "#F3F7FB"
            ],
            [
              <div style={{ width: 48, height: 30, backgroundColor: "#C1CDD6", borderRadius: 4 }} />,
              <Title size={4}>$slate</Title>,
              "#C1CDD6"
            ],
            [
              <div style={{ width: 48, height: 30, backgroundColor: "#93A8B8", borderRadius: 4 }} />,
              <Title size={4}>$default</Title>,
              "#93A8B8"
            ],
            [
              <div style={{ width: 48, height: 30, backgroundColor: "#242B42", borderRadius: 4 }} />,
              <Title size={4}>$charcoal</Title>,
              "#242B42"
            ],
            [
              <div style={{ width: 48, height: 30, backgroundColor: "#000000", borderRadius: 4 }} />,
              <Title size={4}>$black</Title>,
              "#000000"
            ],
          ]}
        />
        <Title size={2}>Main Colors</Title>
        <PropsExamplesTable
          headers={["Color", "Token", "Value"]}
          rows={[
            [
              <div style={{ width: 48, height: 30, backgroundColor: "#0056CF", borderRadius: 4 }} />,
              <Title size={4}>$primary</Title>,
              "$royal"
            ],
            [
              <div style={{ width: 48, height: 30, backgroundColor: "#F9BB00", borderRadius: 4 }} />,
              <Title size={4}>$secondary</Title>,
              "$yellow"
            ],
            [
              <div style={{ width: 48, height: 30, backgroundColor: "#9E64E9", borderRadius: 4 }} />,
              <Title size={4}>$tertiary</Title>,
              "$purple"
            ],
          ]}
        />
      </ShowPage>
    </>
  );
};

export default Colors;
