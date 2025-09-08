import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import ValueCardWithTooltip from "../../Templates/Subcomponents/ValueCardWithTooltip";
import * as AnimationImages from './AnimationImages'

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
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.64, 0.00, 0.35, 1)"
                text="cubic-bezier(0.64, 0.00, 0.35, 1)"
                tooltipText={
                  <img
                    src={AnimationImages.bezier}
                    alt="bezier"
                  />
                }
              />,
              <ExampleCodeCard id="bezier" text="transition: $bezier;" />,
            ],
            [
              "$linear",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.250, 0.250, 0.75, 0.750)"
                text="cubic-bezier(0.250, 0.250, 0.75, 0.750)"
                tooltipText={
                  <img
                    src={AnimationImages.linear}
                    alt="linear"
                  />
                }
              />,
              <ExampleCodeCard id="linear" text="transition: $linear;" />,
            ],
            [
              "$ease",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.250, 0.100, 0.250, 1.000)"
                text="cubic-bezier(0.250, 0.100, 0.250, 1.000)"
                tooltipText={
                  <img
                    src={AnimationImages.ease}
                    alt="ease"
                  />
                }
              />,
              <ExampleCodeCard id="ease" text="transition: $ease;" />,
            ],
            [
              "$easeIn",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.420, 0.00, 1.00, 1.00)"
                text="cubic-bezier(0.420, 0.00, 1.00, 1.00)"
                tooltipText={
                  <img
                    src={AnimationImages.easeIn}
                    alt="easeIn"
                  />
                }
              />,
              <ExampleCodeCard id="easeIn" text="transition: $easeIn;" />,
            ],
            [
              "$easeOut",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.000, 0.000, 0.580, 1.000)"
                text="cubic-bezier(0.000, 0.000, 0.580, 1.000)"
                tooltipText={
                  <img
                    src={AnimationImages.easeOut}
                    alt="easeOut"
                  />
                }
              />,
              <ExampleCodeCard id="easeOut" text="transition: $easeOut;" />,
            ],
            [
              "$easeInOut",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.420, 0.000, 0.580, 1.000)"
                text="cubic-bezier(0.420, 0.000, 0.580, 1.000)"
                tooltipText={
                  <img
                    src={AnimationImages.easeInOut}
                    alt="easeInOut"
                  />
                }
              />,
              <ExampleCodeCard id="easeInOut" text="transition: $easeInOut;" />,
            ],
          ]}
        />
        <PropsExamplesTable
          headers={["Penner Equations", "Value", "SASS Example"]}
          rows={[
            [
              "$easeInQuad",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.550, 0.085, 0.680, 0.530)"
                text="cubic-bezier(0.550, 0.085, 0.680, 0.530)"
                tooltipText={
                  <img
                    src={AnimationImages.easeInQuad}
                    alt="easeInQuad"
                  />
                }
              />,
              <ExampleCodeCard id="easeInQuad" text="transition: $easeInQuad;" />,
            ],
            [
              "$easeInCubic",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.550, 0.055, 0.675, 0.190)"
                text="cubic-bezier(0.550, 0.055, 0.675, 0.190)"
                tooltipText={
                  <img
                    src={AnimationImages.easeInCubic}
                    alt="easeInCubic"
                  />
                }
              />,
              <ExampleCodeCard id="easeInCubic" text="transition: $easeInCubic;" />,
            ],
            [
              "$easeInQuart",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.895, 0.030, 0.685, 0.220)"
                text="cubic-bezier(0.895, 0.030, 0.685, 0.220)"
                tooltipText={
                  <img
                    src={AnimationImages.easeInQuart}
                    alt="easeInQuart"
                  />
                }
              />,
              <ExampleCodeCard id="easeInQuart" text="transition: $easeInQuart;" />,
            ],
            [
              "$easeInQuint",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.755, 0.050, 0.855, 0.060)"
                text="cubic-bezier(0.755, 0.050, 0.855, 0.060)"
                tooltipText={
                  <img
                    src={AnimationImages.easeInQuint}
                    alt="easeInQuint"
                  />
                }
              />,
              <ExampleCodeCard id="easeInQuint" text="transition: $easeInQuint;" />,
            ],
            [
              "$easeInSine",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.470, 0.000, 0.745, 0.715)"
                text="cubic-bezier(0.470, 0.000, 0.745, 0.715)"
                tooltipText={
                  <img
                    src={AnimationImages.easeInSine}
                    alt="easeInSine"
                  />
                }
              />,
              <ExampleCodeCard id="easeInSine" text="transition: $easeInSine;" />,
            ],
            [
              "$easeInExpo",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.950, 0.050, 0.795, 0.035)"
                text="cubic-bezier(0.950, 0.050, 0.795, 0.035)"
                tooltipText={
                  <img
                    src={AnimationImages.easeInExpo}
                    alt="easeInExpo"
                  />
                }
              />,
              <ExampleCodeCard id="easeInExpo" text="transition: $easeInExpo;" />,
            ],
            [
              "$easeInCirc",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.600, 0.040, 0.980, 0.335)"
                text="cubic-bezier(0.600, 0.040, 0.980, 0.335)"
                tooltipText={
                  <img
                    src={AnimationImages.easeInCirc}
                    alt="easeInCirc"
                  />
                }
              />,
              <ExampleCodeCard id="easeInCirc" text="transition: $easeInCirc;" />,
            ],
            [
              "$easeInBack",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.600, -0.280, 0.735, 0.045)"
                text="cubic-bezier(0.600, -0.280, 0.735, 0.045)"
                tooltipText={
                  <img
                    src={AnimationImages.easeInBack}
                    alt="easeInBack"
                  />
                }
              />,
              <ExampleCodeCard id="easeInBack" text="transition: $easeInBack;" />,
            ]
          ]}
        />
        <PropsExamplesTable
          headers={["Penner Equations", "Value", "SASS Example"]}
          rows={[
            [
              "$easeOutQuad",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.250, 0.460, 0.450, 0.940)"
                text="cubic-bezier(0.250, 0.460, 0.450, 0.940)"
                tooltipText={
                  <img
                    src={AnimationImages.easeOutQuad}
                    alt="easeOutQuad"
                  />
                }
              />,
              <ExampleCodeCard id="easeOutQuad" text="transition: $easeOutQuad;" />,
            ],
            [
              "$easeOutCubic",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.215, 0.610, 0.355, 1.000)"
                text="cubic-bezier(0.215, 0.610, 0.355, 1.000)"
                tooltipText={
                  <img
                    src={AnimationImages.easeOutCubic}
                    alt="easeOutCubic"
                  />
                }
              />,
              <ExampleCodeCard id="easeOutCubic" text="transition: $easeOutCubic;" />,
            ],
            [
              "$easeOutQuart",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.165, 0.840, 0.440, 1.000)"
                text="cubic-bezier(0.165, 0.840, 0.440, 1.000)"
                tooltipText={
                  <img
                    src={AnimationImages.easeOutQuart}
                    alt="easeOutQuart"
                  />
                }
              />,
              <ExampleCodeCard id="easeOutQuart" text="transition: $easeOutQuart;" />,
            ],
            [
              "$easeOutQuint",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.230, 1.000, 0.320, 1.000)"
                text="cubic-bezier(0.230, 1.000, 0.320, 1.000)"
                tooltipText={
                  <img
                    src={AnimationImages.easeOutQuint}
                    alt="easeOutQuint"
                  />
                }
              />,
              <ExampleCodeCard id="easeOutQuint" text="transition: $easeOutQuint;" />,
            ],
            [
              "$easeOutSine",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.390, 0.575, 0.565, 1.000)"
                text="cubic-bezier(0.390, 0.575, 0.565, 1.000)"
                tooltipText={
                  <img
                    src={AnimationImages.easeOutSine}
                    alt="easeOutSine"
                  />
                }
              />,
              <ExampleCodeCard id="easeOutSine" text="transition: $easeOutSine;" />,
            ],
            [
              "$easeOutExpo",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.190, 1.000, 0.220, 1.000)"
                text="cubic-bezier(0.190, 1.000, 0.220, 1.000)"
                tooltipText={
                  <img
                    src={AnimationImages.easeOutExpo}
                    alt="easeOutExpo"
                  />
                }
              />,
              <ExampleCodeCard id="easeOutExpo" text="transition: $easeOutExpo;" />,
            ],
            [
              "$easeOutCirc",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.075, 0.820, 0.165, 1.000)"
                text="cubic-bezier(0.075, 0.820, 0.165, 1.000)"
                tooltipText={
                  <img
                    src={AnimationImages.easeOutCirc}
                    alt="easeOutCirc"
                  />
                }
              />,
              <ExampleCodeCard id="easeOutCirc" text="transition: $easeOutCirc;" />,
            ],
            [
              "$easeOutBack",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.175, 0.885, 0.320, 1.275)"
                text="cubic-bezier(0.175, 0.885, 0.320, 1.275)"
                tooltipText={
                  <img
                    src={AnimationImages.easeOutBack}
                    alt="easeOutBack"
                  />
                }
              />,
              <ExampleCodeCard id="easeOutBack" text="transition: $easeOutBack;" />,
            ],
          ]}
        />
        <PropsExamplesTable
          headers={["Penner Equations", "Value", "SASS Example"]}
          rows={[
            [
              "$easeInOutQuad",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.455, 0.030, 0.515, 0.955)"
                text="cubic-bezier(0.455, 0.030, 0.515, 0.955)"
                tooltipText={
                  <img
                    src={AnimationImages.easeInOutQuad}
                    alt="easeInOutQuad"
                  />
                }
              />,
              <ExampleCodeCard id="easeInOutQuad" text="transition: $easeInOutQuad;" />,
            ],
            [
              "$easeInOutCubic",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.645, 0.045, 0.355, 1.000)"
                text="cubic-bezier(0.645, 0.045, 0.355, 1.000)"
                tooltipText={
                  <img
                    src={AnimationImages.easeInOutCubic}
                    alt="easeInOutCubic"
                  />
                }
              />,
              <ExampleCodeCard id="easeInOutCubic" text="transition: $easeInOutCubic;" />,
            ],
            [
              "$easeInOutQuart",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.770, 0.000, 0.175, 1.000)"
                text="cubic-bezier(0.770, 0.000, 0.175, 1.000)"
                tooltipText={
                  <img
                    src={AnimationImages.easeInOutQuart}
                    alt="easeInOutQuart"
                  />
                }
              />,
              <ExampleCodeCard id="easeInOutQuart" text="transition: $easeInOutQuart;" />,
            ],
            [
              "$easeInOutQuint",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.860, 0.000, 0.070, 1.000)"
                text="cubic-bezier(0.860, 0.000, 0.070, 1.000)"
                tooltipText={
                  <img
                    src={AnimationImages.easeInOutQuint}
                    alt="easeInOutQuint"
                  />
                }
              />,
              <ExampleCodeCard id="easeInOutQuint" text="transition: $easeInOutQuint;" />,
            ],
            [
              "$easeInOutSine",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(0.445, 0.050, 0.550, 0.950)"
                text="cubic-bezier(0.445, 0.050, 0.550, 0.950)"
                tooltipText={
                  <img
                    src={AnimationImages.easeInOutSine}
                    alt="easeInOutSine"
                  />
                }
              />,
              <ExampleCodeCard id="easeInOutSine" text="transition: $easeInOutSine;" />,
            ],
            [
              "$easeInOutExpo",
              <ValueCardWithTooltip
                isImage
                key="cubic-bezier(1.000, 0.000, 0.000, 1.000)"
                text="cubic-bezier(1.000, 0.000, 0.000, 1.000)"
                tooltipText={
                  <img
                    src={AnimationImages.easeInOutExpo}
                    alt="easeInOutExpo"
                  />
                }
              />,
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
                    src={AnimationImages.easeInOutCirc}
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
                    src={AnimationImages.easeInOutBack}
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
