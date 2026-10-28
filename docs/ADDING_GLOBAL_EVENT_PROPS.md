# How to Add a New Global Event Prop

Global event props are React-only event handler props that opted-in kits can accept through a shared helper. They are separate from class-based [global props](ADDING_GLOBAL_PROPS.md). Do not add them to Rails kits or to the `GlobalProps` type — kits with kit-specific handler signatures (for example StarRating’s `(value: number) => void`) must keep their own APIs.

## 1. Define the Event Prop Type and Helper

Update `playbook/app/pb_kits/playbook/utilities/globalEventProps.ts`.

- Add the TypeScript type for the handler (prefer React’s typed event handlers, e.g. `React.MouseEventHandler<HTMLElement>`).
- Add the type into the exported `GlobalEventProps` object type.
- Extend `globalEventProps()` so it returns only defined handlers (omit absent values so they do not overwrite kit or `htmlOptions` behavior unintentionally).
- Keep handlers out of `globalProps.ts` / `PROP_CATEGORIES` — they must not generate CSS classes or land in `domSafeProps` for class-based reasons.

## 2. Opt Kits In Explicitly

Global event props are **opt-in**. A kit supports them only when its React props type intersects `GlobalEventProps` and the kit spreads the shared helper onto the intended DOM node.

In the kit’s `_kit.tsx`:

1. Import `GlobalEventProps` and `globalEventProps`.
2. Append `& GlobalEventProps` to the props type (alongside `& GlobalProps` when present).
3. Spread `{...globalEventProps(props)}` on the **root** (or otherwise intentional) host element.

Schema generation detects `GlobalEventProps` in the props type and sets `globalEventProps: true` on `kit.schema.json`. Do not hand-edit that flag.

### Do not opt in when

- The kit already exposes the same handler name with a different signature or target (Button, FormPill, StarRating, Nav, Collapsible, and similar).
- Attaching a root handler would duplicate or fight an existing kit-specific callback.
- Rails is the only consumer surface for the change — these props are React-only.

## 3. Handler Placement and Precedence

Spread order on the host element matters:

```tsx
<Tag
    {...ariaProps}
    {...dataProps}
    {...htmlProps}
    {...globalEventProps(props)}
    className={classes}
>
```

- Spread `globalEventProps(props)` **after** `htmlProps` / `htmlOptions` so a first-class event prop wins over `htmlOptions.onClick` (or the matching handler).
- If the first-class prop is omitted, `htmlOptions` handlers continue to work as before.
- Do not attach the same handler twice (once via kit logic and again via `globalEventProps`).
- Nested clickable kits still follow normal React bubbling unless a handler calls `stopPropagation`.

Preserve existing kit-specific handlers on non-opted-in kits. Adding a global event prop must not change their typing, target element, or call signature.

## 4. Add Tests

Add focused React coverage under `playbook/app/pb_kits/playbook/utilities/test/globalProps/` (or a dedicated `globalEventProps/` folder if the suite grows).

- Helper: returns the handler when present; returns `{}` when absent.
- Opted-in kits (for example Avatar, Background, Body, Caption, Card, Contact, Container, Currency, DashboardValue, Detail, Flex, Highlight, IconStatValue, IconValue, Image, LabelPill, LabelValue, Legend, ListItem, Message, MultipleUsers, MultipleUsersStacked, OnlineStatus, Person, Pill, ProgressStepItem, Source, StatChange, StatValue, Timeline.Item, Title, TitleCount, TitleDetail, User, UserBadge): handler fires on the root element.
- Precedence: first-class handler wins over `htmlOptions` for the same event; `htmlOptions` still works when the first-class prop is omitted.
- Non-opted-in kits with kit-specific handlers: behavior and signatures stay unchanged.
- Confirm the handler does **not** produce CSS classes via `globalProps()`.

There is no Rails global-event-prop spec surface — these props are React-only.

## 5. Create Docs Site Example

Add a Global Event Props page that demonstrates the prop and documents precedence / kit-specific conflicts.

- Example: `playbook-website/app/javascript/components/Website/src/components/GlobalPropsAndTokens/ExamplesPage/Examples/{PropName}.tsx`
- Wire into `GlobalEventPropsExamplesIndex.tsx` and `GlobalEventPropsCards.ts`
- Sidebar / search config: `playbook-website/config/global_props_and_tokens.yml` under `global_event_props`

## 6. Regenerate Metadata

After changing `globalEventProps.ts` or kit opt-in, regenerate from the repo root:

```bash
yarn generate:docs-metadata
```

This updates (among other generated files):

- `playbook/app/pb_kits/playbook/utilities/global-event-props.schema.json`
- `playbook/app/pb_kits/playbook/pb_*/kit.schema.json` (`globalEventProps: true` when opted in)
- `playbook-website/.../AvailableProps/globalEventPropsValues.ts`
- `playbook/dist/ai/**` (including `global-event-props.schema.json`)

Never hand-edit those generated files. Targeted regenerate options:

| Scope | Command |
| --- | --- |
| Global event props schema only | `cd playbook && yarn generate:global-event-props-metadata` |
| Website values table only | `cd playbook-website && yarn generate:global-event-props-values` |

## 7. Kit Show Page Tab

Supported kits (`globalEventProps: true` in `kit.schema.json`) show a **Global Event Props** tab next to Kit Props and Global Props on the React kit show page. Unsupported kits omit the tab. The tab reads generated `globalEventPropsValues.ts` — do not hardcode prop rows in the UI.

## 8. Final Checklist

- Prop lives on `GlobalEventProps`, not `GlobalProps`.
- `globalEventProps()` omits undefined handlers.
- Only intentional kits opt in; kit-specific handlers elsewhere are unchanged.
- Spread order preserves first-class precedence over `htmlOptions`.
- React tests cover helper, opted-in kits, precedence, and non-opted-in kits.
- Docs example + sidebar entry exist.
- `yarn generate:docs-metadata` has been run; generated schema, kit flags, and website values are staged.
- Supported kit pages show the Global Event Props tab; unsupported kit pages do not.
