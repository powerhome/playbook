/**
 * Convert playground JSX children strings into Rails ERB (pb_rails) for AI usage examples.
 *
 * Handles common playground patterns: self-closing kits, open/close tags with text or
 * nested kits, compound Parent.Child tags, and literal `{...}` expressions.
 * Non-literal JS (handlers, state) is skipped on props; unconvertible trees return null.
 */

const REACT_TO_RAILS_KIT = {
  BreadCrumbItem: 'bread_crumbs/bread_crumb_item',
  FlexItem: 'flex/flex_item',
  NavItem: 'nav/item',
  ListItem: 'list/item',
  ProgressStepItem: 'progress_step/progress_step_item',
  'Timeline.Item': 'timeline/item',
  'Timeline.Step': 'timeline/step',
  'Timeline.Label': 'timeline/label',
  'Timeline.Detail': 'timeline/detail',
  'Layout.Side': 'layout/sidebar',
  'Layout.Body': 'layout/body',
  'Layout.Header': 'layout/header',
  'Layout.Footer': 'layout/footer',
  'Layout.Item': 'layout/item',
  'Table.Head': 'table/table_head',
  'Table.Body': 'table/table_body',
  'Table.Row': 'table/table_row',
  'Table.Header': 'table/table_header',
  'Table.Cell': 'table/table_cell',
  'SelectableList.Item': 'selectable_list/selectable_list_item',
};

/** Known React-only compounds that have no Rails kit path — fail conversion. */
const REACT_ONLY_COMPONENTS = new Set([
  'Layout.Round',
  'Layout.RoundLabel',
  'Layout.Game',
  'Layout.Participant',
]);

/** Component-specific React → Rails prop renames. `null` drops the prop. */
const COMPONENT_PROP_ALIASES = {
  BreadCrumbItem: { href: 'link', component: null },
  'SelectableList.Item': { label: 'text' },
};

const DROP_PROPS = new Set([
  'onChange',
  'onClick',
  'onClose',
  'onSelect',
  'onBlur',
  'onFocus',
  'onKeyDown',
  'onKeyUp',
  'onMouseEnter',
  'onMouseLeave',
  'key',
  'ref',
  'children',
]);

function pascalToSnake(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .toLowerCase();
}

function camelToSnake(name) {
  return name.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
}

function reactNameToRailsKit(name) {
  if (REACT_TO_RAILS_KIT[name]) return REACT_TO_RAILS_KIT[name];
  if (name.includes('.')) {
    const [parent, child] = name.split('.');
    return `${pascalToSnake(parent)}/${pascalToSnake(child)}`;
  }
  return pascalToSnake(name);
}

function isHtmlTag(name) {
  return /^[a-z][a-z0-9]*$/.test(name);
}

function formatRubyValue(value) {
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return String(value);
  if (value === null) return 'nil';
  if (Array.isArray(value)) {
    return `[${value.map((v) => formatRubyValue(v)).join(', ')}]`;
  }
  if (typeof value === 'object') return formatRubyHash(value);
  return JSON.stringify(String(value));
}

function formatRubyHashKey(key) {
  const raw = String(key);
  // Identifiers (camelCase or snake_case) → snake_case symbol keys.
  // Leave labels / paths / spaced keys as quoted hash rockets.
  if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(raw)) {
    return `${camelToSnake(raw)}:`;
  }
  return `${JSON.stringify(raw)} =>`;
}

function formatRubyHash(obj) {
  const parts = Object.entries(obj).map(
    ([k, v]) => `${formatRubyHashKey(k)} ${formatRubyValue(v)}`
  );
  return `{ ${parts.join(', ')} }`;
}

function formatRailsProps(props) {
  const parts = Object.entries(props).map(
    ([name, value]) => `${name}: ${formatRubyValue(value)}`
  );
  return parts.length ? ` props: { ${parts.join(', ')} }` : '';
}

function parseExpressionLiteral(expr) {
  const trimmed = expr.trim();
  if (trimmed === 'true') return { ok: true, value: true };
  if (trimmed === 'false') return { ok: true, value: false };
  if (trimmed === 'null' || trimmed === 'undefined') return { ok: true, value: null };
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return { ok: true, value: Number(trimmed) };
  const strMatch = trimmed.match(/^(['"])([\s\S]*)\1$/);
  if (strMatch) return { ok: true, value: strMatch[2] };
  return { ok: false };
}

function readBalanced(s, start, openChar, closeChar) {
  let depth = 1;
  let i = start;
  while (i < s.length && depth > 0) {
    if (s[i] === openChar) depth += 1;
    else if (s[i] === closeChar) depth -= 1;
    if (depth > 0) i += 1;
  }
  return i;
}

function parseAttributes(attrString, componentName) {
  const props = {};
  const aliases = COMPONENT_PROP_ALIASES[componentName] || {};
  let i = 0;
  const s = attrString;

  while (i < s.length) {
    while (i < s.length && /\s/.test(s[i])) i += 1;
    if (i >= s.length) break;

    const nameMatch = s.slice(i).match(/^([A-Za-z_][\w]*)/);
    if (!nameMatch) break;
    const reactName = nameMatch[1];
    i += reactName.length;

    while (i < s.length && /\s/.test(s[i])) i += 1;

    let value = true;
    if (s[i] === '=') {
      i += 1;
      while (i < s.length && /\s/.test(s[i])) i += 1;

      if (s[i] === '"' || s[i] === "'") {
        const quote = s[i];
        i += 1;
        let end = i;
        while (end < s.length && s[end] !== quote) end += 1;
        value = s.slice(i, end);
        i = end + 1;
      } else if (s[i] === '{') {
        const end = readBalanced(s, i + 1, '{', '}');
        const parsed = parseExpressionLiteral(s.slice(i + 1, end));
        i = end + 1;
        if (!parsed.ok) continue;
        value = parsed.value;
      } else {
        break;
      }
    }

    if (DROP_PROPS.has(reactName)) continue;
    if (Object.prototype.hasOwnProperty.call(aliases, reactName)) {
      const aliased = aliases[reactName];
      if (aliased == null) continue;
      props[aliased] = value;
      continue;
    }
    props[camelToSnake(reactName)] = value;
  }

  return props;
}

/**
 * @returns {Array<{type:'text',value:string}|{type:'element',name:string,props:object,rawAttrs:string,children:Array,selfClosing:boolean}>}
 */
export function parseJsxChildren(input) {
  const s = input;
  let i = 0;

  function parseNodes(closeName) {
    const nodes = [];

    while (i < s.length) {
      if (s[i] === '<' && s[i + 1] === '/') {
        const closeMatch = s.slice(i).match(/^<\/([A-Za-z_][\w.]*)\s*>/);
        if (closeMatch && closeName && closeMatch[1] === closeName) {
          i += closeMatch[0].length;
          return nodes;
        }
        return nodes;
      }

      if (s[i] === '<') {
        const el = parseElement();
        if (!el) return nodes;
        nodes.push(el);
        continue;
      }

      // Text or `{...}` expression
      const start = i;
      while (i < s.length && s[i] !== '<') {
        if (s[i] === '{') {
          const before = s.slice(start, i);
          if (before.trim()) nodes.push({ type: 'text', value: before });
          const end = readBalanced(s, i + 1, '{', '}');
          const parsed = parseExpressionLiteral(s.slice(i + 1, end));
          if (parsed.ok && parsed.value != null) {
            nodes.push({ type: 'text', value: String(parsed.value) });
          }
          i = end + 1;
          nodes.push(...parseNodes(closeName));
          return nodes;
        }
        i += 1;
      }
      const text = s.slice(start, i);
      if (text.trim()) nodes.push({ type: 'text', value: text });
    }

    return nodes;
  }

  function parseElement() {
    if (s[i] !== '<' || s[i + 1] === '/') return null;
    i += 1;

    const nameMatch = s.slice(i).match(/^([A-Za-z_][\w.]*)/);
    if (!nameMatch) return null;
    const name = nameMatch[1];
    i += name.length;

    const attrStart = i;
    let selfClosing = false;

    while (i < s.length) {
      if (s[i] === '"' || s[i] === "'") {
        const quote = s[i];
        i += 1;
        while (i < s.length && s[i] !== quote) i += 1;
        i += 1;
        continue;
      }
      if (s[i] === '{') {
        i = readBalanced(s, i + 1, '{', '}') + 1;
        continue;
      }
      if (s[i] === '/' && s[i + 1] === '>') {
        selfClosing = true;
        break;
      }
      if (s[i] === '>') break;
      i += 1;
    }

    const rawAttrs = s.slice(attrStart, i).replace(/\/\s*$/, '').trim();
    if (selfClosing) i += 2;
    else if (s[i] === '>') i += 1;

    const element = {
      type: 'element',
      name,
      props: isHtmlTag(name) ? {} : parseAttributes(rawAttrs, name),
      rawAttrs,
      children: [],
      selfClosing,
    };

    if (!selfClosing) {
      element.children = parseNodes(name);
    }

    return element;
  }

  return parseNodes(null);
}

function renderPbRails(kit, props, childrenErb, indent) {
  const pad = ' '.repeat(indent);
  const propsStr = formatRailsProps(props);
  const open = propsStr
    ? `<%= pb_rails("${kit}",${propsStr}) %>`
    : `<%= pb_rails("${kit}") %>`;
  const openBlock = propsStr
    ? `<%= pb_rails("${kit}",${propsStr}) do %>`
    : `<%= pb_rails("${kit}") do %>`;

  if (!childrenErb || !childrenErb.trim()) {
    return `${pad}${open}`;
  }

  const trimmed = childrenErb.trim();
  const isSimpleText = !trimmed.includes('\n') && !trimmed.includes('pb_rails');

  if (isSimpleText && trimmed.length < 80) {
    return `${pad}${openBlock} ${trimmed} <% end %>`;
  }

  return `${pad}${openBlock}\n${childrenErb}\n${pad}<% end %>`;
}

function renderNodesToErb(nodes, indent = 0) {
  const pad = ' '.repeat(indent);
  const lines = [];

  for (const node of nodes) {
    if (node.type === 'text') {
      const text = node.value.replace(/\s+/g, ' ').trim();
      if (text) lines.push(`${pad}${text}`);
      continue;
    }

    if (REACT_ONLY_COMPONENTS.has(node.name)) return null;

    if (isHtmlTag(node.name)) {
      const attrs = node.rawAttrs ? ` ${node.rawAttrs}` : '';
      if (node.selfClosing || !node.children.length) {
        lines.push(`${pad}<${node.name}${attrs} />`);
      } else {
        const inner = renderNodesToErb(node.children, indent + 2);
        if (inner == null) return null;
        if (!inner.includes('\n') && inner.trim().length < 60) {
          lines.push(`${pad}<${node.name}${attrs}>${inner.trim()}</${node.name}>`);
        } else {
          lines.push(`${pad}<${node.name}${attrs}>`);
          lines.push(inner);
          lines.push(`${pad}</${node.name}>`);
        }
      }
      continue;
    }

    const kit = reactNameToRailsKit(node.name);
    const childErb = node.children.length
      ? renderNodesToErb(node.children, indent + 2)
      : '';
    if (childErb == null) return null;

    lines.push(renderPbRails(kit, node.props, childErb, indent));
  }

  return lines.join('\n');
}

/**
 * Convert a JSX children string to an ERB fragment.
 * @returns {string|null}
 */
export function jsxChildrenToErb(jsx) {
  if (typeof jsx !== 'string') return null;
  const trimmed = jsx.trim();
  if (!trimmed) return '';
  if (!trimmed.includes('<')) return trimmed;

  try {
    const ast = parseJsxChildren(trimmed);
    if (!ast.length) return null;
    const erb = renderNodesToErb(ast, 0);
    if (erb == null || !erb.trim()) return null;
    if (/<[A-Z][A-Za-z0-9.]*[\s/>]/.test(erb)) return null;
    return erb;
  } catch {
    return null;
  }
}

/**
 * Convert SelectableList.Item JSX children into Rails `items` array entries.
 * @returns {object[]|null}
 */
export function selectableListItemsFromJsx(jsx) {
  if (typeof jsx !== 'string' || !jsx.includes('SelectableList.Item')) return null;

  try {
    const ast = parseJsxChildren(jsx.trim());
    const items = ast.filter((n) => n.type === 'element');
    if (!items.length || items.some((n) => n.name !== 'SelectableList.Item')) {
      return null;
    }

    return items.map((node) => {
      const item = {};
      if (node.props.text != null) item.text = node.props.text;
      if (node.props.checked === true) item.checked = true;
      const inputOptions = {};
      if (node.props.name != null) inputOptions.name = node.props.name;
      if (node.props.value != null) inputOptions.value = node.props.value;
      if (Object.keys(inputOptions).length) item.input_options = inputOptions;
      return item;
    });
  } catch {
    return null;
  }
}

export { REACT_TO_RAILS_KIT, reactNameToRailsKit, camelToSnake, formatRailsProps, formatRubyValue };
