import { Flex } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import GroupHoverGuide from "./GroupHoverGuide";

const GroupHover = () => {


const TypesCards = () => {
  return (
    <Flex gap="xs" wrap>
      <ExampleCodeCard text="true" copyIcon={false} />
      <ExampleCodeCard text="false" copyIcon={false} />
    </Flex>
  );
};

  return (
    <>
    <ShowPage
      title="Group Hover"
      description={
        <>
        The Group Hover prop enables synchronized hover behavior between a parent component and its child elements. To activate it,  Group Hover must be applied to the parent and to each child element that should respond to the shared hover state. This coordination allows all of the hover props to be linked and activated once the parent is hovered. For more information on Playbook’s Hover global prop, refer to the <a href="https://playbook.powerapp.cloud/global_props/hover" target="_blank">Hover document here</a>.
        </>
      }
      VisualGuideCard={<GroupHoverGuide />}
    >
    <PropsExamplesTable
        headers={[
        "Group Hover",
        "Type",
        "Values",
        "Rails Example",
        "React Example",
        ]}
        rows={[
          [
            "Group Hover",
            <ExampleCodeCard text="boolean" copyIcon={false} />,
            <TypesCards />,
            <ExampleCodeCard
              id="group-hover-rails"
              text="group_hover: true"
            />,
            <ExampleCodeCard
              id="group-hover-react"
              text="groupHover"
            />,
          ]
        ]}
      />


    </ShowPage>
    </>
  );
};

export default GroupHover;
