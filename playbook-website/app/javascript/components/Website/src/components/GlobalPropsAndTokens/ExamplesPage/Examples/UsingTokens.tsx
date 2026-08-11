import { Link } from "react-router-dom";
import { Body, Caption, Card, Flex, Title } from "playbook-ui";
import ShowPage from "../../Templates/ShowPage";
import PropsExamplesTable from "../../Templates/Subcomponents/PropsExamplesTable";
import ExampleCodeCard from "../../Templates/Subcomponents/ExampleCodeCard";
import {
  SyntaxHighlightedCode,
  type SyntaxLanguage,
} from "../../../SyntaxHighlightedCode";

type TokenExportRow = {
  tokenSet: string;
  jsImport: string;
  rubyAccess?: string;
  valuesPath: string;
};

const TOKEN_EXPORTS: TokenExportRow[] = [
  {
    tokenSet: "Border Radius",
    jsImport: "borderRadius",
    valuesPath: "/tokens/border_radius",
  },
  {
    tokenSet: "Colors",
    jsImport: "colors",
    rubyAccess: "Playbook::Tokens.colors",
    valuesPath: "/tokens/colors",
  },
  {
    tokenSet: "Line Height",
    jsImport: "lineHeight",
    valuesPath: "/tokens/line_height",
  },
  {
    tokenSet: "Opacity",
    jsImport: "opacity",
    valuesPath: "/tokens/opacity",
  },
  {
    tokenSet: "Positioning",
    jsImport: "positioning",
    valuesPath: "/tokens/position",
  },
  {
    tokenSet: "Scale",
    jsImport: "scale",
    valuesPath: "/tokens/scale",
  },
  {
    tokenSet: "Screen Sizes",
    jsImport: "screenSizes",
    valuesPath: "/tokens/screen_sizes",
  },
  {
    tokenSet: "Shadows",
    jsImport: "shadows",
    valuesPath: "/tokens/shadow",
  },
  {
    tokenSet: "Spacing",
    jsImport: "spacing",
    valuesPath: "/tokens/spacing",
  },
  {
    tokenSet: "Typography",
    jsImport: "typography",
    valuesPath: "/tokens/typography",
  },
];

const REACT_EXAMPLE = `import { colors, spacing } from "playbook-ui"

<div
  style={{
    color: colors.error,
    marginLeft: spacing.space_xs,
    padding: spacing.space_sm,
  }}
>
  Token-styled content
</div>`;

const RAILS_SASS_EXAMPLE = `@import "playbook-ui/dist/tokens/spacing";
@import "playbook-ui/dist/tokens/colors";

.my-panel {
  padding: $space_sm;
  color: $primary;
}`;

const RUBY_EXAMPLE = `Playbook::Tokens.colors[:input_text_error]
# => "#DA0014"

Playbook::Tokens.colors.status_text_primary
# => "#0056CF"`;

type DocCodeSnippetProps = {
  code: string;
  label: string;
  language: SyntaxLanguage;
};

const DocCodeSnippet = ({ code, label, language }: DocCodeSnippetProps) => (
  <Card borderNone borderRadius="md" padding="none" width="100%">
    <Caption color="lighter" paddingBottom="xs" text={label} />
    <SyntaxHighlightedCode code={code} language={language} />
  </Card>
);

const UsingTokens = () => {
  return (
    <ShowPage
      description="Playbook exports CSS tokens for use outside of kit properties. They can be used in custom CSS, inline styles, and Rails helpers. Prefer to use Global Props on kits when you can. Reach for token exports when you need the raw values."
      pageType="tokens"
      title="Using Tokens"
    >
      <Flex flexDirection="column" gap="xl" width="100%">
        <Flex flexDirection="column" gap="sm" id="available-token-exports" width="100%">
          <Title size={2} text="Available Token Exports" />
          <Body text="JS maps import from playbook-ui. Ruby helpers are available for colors; other token sets will follow." />
          <PropsExamplesTable
            firstColumnBold={false}
            headers={["Token Set", "JS", "Ruby", "Values"]}
            rows={TOKEN_EXPORTS.map(({ tokenSet, jsImport, rubyAccess, valuesPath }) => [
              <Title key={`${jsImport}-set`} size={4}>{tokenSet}</Title>,
              <ExampleCodeCard
                key={`${jsImport}-js`}
                id={`js-export-${jsImport}`}
                text={`import { ${jsImport} } from "playbook-ui"`}
              />,
              rubyAccess ? (
                <ExampleCodeCard
                  key={`${jsImport}-ruby`}
                  id={`ruby-export-${jsImport}`}
                  text={rubyAccess}
                />
              ) : (
                "—"
              ),
              <Link key={`${jsImport}-values`} to={valuesPath}>
                View Tokens
              </Link>,
            ])}
          />
        </Flex>

        <Flex flexDirection="column" gap="sm" id="use-in-react-or-tsx" width="100%">
          <Title size={2} text="Use in React or TSX" />
          <Body text="Import token maps and apply them as inline styles or in custom components." />
          <DocCodeSnippet
            code={REACT_EXAMPLE}
            label="REACT / TSX"
            language="tsx"
          />
        </Flex>

        <Flex flexDirection="column" gap="sm" id="use-in-ruby-colors" width="100%">
          <Title size={2} text="Use in Ruby (colors)" />
          <Body text="When you need color values in Ruby (helpers, presenters, etc.), use Playbook::Tokens. Note: other token sets are not yet exposed." />
          <DocCodeSnippet
            code={RUBY_EXAMPLE}
            label="RAILS"
            language="ruby"
          />
        </Flex>

        <Flex flexDirection="column" gap="sm" id="tokens-vs-global-props" width="100%">
          <Title size={2} text="Tokens vs Global Props" />
          <PropsExamplesTable
            firstColumnBold={false}
            headers={["Need", "Use"]}
            rows={[
              [
                "Spacing or color on a Playbook component",
                <Link key="global-props" to="/global_props">Global Props</Link>,
              ],
              [
                "Inline styles or custom React UI",
                "JS token exports (Use in React / TSX)",
              ],
              [
                "Color values in Ruby code",
                "Playbook::Tokens (colors only)",
              ],
              [
                "Override theme defaults",
                <Link key="how-to-theme" to="/guides/getting_started/how_to_theme">How to Theme</Link>,
              ],
            ]}
          />
        </Flex>

        <Flex flexDirection="column" gap="sm" id="sass-variables-optional" width="100%">
          <Title size={2} text="Sass variables (optional)" />
          <Body text="Most Power apps already load Playbook’s bundled CSS and won’t need this. If you’re writing custom SCSS and want token values as $variables, you can import individual partials from playbook-ui/dist/tokens." />
          <DocCodeSnippet
            code={RAILS_SASS_EXAMPLE}
            label="SCSS"
            language="scss"
          />
        </Flex>
      </Flex>
    </ShowPage>
  );
};

export default UsingTokens;
