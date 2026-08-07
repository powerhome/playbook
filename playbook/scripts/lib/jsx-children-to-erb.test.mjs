/**
 * Run with: node --test scripts/lib/jsx-children-to-erb.test.mjs
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  jsxChildrenToErb,
  selectableListItemsFromJsx,
} from './jsx-children-to-erb.mjs';
import { resolvePresetChildren, usageFromPreset } from './slim-playground.mjs';

describe('jsxChildrenToErb', () => {
  it('converts self-closing kits with string props', () => {
    const erb = jsxChildrenToErb(
      '<Caption text="A" />\n<Caption text="B" />\n<Caption text="C" />'
    );
    assert.equal(
      erb,
      [
        '<%= pb_rails("caption", props: { text: "A" }) %>',
        '<%= pb_rails("caption", props: { text: "B" }) %>',
        '<%= pb_rails("caption", props: { text: "C" }) %>',
      ].join('\n')
    );
  });

  it('converts open tags with text children and prop aliases', () => {
    const erb = jsxChildrenToErb(
      '<BreadCrumbItem href="/">Home</BreadCrumbItem><BreadCrumbItem component="span">Settings</BreadCrumbItem>'
    );
    assert.match(erb, /pb_rails\("bread_crumbs\/bread_crumb_item", props: \{ link: "\/" \}\)/);
    assert.match(erb, /pb_rails\("bread_crumbs\/bread_crumb_item"\) do %> Settings/);
    assert.doesNotMatch(erb, /component/);
    assert.doesNotMatch(erb, /href/);
  });

  it('converts compound Parent.Child tags', () => {
    const erb = jsxChildrenToErb(
      '<Layout.Side>\n  Side\n</Layout.Side>\n<Layout.Body>\n  Body\n</Layout.Body>'
    );
    assert.match(erb, /pb_rails\("layout\/sidebar"\) do %> Side/);
    assert.match(erb, /pb_rails\("layout\/body"\) do %> Body/);
  });

  it('unwraps string expression children', () => {
    const erb = jsxChildrenToErb("<FlexItem>\n  {'1'}\n</FlexItem>");
    assert.equal(erb, '<%= pb_rails("flex/flex_item") do %> 1 <% end %>');
  });

  it('skips non-literal expression props', () => {
    const erb = jsxChildrenToErb(
      '<TextInput label="First Name" onChange={handleFieldChange} value={formFields.firstName} />'
    );
    assert.equal(
      erb,
      '<%= pb_rails("text_input", props: { label: "First Name" }) %>'
    );
  });

  it('returns null for React-only layout compounds', () => {
    assert.equal(jsxChildrenToErb('<Layout.Round><Caption text="X" /></Layout.Round>'), null);
  });
});

describe('selectableListItemsFromJsx', () => {
  it('maps Item children to Rails items shape', () => {
    const items = selectableListItemsFromJsx(
      '<SelectableList.Item label="Mild" name="spice" value="mild" />\n<SelectableList.Item checked label="Medium" name="spice" value="medium" />'
    );
    assert.deepEqual(items, [
      { text: 'Mild', input_options: { name: 'spice', value: 'mild' } },
      {
        text: 'Medium',
        checked: true,
        input_options: { name: 'spice', value: 'medium' },
      },
    ]);
  });
});

describe('resolvePresetChildren', () => {
  it('respects structure mode children clearing', () => {
    const playground = {
      structureModes: {
        default: 'standard',
        modes: {
          standard: { template: '<Radio{{props}} />', children: '' },
          custom_children: {
            template: '<Radio{{props}}>\n  {{children}}\n</Radio>',
            children: '<Title text="Custom" />',
          },
        },
      },
      children: { default: '<Title text="Custom" />' },
    };
    assert.equal(
      resolvePresetChildren({ structureMode: 'standard', props: {} }, playground),
      ''
    );
    assert.equal(
      resolvePresetChildren(
        { structureMode: 'custom_children', children: '<Title text="Custom" />' },
        playground
      ),
      '<Title text="Custom" />'
    );
  });
});

describe('usageFromPreset rails children', () => {
  it('emits ERB children for flex', () => {
    const usage = usageFromPreset('flex', 'Flex', {
      presets: [
        {
          name: 'Row',
          props: { orientation: 'row' },
          children: '<Caption text="A" />\n<Caption text="B" />',
        },
      ],
    });
    assert.match(usage.rails.example, /pb_rails\("caption", props: \{ text: "A" \}\)/);
    assert.doesNotMatch(usage.rails.example, /<Caption/);
  });

  it('emits items array for selectable_list', () => {
    const usage = usageFromPreset('selectable_list', 'SelectableList', {
      presets: [
        {
          name: 'Checkbox list',
          props: { variant: 'checkbox' },
          children:
            '<SelectableList.Item label="Mild" name="spice" value="mild" />',
        },
      ],
    });
    assert.match(usage.rails.example, /items: \[\{ text: "Mild"/);
    assert.doesNotMatch(usage.rails.example, /do %>/);
  });

  it('quotes non-identifier hash keys and skips render-prop children', () => {
    const usage = usageFromPreset('filter', 'Filter', {
      structureModes: {
        default: 'single',
        modes: {
          single: {
            children: '({ closePopover }) => (\n  <form />\n)',
          },
        },
      },
      presets: [
        {
          name: 'Single Filter',
          structureMode: 'single',
          props: {
            filters: { 'Full Name': 'John Wick' },
            minWidth: '360px',
          },
        },
      ],
    });
    assert.match(usage.rails.example, /"Full Name" => "John Wick"/);
    assert.doesNotMatch(usage.rails.example, /do %>/);
  });
});
