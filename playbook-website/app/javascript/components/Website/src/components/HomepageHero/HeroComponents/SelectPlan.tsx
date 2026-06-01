import React, { useState } from "react";
import {
  Flex,
  Card,
  SelectableCard,
  Title,
  Caption,
  Currency,
} from "playbook-ui";

const SelectPlanCard = () => {
  const plans = [
    {
      planName: "Standard",
      current: "",
      subCopy: "$29 month x 10 seats",
      price: "290",
    },
    {
      planName: "Business",
      current: "(current)",
      subCopy: "$39 month x 10 seats",
      price: "390",
    },
    {
      planName: "Enterprise",
      current: "",
      subCopy: "$60 month x 10 seats",
      price: "600",
    },
  ];
  const [selected, setSelected] = useState(plans[1].planName);
  const handleSelect = (event) => {
    setSelected(event.target.value);
  };

  return (
    <Flex
      className="select_plan component_example"
      cursor="pointer"
      hover={{ scale: "sm" }}
    >
      <Card borderNone borderRadius="xl" shadow="deepest">
        <Flex orientation="column" gap="sm" align="stretch">
          {plans.map((plan, i) => {
            return (
              <SelectableCard
                checked={selected === plan.planName}
                key={`selectable-plan-card-${i}`}
                icon
                inputId={plan.planName}
                multi={false}
                name="Plan"
                onChange={handleSelect}
                value={plan.planName}
                shadow={selected === plan.planName ? "deep" : "none"}
                margin="none"
              >
                <Flex justify="between">
                  <Flex orientation="column">
                    <Flex gap="xs" paddingRight="xl">
                      <Title size={4} text={plan.planName} />
                      <Title size={4} color="light" text={plan.current} />
                    </Flex>
                    <Caption size="xs" text={plan.subCopy} />
                  </Flex>
                  <Currency
                    amount={plan.price}
                    unit="/month"
                    size="md"
                    symbol="$"
                  />
                </Flex>
              </SelectableCard>
            );
          })}
        </Flex>
      </Card>
    </Flex>
  );
};

export default SelectPlanCard;
