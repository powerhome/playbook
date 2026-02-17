import React from "react";

import { Select } from "playbook-ui";

const SelectRequiredIndicator = () => {
  const options = [
    {
      value: "1",
      text: "Popcorn",
    },
    {
      value: "2",
      text: "Chips",
    },
    {
      value: "3",
      text: "Twizzlers",
    },
  ];

  return (
    <div>
      <Select
          label="Favorite Snack"
          name="food"
          options={options}
          requiredIndicator
      />
    </div>
  );
};

export default SelectRequiredIndicator;
