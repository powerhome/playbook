/**
 * Curated visual → kit cues for screenshot / design handoff codegen.
 * Merged with menu.yml catalog in build-ai-dist.mjs → dist/ai/visual-index.json
 *
 * MANUAL — not generated from kit source. Edit this file when:
 * - Agents pick the wrong kit from a screenshot (add looksLike / not / gotchas)
 * - A new ambiguous kit ships (Pill vs Badge, Table vs AdvancedTable, etc.)
 * - Typography / spacing heuristic maps need a tweak
 *
 * After editing: `yarn build:ai` (or `yarn generate:docs-metadata` from repo root).
 * See docs/AI_METADATA.md → "Updating the visual index".
 */

export const SPACING_PX_TO_TOKEN = {
  0: 'none',
  4: 'xxs',
  8: 'xs',
  16: 'sm',
  24: 'md',
  32: 'lg',
  40: 'xl',
  48: 'xxl',
};

export const TYPOGRAPHY_BY_VISUAL = [
  { when: 'Bold text, roughly ≥20px', kit: 'title', props: { size: 3 } },
  { when: 'Bold text, roughly 14–18px', kit: 'title', props: { size: 4 } },
  { when: 'Small muted text, roughly ≤12px', kit: 'caption', props: { size: 'xs' } },
  { when: 'Bold small/medium label (not a heading)', kit: 'detail' },
  { when: 'Default paragraph / body copy', kit: 'body' },
];

export const LAYOUT_CUES = [
  { when: 'Horizontal or vertical auto-layout / flex row or column of siblings', kit: 'flex' },
  { when: 'Surface with fill + border/radius containing content', kit: 'card' },
  { when: 'Full-bleed page/section background color or image', kit: 'background' },
  { when: 'Sidebar + main content regions', kit: 'layout' },
  { when: 'Thin horizontal rule / divider between sections', kit: 'section_separator' },
];

/** Ambiguous / high-traffic kits — looksLike, not, cues, gotchas */
export const KIT_VISUAL_CUES = {
  button: {
    looksLike: [
      'Filled or outline rectangular action with a label',
      'Primary blue CTA, secondary outline, or red danger action',
      'Text that looks like a link-styled control for a lesser action',
    ],
    not: ['circle_icon_button', 'icon_button', 'link', 'form_pill'],
    variantsFromVisual: {
      'solid blue / filled primary': 'primary',
      'outline / ghost secondary': 'secondary',
      'red destructive': 'danger',
      'text-only link style': 'link',
      'emoji/reaction with count': 'reaction',
    },
    cues: { typicalProps: ['variant', 'text', 'size', 'icon'] },
  },
  circle_icon_button: {
    looksLike: ['Round icon-only control with no text label'],
    not: ['button', 'icon_button', 'icon_circle'],
    cues: { typicalProps: ['icon', 'variant'] },
  },
  link: {
    looksLike: ['Inline text link in body copy, not a button-shaped control'],
    not: ['button'],
    cues: { typicalProps: ['text', 'href'] },
  },
  pill: {
    looksLike: [
      'Small rounded capsule / chip with short status text',
      'Colored tag next to a title (Active, Pending, etc.)',
    ],
    not: ['badge', 'form_pill', 'label_pill'],
    gotchas: [
      'Use text prop — children are ignored and render empty',
      'Use notification with variant for Badge notification parity (primary / error); there is no notificationError variant',
    ],
    cues: { typicalProps: ['text', 'variant'] },
  },
  badge: {
    looksLike: ['Small numeric or count indicator, often on an icon or nav item'],
    not: ['pill', 'form_pill', 'user_badge'],
    gotchas: ['Prefer text prop for the displayed value'],
    cues: { typicalProps: ['text', 'variant'] },
  },
  form_pill: {
    looksLike: ['Removable filter/tag chip inside a form or filter bar, often with an ×'],
    not: ['pill', 'badge', 'label_pill'],
    cues: { typicalProps: ['text'] },
  },
  label_pill: {
    looksLike: ['Caption label stacked with a Pill underneath'],
    not: ['pill', 'label_value'],
    cues: { composedOf: ['caption', 'pill'] },
  },
  card: {
    looksLike: ['White/light panel with border or shadow wrapping a content block'],
    not: ['background', 'selectable_card', 'dialog'],
    cues: { typicalProps: ['padding', 'borderNone', 'shadow'] },
  },
  selectable_card: {
    looksLike: ['Card that looks selectable (radio/checkbox behavior), often in a plan/tier group'],
    not: ['card', 'selectable_card_icon'],
    gotchas: ['Must be a direct child of FormGroup for selection to work'],
    cues: { typicalProps: ['checked', 'inputId'] },
  },
  form_group: {
    looksLike: ['Group of SelectableCards / radios / checkboxes sharing one choice group'],
    not: ['flex', 'card'],
    gotchas: ['Children must be direct SelectableCard/Radio/Checkbox — no wrapping Flex'],
  },
  table: {
    looksLike: ['Simple HTML-like data table without nested expandable tree rows'],
    not: ['advanced_table'],
    cues: { composedOf: ['Table.Head', 'Table.Body', 'Table.Row', 'Table.Cell'] },
  },
  advanced_table: {
    looksLike: [
      'Complex data grid with expand/collapse nested rows',
      'Sortable headers, row selection, column visibility, sticky columns',
    ],
    not: ['table'],
    gotchas: [
      'Requires columnDefinitions + tableData',
      'Copy shapes from playgrounds/advanced_table.json samples',
      'Nested rows use children arrays; first column often uses cellAccessors',
    ],
    cues: { typicalProps: ['columnDefinitions', 'tableData'] },
  },
  title: {
    looksLike: ['Page or section heading — larger/bolder than body'],
    not: ['body', 'caption', 'detail', 'title_count', 'title_detail'],
    cues: { typicalProps: ['text', 'size'] },
  },
  body: {
    looksLike: ['Standard paragraph text'],
    not: ['title', 'caption', 'detail'],
    cues: { typicalProps: ['text', 'color'] },
  },
  caption: {
    looksLike: ['Small supporting / helper / metadata text under a field or title'],
    not: ['body', 'detail', 'title'],
    cues: { typicalProps: ['text', 'size'] },
  },
  detail: {
    looksLike: ['Compact bold label text, denser than Body, not a Title'],
    not: ['body', 'caption', 'title'],
    cues: { typicalProps: ['text'] },
  },
  flex: {
    looksLike: ['Row or column of aligned siblings with gap/spacing'],
    not: ['card', 'layout', 'list'],
    gotchas: ['justify "spaceBetween" from Figma → Playbook "between"'],
    cues: { typicalProps: ['orientation', 'justify', 'align', 'gap', 'spacing'] },
  },
  nav: {
    looksLike: ['Vertical or horizontal navigation list of items'],
    not: ['list', 'bread_crumbs', 'button_toolbar'],
    gotchas: ['Sidebars are often variant="subtle"; compose with NavItem children'],
    cues: { typicalProps: ['orientation', 'variant'], readPlayground: true },
  },
  dialog: {
    looksLike: ['Centered modal overlay with header/body/footer'],
    not: ['popover', 'tooltip', 'lightbox', 'fixed_confirmation_toast'],
    cues: { composedOf: ['Dialog.Header', 'Dialog.Body', 'Dialog.Footer'] },
  },
  popover: {
    looksLike: ['Anchored floating panel near a trigger (not full-screen modal)'],
    not: ['dialog', 'tooltip', 'dropdown'],
  },
  tooltip: {
    looksLike: ['Tiny hover/focus hint bubble'],
    not: ['popover', 'dialog'],
  },
  fixed_confirmation_toast: {
    looksLike: ['Fixed success/error/neutral banner toast, usually top of viewport'],
    not: ['dialog', 'pill'],
    cues: { typicalProps: ['status', 'text'] },
  },
  text_input: {
    looksLike: ['Single-line labeled text field'],
    not: ['textarea', 'typeahead', 'phone_number_input', 'passphrase', 'select'],
    gotchas: ['required ≠ requiredIndicator — use both when the field is required'],
    cues: { typicalProps: ['label', 'placeholder', 'required', 'requiredIndicator'] },
  },
  textarea: {
    looksLike: ['Multi-line text field'],
    not: ['text_input', 'rich_text_editor'],
  },
  typeahead: {
    looksLike: ['Searchable autocomplete field that filters options as you type'],
    not: ['select', 'dropdown', 'text_input'],
  },
  select: {
    looksLike: ['Native-styled single-select dropdown form field'],
    not: ['dropdown', 'typeahead', 'multi_level_select'],
  },
  dropdown: {
    looksLike: ['Custom menu triggered by a control, with Dropdown.Option children'],
    not: ['select', 'typeahead'],
    cues: { readPlayground: true },
  },
  checkbox: {
    looksLike: ['Square checkbox for multi-select'],
    not: ['radio', 'toggle', 'selectable_card'],
  },
  radio: {
    looksLike: ['Circular radio for single choice in a group'],
    not: ['checkbox', 'toggle', 'selectable_card'],
  },
  toggle: {
    looksLike: ['On/off switch control'],
    not: ['checkbox'],
  },
  avatar: {
    looksLike: ['Circular user image or initials'],
    not: ['user_badge', 'multiple_users', 'image'],
    gotchas: ['Use name prop for initials — do not use layer/spec text as the person name'],
    cues: { typicalProps: ['name', 'size', 'imageUrl'] },
  },
  timestamp: {
    looksLike: ['Relative or absolute time string (e.g. "30 minutes ago")'],
    not: ['time', 'date', 'date_time'],
    gotchas: ['Pass a Date / time object via timestamp prop — display string is not the prop value'],
  },
  section_separator: {
    looksLike: ['Horizontal divider line between content blocks'],
    not: ['flex'],
    gotchas: ['Usually needs width="100%" or it collapses'],
  },
  currency: {
    looksLike: ['Formatted money amount, often large on dashboards'],
    not: ['dashboard_value', 'stat_value'],
  },
  dashboard_value: {
    looksLike: ['Large non-currency metric number on a dashboard'],
    not: ['currency', 'stat_value'],
  },
  filter: {
    looksLike: ['Search + filter controls bar above a results list/table'],
    not: ['typeahead', 'text_input'],
  },
  empty_state: {
    looksLike: ['Centered empty-results illustration/message with optional CTA'],
    not: ['card', 'dialog'],
  },
};
