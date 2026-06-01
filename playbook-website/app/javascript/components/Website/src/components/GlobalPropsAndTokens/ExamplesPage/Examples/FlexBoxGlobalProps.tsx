import { Flex, Card, Body, Caption } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import * as FlexBoxImages from './FlexBoxImages';

const FlexBoxGlobalProps = () => {

    return (
        <>
            <ShowPage title="Flex Box"
                description={
                    <>
                        Flex Box enables a flexible layout structure by applying CSS Flexbox properties. It allows customization of direction, wrapping, growth, and shrinkage of child elements, making responsive layouts easier to build. For more information on Flex prop controls, refer to the{" "}
                        <a
                            href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox"
                            target="_blank"
                        >
                            MDN document found here.
                        </a>
                    </>
                }
            >
                <Flex gap="md" orientation="column">
                    <PropsExamplesTable
                        headers={[
                            "Flex Direction",
                            "Example",
                            "Rails Example",
                            "React Example",
                        ]}
                        rows={[
                            [
                                "Row",
                                <img src={FlexBoxImages.directionRow} alt="Row" />,
                                <ExampleCodeCard id="row_rails" text='flex_direction: "row"' />,
                                <ExampleCodeCard id="row_react" text='flexDirection="row"' />,
                            ],
                            [
                                "Row Reverse",
                                <img src={FlexBoxImages.directionRowReverse} alt="Row Reverse" />,
                                <ExampleCodeCard id="row_reverse_rails" text='flex_direction: "row_reverse"' />,
                                <ExampleCodeCard id="row_reverse_react" text='flexDirection="rowReverse"' />,
                            ],
                            [
                                "Column",
                                <img src={FlexBoxImages.directionColumn} alt="Column" />,
                                <ExampleCodeCard id="column_rails" text='flex_direction: "column"' />,
                                <ExampleCodeCard id="column_react" text='flexDirection="column"' />,
                            ],
                            [
                                "Column Reverse",
                                <img src={FlexBoxImages.directionColumnReverse} alt="Column Reverse" />,
                                <ExampleCodeCard id="column_reverse_rails" text='flex_direction: "column_reverse"' />,
                                <ExampleCodeCard id="column_reverse_react" text='flexDirection="columnReverse"' />,
                            ],

                        ]}
                    />

                    <PropsExamplesTable
                        headers={[
                            "Flex Wrap",
                            "Example",
                            "Rails Example",
                            "React Example",
                        ]}
                        rows={[
                            [
                                "No Wrap",
                                <img src={FlexBoxImages.wrapNoWrap} alt="No Wrap" />,
                                <ExampleCodeCard id="no_wrap_rails" text='flex_wrap: "nowrap"' />,
                                <ExampleCodeCard id="no_wrap_react" text='flexWrap="nowrap"' />,
                            ],
                            [
                                "Wrap",
                                <img src={FlexBoxImages.wrapWrap} alt="Wrap" />,
                                <ExampleCodeCard id="wrap_rails" text='flex_wrap: "wrap"' />,
                                <ExampleCodeCard id="wrap_react" text='flexWrap="wrap"' />,
                            ],
                            [
                                "Wrap Reverse",
                                <img src={FlexBoxImages.wrapWrapReverse} alt="Wrap Reverse" />,
                                <ExampleCodeCard id="wrap_reverse_rails" text='flex_wrap: "wrap_reverse"' />,
                                <ExampleCodeCard id="wrap_reverse_react" text='flexWrap="wrapReverse"' />,
                            ],
                        ]}
                    />

                    <PropsExamplesTable
                        headers={[
                            "Flex Grow",
                            "Example",
                            "Rails Example",
                            "React Example",
                        ]}
                        rows={[
                            [
                                "0",
                                <img src={FlexBoxImages.flexGrow0} alt="0" />,
                                <ExampleCodeCard id="flex_grow_0_rails" text="flex_grow: 0" />,
                                <ExampleCodeCard id="flex_grow_0_react" text="flexGrow={0}" />,
                            ],
                            [
                                "1",
                                <img src={FlexBoxImages.flexGrow1} alt="1" />,
                                <ExampleCodeCard id="flex_grow_1_rails" text="flex_grow: 1" />,
                                <ExampleCodeCard id="flex_grow_1_react" text="flexGrow={1}" />,
                            ],
                        ]}
                    />

                    <PropsExamplesTable
                        headers={[
                            "Flex Shrink",
                            "Example",
                            "Rails Example",
                            "React Example",
                        ]}
                        rows={[
                            [
                                "0",
                                <img src={FlexBoxImages.flexShrink0} alt="0" />,
                                <ExampleCodeCard id="flex_shrink_0_rails" text="flex_shrink: 0" />,
                                <ExampleCodeCard id="flex_shrink_0_react" text="flexShrink={0}" />,
                            ],
                            [
                                "1",
                                <img src={FlexBoxImages.flexShrink1} alt="1" />,
                                <ExampleCodeCard id="flex_shrink_1_rails" text="flex_shrink: 1" />,
                                <ExampleCodeCard id="flex_shrink_1_react" text="flexShrink={1}" />,
                            ],
                        ]}
                    />

                    <PropsExamplesTable
                        headers={[
                            "Flex",
                            "Example",
                            "Rails Example",
                            "React Example",
                        ]}
                        rows={[
                            [
                                "None",
                                <img src={FlexBoxImages.flexNone} alt="None" />,
                                <ExampleCodeCard id="flex_none_rails" text='flex: "none"' />,
                                <ExampleCodeCard id="flex_none_react" text='flex="none"' />,
                            ],
                            [
                                "Initial",
                                <img src={FlexBoxImages.flexInitial} alt="Initial" />,
                                <ExampleCodeCard id="flex_initial_rails" text='flex: "initial"' />,
                                <ExampleCodeCard id="flex_initial_react" text='flex="initial"' />,
                            ],
                            [
                                "Auto",
                                <img src={FlexBoxImages.flexAuto} alt="Auto" />,
                                <ExampleCodeCard id="flex_auto_rails" text='flex: "auto"' />,
                                <ExampleCodeCard id="flex_auto_react" text='flex="auto"' />,
                            ],
                            [
                                "0",
                                <img src={FlexBoxImages.flex0} alt="0" />,
                                <ExampleCodeCard id="flex_0_rails" text="flex: 0" />,
                                <ExampleCodeCard id="flex_0_react" text="flex={0}" />,
                            ],
                            [
                                "1-12",
                                <img src={FlexBoxImages.flex112} alt="1-12" />,
                                <ExampleCodeCard id="flex_1_12_rails" text="flex: 2" />,
                                <ExampleCodeCard id="flex_1_12_react" text="flex={2}" />,
                            ],
                        ]}

                    />
                </Flex>
                <Card>
                    <Caption text="Responsiveness" />
                    <Body text="This global prop supports responsive values using a breakpoint-based syntax that allows you to define different property values at different screen sizes. This makes it easy to create adaptive layouts without writing custom media queries." />
                    <Body marginY="md" text="Responsive values are defined using an object with screen size keys and corresponding property values. You can optionally include a default value that acts as a fallback when no breakpoint-specific value is matched. It looks like this:" />
                    <Flex align="baseline" gap="xs" marginBottom="sm">
                        <Caption text="Rails" />
                        <Body>
                            <ExampleCodeCard id="flex-direction-rails" text={`flex_direction:{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row", default: "row" }`} />
                        </Body>
                    </Flex>
                    <Flex align="baseline" gap="xs">
                        <Caption text="React" />
                        <Body  >
                            <ExampleCodeCard id="flex-direction-react" text={`flexDirection={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row", default: "row" }}`} />
                        </Body>
                    </Flex>
                    <Body marginY="md" text="The supported screen size keys are:" />
                    <PropsExamplesTable
                        firstColumnBold={false}
                        headers={[
                            "Breakpoints",
                            "Value",
                            "Description",
                        ]}
                        rows={[
                            [
                                "xs",
                                "max-width: 575px",
                                "Extra small screens"
                            ],
                            [
                                "sm",
                                "min-width: 576px, max-width: 767px",
                                "Small screens"
                            ],
                            [
                                "md",
                                "min-width: 768px, max-width: 991px",
                                "Medium screens"
                            ],
                            [
                                "lg",
                                "min-width: 992px, max-width: 1199px",
                                "Large screens"
                            ],
                            [
                                "xl",
                                "min-width: 1200px",
                                "Extra large screens"
                            ],
                            [
                                "default",
                                "All sizes",
                                "Default is used as a final fallback and is not tied to a specific screen size."
                            ]
                        ]}
                    />
                </Card>
            </ShowPage>
        </>
    );
}

export default FlexBoxGlobalProps;