import { Body, Flex, Table  } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";

const NumberSpacing = () => {

  const VisualGuideExample = () => {
    const monetaryValues = [
      "$12.345.90",
      "$1,111.11", 
      "$767.58",
      "$178,101.11",
      "$99,4556.12"
    ];
    
    return (
      <Table size="md">
        <Table.Head>
          <Table.Row>
            <Table.Header textAlign="right">Number</Table.Header>
            <Table.Header textAlign="right">Tabular</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {monetaryValues.map((value, index) => (
            <Table.Row key={index} textAlign="right">
              <Table.Cell>
                <Body text={value} />
              </Table.Cell>
              <Table.Cell>
                <Body text={value} numberSpacing="tabular" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }

  const NumberSpacingCard = () => {
      return <VisualGuideExample />;
  };

  return (
    <>
      <ShowPage
        title="Number Spacing"
        description="The Number Spacing prop applies tabular spacing to numeric characters, ensuring consistent width across all digits. This improves alignment and readability in contexts like tables, forms, or stat displays."
        VisualGuideCard={NumberSpacingCard()}
      >
        <PropsExamplesTable
          headers={["Number Spacing", "Type", "Values", "Rails Example", "React Example"]}
          rows={[
            [
              "Number Spacing",
              <ExampleCodeCard text="string" copyIcon={false} />,
              <ExampleCodeCard text="tabular" copyIcon={false} />,
              <ExampleCodeCard
                id="number-spacing-rails"
                text="number_spacing: 'tabular'"
              />,
              <ExampleCodeCard
                id="number-spacing-react"
                text="numberSpacing='tabular'"
              />,
            ],
          ]}
        />
      </ShowPage>
    </>
  )
}

export default NumberSpacing;
