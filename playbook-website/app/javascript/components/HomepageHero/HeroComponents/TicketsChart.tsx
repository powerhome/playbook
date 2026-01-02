import React from "react";
import {
  Flex,
  Card,
  Caption,
  Icon,
  Title,
  StatChange,
  FlexItem,
  PbGaugeChart,
  colors,
  typography
} from "playbook-ui";

const TicketsChartCard = () => {

  const data = [{ name: "Percent of Tickets Sold", y: 75 }];
  const chartOptions = {
    series: [{ data: data }],
    pane: {
      startAngle: 0,
      endAngle: 360,
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          format:
            `<span class="fix">{y:,f}</span>` +
            `<span style="fill: ${colors.text_lt_light}; font-size: ${typography.text_larger};">%</span>`,
        },
      },
    },
    chart: {
      height: "150",
    },
  };

  return (
    <Flex
      className="tickets_chart component_example"
      cursor="pointer"
      hover={{ scale: "sm" }}
    >
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
              <PbGaugeChart
                options={chartOptions}
                id="gauge-full-circle"
                paddingLeft="md"
              />
            </FlexItem>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default TicketsChartCard;
