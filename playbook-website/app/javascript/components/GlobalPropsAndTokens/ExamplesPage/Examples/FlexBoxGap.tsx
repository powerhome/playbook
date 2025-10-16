import React from "react";
import { Flex, Card, Body, Caption } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import * as GapImages from './GapImages';


const FlexBoxGap = () => {

    return (
        <>
            <ShowPage
                isFlex
                title="Gap"
                description={
                    <>
                        The Gap prop defines the spacing between child elements inside flex or grid containers. It replaces the need for margin-based spacing and ensures more predictable layout behavior. For more information on Gap prop controls, refer to the{" "}
                        <a
                            href="https://developer.mozilla.org/en-US/docs/Web/CSS/gap"
                            target="_blank"
                        >
                            MDN document found here.
                        </a>
                    </>
                }
            >

                <PropsExamplesTable
                    headers={[
                        "Gap",
                        "Example",
                        "Rails Example",
                        "React Example",
                    ]}
                    rows={[
                        [
                            "None",
                            <img src={GapImages.gap_none} alt="None" />,
                            <ExampleCodeCard id="flex_gap_none_rails" text="gap: 'none'" />,
                            <ExampleCodeCard id="flex_gap_none_react" text="gap='none'" />,
                        ],
                        [
                            "XXS",
                            <img src={GapImages.gap_xxs} alt="XXS" />,
                            <ExampleCodeCard id="flex_gap_xxs_rails" text="gap: 'xxs'" />,
                            <ExampleCodeCard id="flex_gap_xxs_react" text="gap='xxs'" />,
                        ],
                        [
                            "XS",
                            <img src={GapImages.gap_xs} alt="XS" />,
                            <ExampleCodeCard id="flex_gap_xs_rails" text="gap: 'xs'" />,
                            <ExampleCodeCard id="flex_gap_xs_react" text="gap='xs'" />,
                        ],
                        [
                            "SM",
                            <img src={GapImages.gap_sm} alt="SM" />,
                            <ExampleCodeCard id="flex_gap_sm_rails" text="gap: 'sm'" />,
                            <ExampleCodeCard id="flex_gap_sm_react" text="gap='sm'" />,
                        ],
                        [
                            "MD",
                            <img src={GapImages.gap_md} alt="MD" />,
                            <ExampleCodeCard id="flex_gap_md_rails" text="gap: 'md'" />,
                            <ExampleCodeCard id="flex_gap_md_react" text="gap='md'" />,
                        ],
                        [
                            "LG",
                            <img src={GapImages.gap_lg} alt="LG" />,
                            <ExampleCodeCard id="flex_gap_lg_rails" text="gap: 'lg'" />,
                            <ExampleCodeCard id="flex_gap_lg_react" text="gap='lg'" />,
                        ],
                        [
                            "XL",
                            <img src={GapImages.gap_xl} alt="XL" />,
                            <ExampleCodeCard id="flex_gap_xl_rails" text="gap: 'xl'" />,
                            <ExampleCodeCard id="flex_gap_xl_react" text="gap='xl'" />,
                        ],

                    ]}
                />
                <Card>
                    <Caption text="Responsiveness" />
                    <Body text="This global prop supports responsive values using a breakpoint-based syntax that allows you to define different property values at different screen sizes. This makes it easy to create adaptive layouts without writing custom media queries." />
                    <Body marginY="md" text="Responsive values are defined using an object with screen size keys and corresponding property values. You can optionally include a default value that acts as a fallback when no breakpoint-specific value is matched. It looks like this:" />
                    <Flex align="baseline" gap="xs" marginBottom="sm">
                        <Caption text="Rails" />
                        <Body>
                            <ExampleCodeCard id="flex-gap-rails" text={`gap:{ xs: "sm", sm: "sm", md: "xs", lg: "md", xl: "lg", default: "md" }`} />
                        </Body>
                    </Flex>
                    <Flex align="baseline" gap="xs">
                        <Caption text="React" />
                        <Body>
                            <ExampleCodeCard id="flex-gap-react" text={`gap={{ xs: "sm", sm: "sm", md: "xs", lg: "md", xl: "lg", default: "md"}}`} />
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
    )
}

export default FlexBoxGap;
