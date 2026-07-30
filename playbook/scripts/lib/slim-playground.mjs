/**
 * Slim playground configs for AI dist export.
 *
 * Keeps high-signal codegen fields (presets, hints, composition) and strips
 * website UI chrome + large mock datasets that would bloat dist/ai.
 *
 * AdvancedTable is special-cased: full playground mocks are huge, so we inject
 * tiny synthetic columnDefinitions/tableData samples agents can copy.
 */

export const AI_PLAYGROUND_KEYS = [
  'presets',
  'hints',
  'conditionals',
  'structureModes',
  'template',
  'children',
  'customProps',
  'wrapper',
  'statefulProps',
  'requiredCodeProps',
  'propTargets',
  'propAliases',
  'codegenDefaultProps',
  'externalImports',
  'imports',
  // Host-app packages required by wrapper kits (authored in _playground.overrides.json)
  'externalDependencies',
];

const HEAVY_PROP_KEYS = new Set(['columnDefinitions', 'tableData', 'table_data']);

/** Compact AdvancedTable shapes for AI codegen (not the website mock datasets). */
export const ADVANCED_TABLE_AI_SAMPLES = {
  columnDefinitions: [
    { accessor: 'year', label: 'Year', cellAccessors: ['quarter', 'month'] },
    { accessor: 'newEnrollments', label: 'New Enrollments' },
    { accessor: 'attendanceRate', label: 'Attendance Rate' },
  ],
  columnDefinitionsSortable: [
    { accessor: 'year', label: 'Year', cellAccessors: ['quarter', 'month'] },
    { accessor: 'newEnrollments', label: 'New Enrollments', enableSort: true },
    { accessor: 'attendanceRate', label: 'Attendance Rate', enableSort: true },
  ],
  tableDataNested: [
    {
      year: '2021',
      quarter: null,
      month: null,
      newEnrollments: '20',
      attendanceRate: '51%',
      children: [
        {
          year: '2021',
          quarter: 'Q1',
          month: null,
          newEnrollments: '2',
          attendanceRate: '32%',
          children: [
            {
              year: '2021',
              quarter: 'Q1',
              month: 'January',
              newEnrollments: '16',
              attendanceRate: '11%',
            },
          ],
        },
      ],
    },
    {
      year: '2022',
      quarter: null,
      month: null,
      newEnrollments: '35',
      attendanceRate: '64%',
    },
  ],
  tableDataFlat: [
    { year: '2021', newEnrollments: '20', attendanceRate: '51%' },
    { year: '2022', newEnrollments: '35', attendanceRate: '64%' },
  ],
};

function cloneJson(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function stripHeavyProps(props) {
  if (!props || typeof props !== 'object' || Array.isArray(props)) {
    return { props, removed: false };
  }

  const next = { ...props };
  let removed = false;
  for (const key of HEAVY_PROP_KEYS) {
    if (key in next) {
      delete next[key];
      removed = true;
    }
  }
  return { props: next, removed };
}

function slimStructureModes(structureModes, { keepHeavyProps = false } = {}) {
  if (!structureModes || typeof structureModes !== 'object') return structureModes;

  const next = cloneJson(structureModes);

  if (!keepHeavyProps && next.modes && typeof next.modes === 'object') {
    for (const mode of Object.values(next.modes)) {
      if (!mode || typeof mode !== 'object') continue;
      const { props } = stripHeavyProps(mode.props);
      mode.props = props;
    }
  }

  return next;
}

function advancedTableSampleForPreset(dataPresetKey) {
  const samples = ADVANCED_TABLE_AI_SAMPLES;
  const key = dataPresetKey || 'default';

  if (key === 'flat_no_subrows') {
    return {
      columnDefinitions: cloneJson(samples.columnDefinitions),
      tableData: cloneJson(samples.tableDataFlat),
    };
  }

  if (key === 'column_sort') {
    return {
      columnDefinitions: cloneJson(samples.columnDefinitionsSortable),
      tableData: cloneJson(samples.tableDataNested),
    };
  }

  // default, with_ids, inline_loading, grouped_*, column_styling, etc.
  return {
    columnDefinitions: cloneJson(samples.columnDefinitions),
    tableData: cloneJson(samples.tableDataNested),
  };
}

function slimPresets(presets, kitName) {
  if (!Array.isArray(presets)) return presets;

  return presets.map((preset) => {
    if (!preset || typeof preset !== 'object') return preset;
    const { dataPreset, ...rest } = cloneJson(preset);
    const { props, removed } = stripHeavyProps(rest.props);
    rest.props = props || {};

    if (kitName === 'advanced_table') {
      const sample = advancedTableSampleForPreset(dataPreset);
      rest.props = {
        ...sample,
        ...rest.props,
      };
      if (dataPreset != null) rest.dataPreset = dataPreset;
      delete rest.dataNote;
      return rest;
    }

    if (dataPreset != null || removed) {
      rest.dataNote =
        'Mock dataset omitted from AI export; compose with schema props and docs examples.';
    }
    return rest;
  });
}

function enrichAdvancedTable(out, config) {
  const samples = ADVANCED_TABLE_AI_SAMPLES;

  out.samples = {
    description:
      'Tiny synthetic AdvancedTable datasets for AI codegen. Prefer these shapes over inventing column/row structures. Nested rows use a children array; cellAccessors list sub-row label fields for the first column.',
    columnDefinitions: cloneJson(samples.columnDefinitions),
    columnDefinitionsSortable: cloneJson(samples.columnDefinitionsSortable),
    tableDataNested: cloneJson(samples.tableDataNested),
    tableDataFlat: cloneJson(samples.tableDataFlat),
  };

  out.requiredProps = {
    columnDefinitions: cloneJson(samples.columnDefinitions),
    tableData: cloneJson(samples.tableDataNested),
  };

  if (config.dataPresets?.presets) {
    const keys = Object.keys(config.dataPresets.presets);
    out.dataPresets = {
      note: 'Full website mock datasets are not shipped. Each key maps to the tiny samples below (or samples.*).',
      keys,
      presets: Object.fromEntries(
        keys.map((key) => [
          key,
          {
            label: config.dataPresets.presets[key]?.label || key,
            ...advancedTableSampleForPreset(key),
          },
        ])
      ),
    };
  }

  // Point agents at the real template pattern (variables, not empty self-closing tag).
  if (!out.template || out.template === '<AdvancedTable{{props}} />') {
    out.template =
      '<AdvancedTable\n  columnDefinitions={columnDefinitions}\n  tableData={tableData}\n{{props}}\n/>';
  }

  return out;
}

/**
 * Convert a full website `_playground.json` into a slim AI export payload.
 * Returns null when there is nothing useful to ship.
 *
 * @param {object} config
 * @param {string} [kitName]
 */
export function slimPlaygroundConfig(config, kitName) {
  if (!config || typeof config !== 'object') return null;

  const isAdvancedTable = kitName === 'advanced_table';
  const out = {};

  for (const key of AI_PLAYGROUND_KEYS) {
    if (config[key] === undefined) continue;
    if (key === 'presets') {
      out.presets = slimPresets(config[key], kitName);
    } else if (key === 'structureModes') {
      out.structureModes = slimStructureModes(config[key], {
        keepHeavyProps: isAdvancedTable,
      });
    } else {
      out[key] = cloneJson(config[key]);
    }
  }

  if (isAdvancedTable) {
    enrichAdvancedTable(out, config);
  } else if (config.dataPresets?.presets) {
    out.dataPresets = {
      note: 'Mock table datasets omitted from AI export. See Playbook docs / kit examples for sample data.',
      keys: Object.keys(config.dataPresets.presets),
    };
  }

  return Object.keys(out).length > 0 ? out : null;
}

function formatConst(name, value) {
  return `const ${name} = ${JSON.stringify(value, null, 2)}`;
}

/**
 * Build a short React/Rails usage example from the first playground preset.
 */
export function usageFromPreset(kitName, pascalName, playground) {
  if (kitName === 'advanced_table' && playground?.requiredProps) {
    const { columnDefinitions, tableData } = playground.requiredProps;
    const reactSetup = [
      formatConst('columnDefinitions', columnDefinitions),
      formatConst('tableData', tableData),
    ].join('\n\n');

    return {
      react: {
        import: "import { AdvancedTable } from 'playbook-ui'",
        example: `${reactSetup}\n\n<AdvancedTable\n  columnDefinitions={columnDefinitions}\n  tableData={tableData}\n/>`,
        preset: playground.presets?.[0]?.name || 'Default',
      },
      rails: {
        import: null,
        example:
          '<%= pb_rails("advanced_table", props: {\n  column_definitions: column_definitions,\n  table_data: table_data\n}) %>',
        preset: playground.presets?.[0]?.name || 'Default',
        note: 'Define column_definitions / table_data in the view or helper using the same shapes as playgrounds/advanced_table.json samples.',
      },
    };
  }

  const preset = playground?.presets?.[0];
  if (!preset) return null;

  const props = preset.props && typeof preset.props === 'object' ? preset.props : {};
  const children =
    typeof preset.children === 'string'
      ? preset.children
      : typeof playground?.children?.default === 'string'
        ? playground.children.default
        : '';

  const reactPropParts = Object.entries(props).map(([name, value]) => {
    if (typeof value === 'boolean') return value ? name : `${name}={false}`;
    if (typeof value === 'number') return `${name}={${value}}`;
    if (typeof value === 'string') return `${name}=${JSON.stringify(value)}`;
    return `${name}={${JSON.stringify(value)}}`;
  });
  const reactProps = reactPropParts.length ? ` ${reactPropParts.join(' ')}` : '';

  const railsProps = Object.entries(props)
    .map(([name, value]) => {
      const snake = name.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
      return `${snake}: ${JSON.stringify(value)}`;
    })
    .join(', ');

  const hasChildren = children.trim().length > 0;
  const reactExample = hasChildren
    ? `<${pascalName}${reactProps}>\n  ${children.trim()}\n</${pascalName}>`
    : `<${pascalName}${reactProps} />`;

  const railsExample = hasChildren
    ? `<%= pb_rails("${kitName}", props: { ${railsProps} }) do %>\n  ${children.trim()}\n<% end %>`
    : `<%= pb_rails("${kitName}", props: { ${railsProps || ''} }) %>`;

  return {
    react: {
      import: `import { ${pascalName} } from 'playbook-ui'`,
      example: reactExample,
      preset: preset.name || null,
    },
    rails: {
      import: null,
      example: railsExample,
      preset: preset.name || null,
    },
  };
}

export function playgroundStats(slim) {
  if (!slim) {
    return { presetCount: 0, hintCount: 0, hasStructureModes: false, hasHints: false };
  }

  return {
    presetCount: Array.isArray(slim.presets) ? slim.presets.length : 0,
    hintCount: slim.hints && typeof slim.hints === 'object' ? Object.keys(slim.hints).length : 0,
    hasStructureModes: Boolean(slim.structureModes?.modes && Object.keys(slim.structureModes.modes).length),
    hasHints: Boolean(slim.hints && Object.keys(slim.hints).length),
    hasConditionals: Boolean(slim.conditionals && Object.keys(slim.conditionals).length),
    hasCustomProps: Boolean(slim.customProps && Object.keys(slim.customProps).length),
    hasSamples: Boolean(slim.samples),
  };
}
