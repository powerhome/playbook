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
  sassImport: string;
  rubyAccess?: string;
  valuesPath: string;
};

const TOKEN_EXPORTS: TokenExportRow[] = [
  {
    tokenSet: "Border Radius",
    jsImport: "borderRadius",
    sassImport: "playbook-ui/dist/tokens/border_radius",
    valuesPath: "/tokens/border_radius",
  },
  {
    tokenSet: "Colors",
    jsImport: "colors",
    sassImport: "playbook-ui/dist/tokens/colors",
    rubyAccess: "Playbook::Tokens.colors",
    valuesPath: "/tokens/colors",
  },
  {
    tokenSet: "Line Height",
    jsImport: "lineHeight",
    sassImport: "playbook-ui/dist/tokens/line_height",
    valuesPath: "/tokens/line_height",
  },
  {
    tokenSet: "Opacity",
    jsImport: "opacity",
    sassImport: "playbook-ui/dist/tokens/opacity",
    valuesPath: "/tokens/opacity",
  },
  {
    tokenSet: "Positioning",
    jsImport: "positioning",
    sassImport: "playbook-ui/dist/tokens/positioning",
    valuesPath: "/tokens/position",
  },
  {
    tokenSet: "Scale",
    jsImport: "scale",
    sassImport: "playbook-ui/dist/tokens/scale",
    valuesPath: "/tokens/scale",
  },
  {
    tokenSet: "Screen Sizes",
    jsImport: "screenSizes",
    sassImport: "playbook-ui/dist/tokens/screen_sizes",
    valuesPath: "/tokens/screen_sizes",
  },
  {
    tokenSet: "Shadows",
    jsImport: "shadows",
    sassImport: "playbook-ui/dist/tokens/shadows",
    valuesPath: "/tokens/shadow",
  },
  {
    tokenSet: "Spacing",
    jsImport: "spacing",
    sassImport: "playbook-ui/dist/tokens/spacing",
    valuesPath: "/tokens/spacing",
  },
  {
    tokenSet: "Typography",
    jsImport: "typography",
    sassImport: "playbook-ui/dist/tokens/typography",
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
        <Flex flexDirection="column" gap="sm" id="available-js-exports" width="100%">
          <Title size={2} text="Available JS Exports" />
          <Body text="Import these maps from playbook-ui. Each links to the full value reference." />
          <PropsExamplesTable
            firstColumnBold={false}
            headers={["Token Set", "Import Name", "Values"]}
            rows={TOKEN_EXPORTS.map(({ tokenSet, jsImport, valuesPath }) => [
              <Title key={`${jsImport}-set`} size={4}>{tokenSet}</Title>,
              <ExampleCodeCard
                key={`${jsImport}-import`}
                id={`js-export-${jsImport}`}
                text={jsImport}
              />,
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

        <Flex flexDirection="column" gap="sm" id="available-rails-exports" width="100%">
          <Title size={2} text="Available Rails Exports" />
          <Body text="Import these partials into Sass for stylesheet variables. Ruby helper access is available for colors only." />
          <PropsExamplesTable
            firstColumnBold={false}
            headers={["Token Set", "Sass Import", "Ruby", "Values"]}
            rows={TOKEN_EXPORTS.map(({ tokenSet, sassImport, rubyAccess, valuesPath, jsImport }) => [
              <Title key={`${jsImport}-rails-set`} size={4}>{tokenSet}</Title>,
              <ExampleCodeCard
                key={`${jsImport}-sass`}
                id={`sass-export-${jsImport}`}
                text={sassImport}
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
              <Link key={`${jsImport}-rails-values`} to={valuesPath}>
                View Tokens
              </Link>,
            ])}
          />
        </Flex>

        <Flex flexDirection="column" gap="sm" id="use-in-rails" width="100%">
          <Title size={2} text="Use in Rails" />
          <Body text="In Rails apps, import Playbook token partials into your Sass and use $variables in stylesheets." />
          <DocCodeSnippet
            code={RAILS_SASS_EXAMPLE}
            label="SCSS"
            language="scss"
          />
        </Flex>

        <Flex flexDirection="column" gap="sm" id="use-in-ruby-colors" width="100%">
          <Title size={2} text="Use in Ruby (colors)" />
          <Body text="When you need color values in Ruby (helpers, presenters, etc.), use Playbook::Tokens. Other token sets are not yet exposed; use Sass or JS exports instead." />
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
                "Custom CSS in a Rails app",
                "Token Sass imports (Use in Rails)",
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
      </Flex>
    </ShowPage>
  );
};

export default UsingTokens;
