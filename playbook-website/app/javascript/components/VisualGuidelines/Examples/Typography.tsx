import React from "react";
import {
  Flex,
  Card,
  Title,
  Caption,
  CircleIconButton,
  SectionSeparator,
} from "playbook-ui";
import {
  HEADINGS,
  HEADINGSIZE,
  TEXTDATA,
  SPACINGDATA,
} from "./TYPOGRAPHY_DATA";
import Example from "../Templates/Example";

const Typography = ({
  example,
  tokensExample,
}: {
  example: string;
  tokensExample?: string;
}) => (
  <>
    <Example
      title="Typography"
      description="Odds are, you might want to build or expand upon the text patterns we have provided. Below are the tokens that are available for you and your typography needs."
      example={example}
      customChildren={true}
      tokens={HEADINGS}
    >
      <Caption margin="md" text="Headings" />
      <Flex
        alignItems="end"
        paddingBottom="lg"
        paddingLeft="md"
        paddingTop="md"
        columnGap="lg"
        wrap
      >
        {Object.keys(HEADINGS).map((heading, i) => (
          <Flex
            orientation="column"
            justifyContent="between"
            key={`token-example-${heading}`}
            alignItems="center"
          >
            <Title
              Typography={HEADINGS[heading]}
              text={HEADINGS[heading]}
              size={HEADINGS[heading]}
            />
            <Caption size="xs" text={HEADINGSIZE[i]} />
            <Caption size="xs" text={heading} />
            <CircleIconButton icon="copy" paddingRight="sm" variant="link" />
          </Flex>
        ))}
      </Flex>
      <SectionSeparator />

      <Caption marginTop="xl" marginLeft="md" text="Text Size" />
      <Flex
        alignItems="end"
        paddingBottom="lg"
        paddingLeft="md"
        paddingTop="md"
        columnGap="lg"
        wrap
      >
        {TEXTDATA.map((data) => (
          <Flex
            orientation="column"
            justifyContent="between"
            key={`token-example-${data.name}`}
            alignItems="center"
          >
            <div className={data.class}>{data.name}</div>
            <Caption size="xs" text={data.size} />
            <Caption size="xs" text={data.text} />
            <CircleIconButton icon="copy" paddingRight="sm" variant="link" />
          </Flex>
        ))}
      </Flex>
      <SectionSeparator />

      <Caption marginTop="xl" marginLeft="md" text="Letter Spacing" />
      <Flex
        alignItems="end"
        paddingBottom="lg"
        paddingLeft="md"
        paddingTop="md"
        columnGap="lg"
        wrap
      >
        {SPACINGDATA.map((data) => (
          <Flex
            orientation="column"
            justifyContent="between"
            key={`token-example-${data.name}`}
            alignItems="center"
          >
            <div className={data.class}>{data.name}</div>
            <Caption size="xs" text={data.value} />
            <Caption size="xs" text={data.text} />
            <CircleIconButton icon="copy" paddingRight="sm" variant="link" />
          </Flex>
        ))}
      </Flex>
    </Example>
  </>
);

export default Typography;
