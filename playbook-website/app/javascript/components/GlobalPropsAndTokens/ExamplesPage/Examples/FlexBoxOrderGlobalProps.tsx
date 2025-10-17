import React from "react";
import { Flex, Card, Body, Caption } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import * as OrderImages from './OrderImages';


const FlexBoxOrderGlobalProps = () => {

    const orderImagesRow = () => {
        return (
            <Flex orientation="column">


                {Object.entries(OrderImages)
                    .sort(([a], [b]) => {
                        const numA = parseInt(a.replace(/\D/g, ""), 10);
                        const numB = parseInt(b.replace(/\D/g, ""), 10);
                        return numA - numB;
                    })
                    .map(([key, image], index) => (
                        <img key={key} src={image as string} alt={`order ${index + 1}`} style={{ marginBottom: "8px" }} />
                    ))}

            </Flex>

        )
    }

    return (
        <>
            <ShowPage
                isFlex
                title="Order"
                description={
                    <>
                        The Order prop defines the visual order of elements in a flex or grid layout. It overrides the source order to achieve alternative arrangements without changing HTML structure. For more information on Order prop controls, refer to the{" "}
                        <a
                            href="https://developer.mozilla.org/en-US/docs/Web/CSS/order"
                            target="_blank"
                        >
                            MDN document found here.
                        </a>
                    </>
                }
            >
                <PropsExamplesTable
                    headers={[
                        "Order",
                        "Example",
                        "Rails Example",
                        "React Example",
                    ]}
                    rows={[
                        [
                            "None",
                            <img src={OrderImages.order5} alt="None" />,
                            <ExampleCodeCard id="flex_order_none_rails" text="order: 'none'" />,
                            <ExampleCodeCard id="flex_order_none_react" text="order='none'" />,
                        ],
                        [
                            "Row 1-12",
                            orderImagesRow(),
                            <>
                                <ExampleCodeCard id="flex_order_rails_1" text='order: "1"' marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_rails_2" text='order: "2"' marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_rails_3" text='order: "3"' marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_rails_4" text='order: "4"' marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_rails_5" text='order: "5"' marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_rails_6" text='order: "6"' marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_rails_7" text='order: "7"' marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_rails_8" text='order: "8"' marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_rails_9" text='order: "9"' marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_rails_10" text='order: "10"' marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_rails_11" text='order: "11"' marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_rails_12" text='order: "12"' marginBottom="xs" />
                            </>
                            ,
                            <>
                                <ExampleCodeCard id="flex_order_react_1" text="order={1}" marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_react_2" text="order={2}" marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_react_3" text="order={3}" marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_react_4" text="order={4}" marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_react_5" text="order={5}" marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_react_6" text="order={6}" marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_react_7" text="order={7}" marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_react_8" text="order={8}" marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_react_9" text="order={9}" marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_react_10" text="order={10}" marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_react_11" text="order={11}" marginBottom="xs" />
                                <ExampleCodeCard id="flex_order_react_12" text="order={12}" marginBottom="xs" />
                            </>
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
                            <ExampleCodeCard id="flex-order-rails" text={`order:{ xs: "1", sm: "1", md: "5", lg: "7", xl: "8", default: "5" }`} />
                        </Body>
                    </Flex>
                    <Flex align="baseline" gap="xs">
                        <Caption text="React" />
                        <Body  >
                            <ExampleCodeCard id="flex-order-react" text={`order={{ xs: "1", sm: "1", md: "5", lg: "7", xl: "8", default: "5" }}`} />
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
export default FlexBoxOrderGlobalProps;