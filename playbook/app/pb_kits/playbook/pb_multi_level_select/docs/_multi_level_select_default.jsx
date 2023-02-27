import React from 'react'
import {MultiLevelSelect} from '../../'


let lastId = 0;

const firstLevelOption = (name, children = undefined, id = ++lastId) => ({
  title: name,
  value: id,
  key: `org-level-${id}`,
  children
});

const stubOrgLevelOptions = (count) =>
  Array(count)
    .fill()
    .map((_, i) => firstLevelOption(`dept ${i}`));

const treeData = [
  firstLevelOption("Power Home Remodeling", [
    firstLevelOption("unit People", [
     firstLevelOption("div Talent Acquisition", stubOrgLevelOptions(3)),
      firstLevelOption("div Business Affairs", stubOrgLevelOptions(3)),
      firstLevelOption("div People and Development", [
        firstLevelOption("dept Initiatives"),
        firstLevelOption("dept Learning & Developemnt")
      ]),
      firstLevelOption("div People Experience", stubOrgLevelOptions(3))
    ]),
    firstLevelOption("unit Contact Center", [
      firstLevelOption("div Appointment Management", stubOrgLevelOptions(3)),
      firstLevelOption("div Customer Service", stubOrgLevelOptions(3)),
      firstLevelOption("div Energy", stubOrgLevelOptions(3))
    ]),
    firstLevelOption("unit Revenue", [
      firstLevelOption("div Customer Development", stubOrgLevelOptions(3)),
      firstLevelOption("div Sales", stubOrgLevelOptions(3))
    ]),
    firstLevelOption("unit Project Services", [
      firstLevelOption("div Customer Support", stubOrgLevelOptions(3)),
      firstLevelOption("div Production Management", stubOrgLevelOptions(3))
    ]),
    firstLevelOption("unit Supply Chain", [
      firstLevelOption("Inventory Management", stubOrgLevelOptions(2))
    ])
  ])
];


const MultiLevelSelectDefault = (props) => (
  <div>
    <MultiLevelSelect
        treeData={treeData}
        {...props}
    />
  </div>
)

export default MultiLevelSelectDefault
