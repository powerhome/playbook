import { Table, Flex, Title } from "playbook-ui";

type PropsExamplesTableTypes = {
  headers: any[];
  rows: any[][];
  firstColumnBold?: boolean;
};

const PropsExamplesTable = ({ headers, rows, firstColumnBold= true }: PropsExamplesTableTypes) => {
  const columnWidth = `${100 / headers.length}%`;
  
  return (
    <Flex width="100%" justifyContent="center">
      <Table disableHover size="sm" htmlOptions={{ style: { tableLayout: 'fixed' } }}>
        <Table.Head>
          <Table.Row>
            {headers.map((header, i) => (
              <Table.Header key={i} htmlOptions={{ style: { width: columnWidth } }}>{header}</Table.Header>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((row, i) => (
            <Table.Row key={i}>
              {row.map((cell, j) => (
                <Table.Cell key={j}>
                  {j === 0 && firstColumnBold ? <Title size={4}>{cell}</Title> : cell}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Flex>
  );
};

export default PropsExamplesTable;
