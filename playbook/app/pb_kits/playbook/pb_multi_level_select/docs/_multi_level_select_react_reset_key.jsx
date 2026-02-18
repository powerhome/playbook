import React, { useState } from "react";
import MultiLevelSelect from "../_multi_level_select";
import { Button } from "playbook-ui";

const treeData = [
  { label: "Current year", value: "currentYear", id: "current:year" },
  { label: "Current quarter", value: "currentQuarter", id: "current:quarter" },
  {
    label: "Custom",
    value: "custom",
    id: "custom",
    children: [
      { label: "Range 1", value: "range1", id: "custom:range1" },
      { label: "Range 2", value: "range2", id: "custom:range2" },
    ],
  },
];

const DEFAULT_ID = "current:year";

const MultiLevelSelectReactResetKey = (props) => {
  const [selectedId, setSelectedId] = useState(DEFAULT_ID);

  const handleDefault = () => {
    setSelectedId(DEFAULT_ID);
  };

  return (
    <>
      <MultiLevelSelect
          {...props}
          id="multi-level-select-react-reset-key"
          key={`timeRange-${selectedId}`}
          label="Time Range"
          marginBottom="sm"
          onSelect={(nodes) => {
            if (nodes?.length) setSelectedId(nodes[0].id);
          }}
          selectedIds={selectedId ? [selectedId] : []}
          treeData={treeData}
          variant="single"
      />
      <Button
          onClick={handleDefault}
          text="Default"
          variant="secondary"
      />
    </>
  );
};

export default MultiLevelSelectReactResetKey;
