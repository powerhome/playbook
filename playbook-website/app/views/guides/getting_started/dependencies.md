---
title: Dependencies
icon: code
description: Some of our kits require additional libraries to run properly.
---

## Playbook UI Dependencies | React

Playbook UI's React library needs the following packages installed in your project to work properly:

```json
"react"
"react-dom"
"react-is"
```

Match your project's versions with Playbook's peer dependency ranges (currently React 17).

## Playbook UI Dependencies | Rails

The `playbook_ui` gem provides ViewComponents (`pb_rails`). Interactive kits need the npm `playbook-ui` package and `playbook-rails.js`. Chart kits also need Highcharts and `playbook-rails-charts-bindings.js`. Follow [Ruby & React Setup](/guides/getting_started/rails_&_react_setup) or [Ruby on Rails Setup](/guides/getting_started/ruby_on_rails_setup).

## Icons

Icon kits ([Icon](/kits/icon/react), [Icon Circle](/kits/icon_circle/react), [Icon Stat Value](/kits/icon_stat_value/react), and [Icon Value](/kits/icon_value/react)) use **Playbook Icons** by default. Font Awesome is **not required**.

### Playbook Icons (recommended)

Install and set up [Playbook Icons](/icons):

| Package | NPM |
|---------|-----|
| `@powerhome/playbook-icons` | [playbook-icons](https://www.npmjs.com/package/@powerhome/playbook-icons) |
| `@powerhome/playbook-icons-react` | [playbook-icons-react](https://www.npmjs.com/package/@powerhome/playbook-icons-react) |

Import the stylesheet:

```js
import "@powerhome/playbook-icons/css/pb-icons.css"
```

For React, register icons on `window.PB_ICONS` from `@powerhome/playbook-icons-react`. See the [Playbook Icons](/icons) page for full setup details.

### Font Awesome (optional)

The Icon kit remains compatible with Font Awesome class patterns if your application already provides Font Awesome stylesheets. Font Awesome is not bundled with Playbook and is not required for Icon kits to work.

## Unbundled Dependencies

These kits require you to install additional libraries for full functionality.

Add them with `yarn add`, `npm install`, or by updating your `package.json`.

| Kit | Packages |
|-----|----------|
| [Map](/kits/map/react) | [maplibre-gl](https://www.npmjs.com/package/maplibre-gl) |
| [PB Bar Graph](/kits/pb_bar_graph/react) | [highcharts](https://www.npmjs.com/package/highcharts), [highcharts-react-official](https://www.npmjs.com/package/highcharts-react-official) |
| [PB Circle Chart](/kits/pb_circle_chart/react) | [highcharts](https://www.npmjs.com/package/highcharts), [highcharts-react-official](https://www.npmjs.com/package/highcharts-react-official) |
| [PB Gauge Chart](/kits/pb_gauge_chart/react) | [highcharts](https://www.npmjs.com/package/highcharts), [highcharts-react-official](https://www.npmjs.com/package/highcharts-react-official) |
| [PB Line Graph](/kits/pb_line_graph/react) | [highcharts](https://www.npmjs.com/package/highcharts), [highcharts-react-official](https://www.npmjs.com/package/highcharts-react-official) |
| [Rich Text Editor](/kits/rich_text_editor/react) (TipTap) | [@tiptap/react](https://www.npmjs.com/package/@tiptap/react), [@tiptap/starter-kit](https://www.npmjs.com/package/@tiptap/starter-kit), [@tiptap/extension-link](https://www.npmjs.com/package/@tiptap/extension-link) |
| [Rich Text Editor](/kits/rich_text_editor/react) (Trix / legacy) | [trix](https://www.npmjs.com/package/trix), [react-trix](https://www.npmjs.com/package/react-trix) |

**Chart kits (React)**: PbBarGraph, PbCircleChart, PbGaugeChart, and PbLineGraph are available through a separate entrypoint so Highcharts stays optional:

```javascript
import { PbBarGraph, PbCircleChart, PbGaugeChart, PbLineGraph } from 'playbook-ui/charts'
```

**Chart kits (Rails)**: After `playbook-rails.js`, also import the chart bindings and install Highcharts:

```javascript
import 'playbook-ui/dist/playbook-rails.js'
import 'playbook-ui/dist/playbook-rails-charts-bindings.js'
```

**Map**: Also include MapLibre CSS (CDN or local import). See the [Map kit docs](/kits/map/react) for details.

**Advanced Table**: Available through a separate entrypoint so TanStack stays out of the main `playbook-ui` bundle until the kit is used. TanStack is bundled with that entrypoint — no additional installation is required:

```javascript
import { AdvancedTable } from 'playbook-ui/advanced-table'
```

## Bundled Dependencies

These kits use dependencies that ship with Playbook; no additional installation is required.

| Kit | Packages |
|-----|----------|
| [Advanced Table](/kits/advanced_table/react) | [@tanstack/react-table](https://www.npmjs.com/package/@tanstack/react-table), [@tanstack/react-virtual](https://www.npmjs.com/package/@tanstack/react-virtual) |
| [Date Picker](/kits/date_picker/react) | [flatpickr](https://www.npmjs.com/package/flatpickr) |
| [Dialog](/kits/dialog/react) | [react-modal](https://www.npmjs.com/package/react-modal) |
| [File Upload](/kits/file_upload/react) | [react-dropzone](https://www.npmjs.com/package/react-dropzone) |
| [Filter](/kits/filter/react) | [react-popper](https://www.npmjs.com/package/react-popper) |
| [LightBox](/kits/lightbox/react) | [react-zoom-pan-pinch](https://www.npmjs.com/package/react-zoom-pan-pinch) |
| [Passphrase](/kits/passphrase/react) | [react-popper](https://www.npmjs.com/package/react-popper) |
| [Phone Number Input](/kits/phone_number_input/react) | [intl-tel-input](https://www.npmjs.com/package/intl-tel-input) |
| [Popover](/kits/popover/react) | [react-popper](https://www.npmjs.com/package/react-popper) |
| [Tooltip](/kits/tooltip/react) | [@floating-ui/react](https://www.npmjs.com/package/@floating-ui/react) |
| [Typeahead](/kits/typeahead/react) | [react-select](https://www.npmjs.com/package/react-select) |

## Notes

**Rich Text Editor**: This kit supports two editors:

- **TipTap** (advanced): Install `@tiptap/react`, `@tiptap/starter-kit`, and `@tiptap/extension-link`. Add other [@tiptap](https://tiptap.dev/extensions) extensions as needed for your project.
- **Trix** (legacy default): Install `trix` and `react-trix` in your project. These are not bundled with Playbook.
