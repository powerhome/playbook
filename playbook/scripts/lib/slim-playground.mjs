/**
 * Slim playground configs for AI dist export.
 *
 * Keeps high-signal codegen fields (presets, hints, composition) and strips
 * website UI chrome + large mock datasets that would bloat dist/ai.
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
];

const HEAVY_PROP_KEYS = new Set(['columnDefinitions', 'tableData', 'table_data']);

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

function slimStructureModes(structureModes) {
  if (!structureModes || typeof structureModes !== 'object') return structureModes;

  const next = cloneJson(structureModes);
  let strippedData = false;

  if (next.modes && typeof next.modes === 'object') {
    for (const mode of Object.values(next.modes)) {
      if (!mode || typeof mode !== 'object') continue;
      const { props, removed } = stripHeavyProps(mode.props);
      mode.props = props;
      if (removed) strippedData = true;
    }
  }

  if (strippedData) {
    next.dataNote =
      'Large mock datasets (columnDefinitions/tableData) omitted from AI export. Use kit docs for sample table data.';
  }

  return next;
}

function slimPresets(presets) {
  if (!Array.isArray(presets)) return presets;

  return presets.map((preset) => {
    if (!preset || typeof preset !== 'object') return preset;
    const { dataPreset, ...rest } = cloneJson(preset);
    const { props, removed } = stripHeavyProps(rest.props);
    rest.props = props;
    if (dataPreset != null || removed) {
      rest.dataNote =
        'Mock dataset omitted from AI export; compose with schema props and docs examples.';
    }
    return rest;
  });
}

/**
 * Convert a full website `_playground.json` into a slim AI export payload.
 * Returns null when there is nothing useful to ship.
 */
export function slimPlaygroundConfig(config) {
  if (!config || typeof config !== 'object') return null;

  const out = {};
  for (const key of AI_PLAYGROUND_KEYS) {
    if (config[key] === undefined) continue;
    if (key === 'presets') {
      out.presets = slimPresets(config[key]);
    } else if (key === 'structureModes') {
      out.structureModes = slimStructureModes(config[key]);
    } else {
      out[key] = cloneJson(config[key]);
    }
  }

  if (config.dataPresets?.presets) {
    out.dataPresets = {
      note: 'Mock table datasets omitted from AI export. See Playbook docs / kit examples for AdvancedTable sample data.',
      keys: Object.keys(config.dataPresets.presets),
    };
  }

  return Object.keys(out).length > 0 ? out : null;
}

/**
 * Build a short React/Rails usage example from the first playground preset.
 */
export function usageFromPreset(kitName, pascalName, playground) {
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
  };
}
