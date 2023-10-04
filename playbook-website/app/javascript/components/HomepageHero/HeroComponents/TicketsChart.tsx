import React from "react";
import {
  Flex,
  Card,
  Caption,
  Icon,
  Title,
  StatChange,
  FlexItem,
  Gauge,
} from "playbook-ui";

const TicketsChartCard = () => {
  const data = [
    {
      name: "Percent of Tickets Sold",
      value: 75,
    },
  ];

  return (
    <div className="tickets_chart component_example">
      <Flex>
        <Card borderNone borderRadius="xl" shadow="deepest" paddingBottom="none">
          <Flex orientation="column" align="stretch">
            <Flex justify="between" align="center">
              <Caption text="total tickets sold" />
              <Caption text={<Icon icon="ellipsis-h" size="lg" />} />
            </Flex>
            <Flex align="center">
              <Flex orientation="column">
                <Title text="10,819" size={1} />
                <Caption
                  size="xs"
                  text="Tickets sold in this month"
                  paddingBottom="xxs"
                />
                <StatChange change="increase" value="3.94" />
              </Flex>
              <FlexItem className="gauge-max-width">
                <Gauge
                  hover={{ scale: "lg" }}
                  chartData={data}
                  fullCircle
                  height="25%"
                  id="gauge-full-circle"
                  suffix="%"
                  paddingLeft="md"
                />
              </FlexItem>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </div>
  );
};

export default TicketsChartCard;
