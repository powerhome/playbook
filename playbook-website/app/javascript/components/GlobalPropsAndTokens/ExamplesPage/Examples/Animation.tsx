import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import ValueCardWithTooltip from "../../Templates/Subcomponents/ValueCardWithTooltip";
import { easeInOutBack, easeInOutCirc } from "./AnimationImages"

const Animation = () => {
  return (
    <>
      <ShowPage
        pageType="tokens"
        title="Animation"
        description="Animation tokens define standard easing curves and durations used throughout the interface. They help create consistent motion behavior for transitions, hover effects, and entrance/exit animations."
      >
        <PropsExamplesTable
          headers={["Default Tokens", "Value", "SASS Example"]}
          rows={[
            [
              "$bezier",
              "cubic-bezier(0.64, 0.00, 0.35, 1)",
              <ExampleCodeCard id="bezier" text="transition: $bezier;" />,
            ],
            [
              "$linear",
              "cubic-bezier(0.250, 0.250, 0.75, 0.750)",
              <ExampleCodeCard id="linear" text="transition: $linear;" />,
            ],
            [
              "$ease",
              "cubic-bezier(0.250, 0.100, 0.250, 1.000)",
              <ExampleCodeCard id="ease" text="transition: $ease;" />,
            ],
            [
              "$easeIn",
              "cubic-bezier(0.420, 0.00, 1.00, 1.00)",
              <ExampleCodeCard id="easeIn" text="transition: $easeIn;" />,
            ],
            [
              "$easeOut",
              "cubic-bezier(0.000, 0.000, 0.580, 1.000)",
              <ExampleCodeCard id="easeOut" text="transition: $easeOut;" />,
            ],
            [
              "$easeInOut",
              "cubic-bezier(0.420, 0.000, 0.580, 1.000)",
              <ExampleCodeCard id="easeInOut" text="transition: $easeInOut;" />,
            ],
          ]}
        />
        <PropsExamplesTable
          headers={["Penner Equations", "Value", "SASS Example"]}
          rows={[
            [
              "$easeInQuad",
              "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
              <ExampleCodeCard id="easeInQuad" text="transition: $easeInQuad;" />,
            ],
            [
              "$easeInCubic",
              "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
              <ExampleCodeCard id="easeInCubic" text="transition: $easeInCubic;" />,
            ],
            [
              "$easeInQuart",
              "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
              <ExampleCodeCard id="easeInQuart" text="transition: $easeInQuart;" />,
            ],
            [
              "$easeInQuint",
              "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
              <ExampleCodeCard id="easeInQuint" text="transition: $easeInQuint;" />,
            ],
            [
              "$easeInSine",
              "cubic-bezier(0.470, 0.000, 0.745, 0.715)",
              <ExampleCodeCard id="easeInSine" text="transition: $easeInSine;" />,
            ],
            [
              "$easeInExpo",
              "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
              <ExampleCodeCard id="easeInExpo" text="transition: $easeInExpo;" />,
            ],
            [
              "$easeInCirc",
              "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
              <ExampleCodeCard id="easeInCirc" text="transition: $easeInCirc;" />,
            ],
            [
              "$easeInBack",
              "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
              <ExampleCodeCard id="easeInBack" text="transition: $easeInBack;" />,
            ],
          ]}
        />
        <PropsExamplesTable
          headers={["Penner Equations", "Value", "SASS Example"]}
          rows={[
            [
              "$easeOutQuad",
              "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
              <ExampleCodeCard id="easeOutQuad" text="transition: $easeOutQuad;" />,
            ],
            [
              "$easeOutCubic",
              "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
              <ExampleCodeCard id="easeOutCubic" text="transition: $easeOutCubic;" />,
            ],
            [
              "$easeOutQuart",
              "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
              <ExampleCodeCard id="easeOutQuart" text="transition: $easeOutQuart;" />,
            ],
            [
              "$easeOutQuint",
              "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
              <ExampleCodeCard id="easeOutQuint" text="transition: $easeOutQuint;" />,
            ],
            [
              "$easeOutSine",
              "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
              <ExampleCodeCard id="easeOutSine" text="transition: $easeOutSine;" />,
            ],
            [
              "$easeOutExpo",
              "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
              <ExampleCodeCard id="easeOutExpo" text="transition: $easeOutExpo;" />,
            ],
            [
              "$easeOutCirc",
              "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
              <ExampleCodeCard id="easeOutCirc" text="transition: $easeOutCirc;" />,
            ],
            [
              "$easeOutBack",
              "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
              <ExampleCodeCard id="easeOutBack" text="transition: $easeOutBack;" />,
            ],
          ]}
        />
        <PropsExamplesTable
          headers={["Penner Equations", "Value", "SASS Example"]}
          rows={[
            [
              "$easeInOutQuad",
              "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
              <ExampleCodeCard id="easeInOutQuad" text="transition: $easeInOutQuad;" />,
            ],
            [
              "$easeInOutCubic",
              "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
              <ExampleCodeCard id="easeInOutCubic" text="transition: $easeInOutCubic;" />,
            ],
            [
              "$easeInOutQuart",
              "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
              <ExampleCodeCard id="easeInOutQuart" text="transition: $easeInOutQuart;" />,
            ],
            [
              "$easeInOutQuint",
              "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
              <ExampleCodeCard id="easeInOutQuint" text="transition: $easeInOutQuint;" />,
            ],
            [
              "$easeInOutSine",
              "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
              <ExampleCodeCard id="easeInOutSine" text="transition: $easeInOutSine;" />,
            ],
            [
              "$easeInOutExpo",
              "cubic-bezier(1.000, 0.000, 0.000, 1.000)",
              <ExampleCodeCard id="easeInOutExpo" text="transition: $easeInOutExpo;" />,
            ],
            [
              "$easeInOutCirc",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.785, 0.135, 0.150, 0.860)"
                text="cubic-bezier(0.785, 0.135, 0.150, 0.860)"
                tooltipText={
                  <img
                    src={easeInOutCirc}
                    alt="easeInOutCirc"
                  />
                }
              />,
              <ExampleCodeCard id="easeInOutCirc" text="transition: $easeInOutCirc;" />,
            ],
            [
              "$easeInOutBack",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.680, -0.550, 0.265, 1.550)"
                text="cubic-bezier(0.680, -0.550, 0.265, 1.550)"
                tooltipText={
                  <img
                    src={easeInOutBack}
                    alt="easeInOutBack"
                  />
                }
              />,
              <ExampleCodeCard id="easeInOutBack" text="transition: $easeInOutBack;" />,
            ],
          ]}
        />
      </ShowPage>
    </>
  );
};

export default Animation;
