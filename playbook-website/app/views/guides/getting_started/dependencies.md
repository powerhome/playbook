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
 "react-trix"
```

## Playbook UI Dependencies | Rails

Playbook UI's Rails gem requires React for its components javascript to fully function. Follow the instructions in the [Ruby & React Setup](/guides/getting_started/rails_&_react_setup) guide to add react to your Rails app.

## Unbundled Dependencies

These kits require you to install additional libraries to get full functionality.

To install them add them to your project using `yarn add`, `npm install`, or manually add them to your `package.json` file.

| Kit                 | Kit Link                                                                    | NPM Link(s)                                                                                              | Dependency(s)                               |
|---------------------|-----------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|---------------------------------------------|
| **Icon**            | [Icon](https://playbook.powerapp.cloud/kits/icon/react)                     | [fontawesome-free](https://www.npmjs.com/package/fontawesome-free)                                       | fontawesome-free                            |
| **Icon Circle**     | [Icon Circle](https://playbook.powerapp.cloud/kits/icon_circle/react)       | [fontawesome-free](https://www.npmjs.com/package/fontawesome-free)                                       | fontawesome-free                            |
| **Icon Stat Value** | [Icon Stat Value](https://playbook.powerapp.cloud/kits/icon_stat_value/react) | [fontawesome-free](https://www.npmjs.com/package/fontawesome-free)                                       | fontawesome-free                            |
| **Icon Value**      | [Icon Value](https://playbook.powerapp.cloud/kits/icon_value/react)         | [fontawesome-free](https://www.npmjs.com/package/fontawesome-free)                                       | fontawesome-free                            |
| **Map**             | [Map](https://playbook.powerapp.cloud/kits/map/react)                       | [maplibre-gl](https://www.npmjs.com/package/maplibre-gl)                                                 | maplibre-gl                                 |
| **PB Bar Graph**       | [PB Bar Graph](https://playbook.powerapp.cloud/kits/pb_bar_graph/react)           | [highcharts](https://www.npmjs.com/package/highcharts),<br>[highcharts-react-official](https://www.npmjs.com/package/highcharts-react-official) | highcharts,<br>highcharts-react-official |
| **PB Circle Chart**    | [PB Circle Chart](https://playbook.powerapp.cloud/kits/pb_circle_chart/react)     | [highcharts](https://www.npmjs.com/package/highcharts),<br>[highcharts-react-official](https://www.npmjs.com/package/highcharts-react-official) | highcharts,<br>highcharts-react-official |
| **PB Gauge Chart**           | [PB Gauge Chart](https://playbook.powerapp.cloud/kits/pb_gauge_chart/react)                   | [highcharts](https://www.npmjs.com/package/highcharts),<br>[highcharts-react-official](https://www.npmjs.com/package/highcharts-react-official) | highcharts,<br>highcharts-react-official |
| **PB Line Graph**      | [PB Line Graph](https://playbook.powerapp.cloud/kits/pb_line_graph/react)         | [highcharts](https://www.npmjs.com/package/highcharts),<br>[highcharts-react-official](https://www.npmjs.com/package/highcharts-react-official) | highcharts,<br>highcharts-react-official |
| **Rich Text Editor**<br>(TipTap Editor) | [Rich Text Editor](https://playbook.powerapp.cloud/kits/rich_text_editor/react) | - [@tiptap/core](https://www.npmjs.com/package/@tiptap/core)<br>- [@tiptap/react](https://www.npmjs.com/package/@tiptap/react)<br>- [@tiptap/starter-kit](https://www.npmjs.com/package/@tiptap/starter-kit)<br>- [@tiptap/extension-document](https://www.npmjs.com/package/@tiptap/extension-document)<br>- [@tiptap/extension-highlight](https://www.npmjs.com/package/@tiptap/extension-highlight)<br>- [@tiptap/extension-horizontal-rule](https://www.npmjs.com/package/@tiptap/extension-horizontal-rule)<br>- [@tiptap/extension-link](https://www.npmjs.com/package/@tiptap/extension-link)<br>- [@tiptap/extension-paragraph](https://www.npmjs.com/package/@tiptap/extension-paragraph)<br>- [@tiptap/extension-text](https://www.npmjs.com/package/@tiptap/extension-text)<br>- [@tiptap/pm](https://www.npmjs.com/package/@tiptap/pm) | - @tiptap/core<br>- @tiptap/react<br>- @tiptap/starter-kit<br>- @tiptap/extension-document<br>- @tiptap/extension-highlight<br>- @tiptap/extension-horizontal-rule<br>- @tiptap/extension-link<br>- @tiptap/extension-paragraph<br>- @tiptap/extension-text<br>- @tiptap/pm |

PbBarGraph, PbCircleChart, PbGaugeChart, and PbLineGraph are available through a separate entrypoint to keep Highcharts optional. Import them using:
```javascript
import { PbBarGraph, PbCircleChart, PbGaugeChart, PbLineGraph } from 'playbook-ui/charts'
```**Chart Kits**: 

## Bundled Dependencies

These kits use dependencies that are bundled with them; no additional installation is required.

| Kit                    | Kit Link                                                                    | NPM Link(s)                                                                                       | Dependency(s)                           |
|------------------------|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|-----------------------------------------|
| **Advanced Table**     | [Advanced Table](https://playbook.powerapp.cloud/kits/advanced_table/react) | [@tanstack/react-table](https://www.npmjs.com/package/@tanstack/react-table)                      | @tanstack/react-table                   |
| **Date Picker**        | [Date Picker](https://playbook.powerapp.cloud/kits/date_picker/react)       | [flatpickr](https://www.npmjs.com/package/flatpickr)                                              | flatpickr                               |
| **Dialog**             | [Dialog](https://playbook.powerapp.cloud/kits/dialog/react)                 | [react-modal](https://www.npmjs.com/package/react-modal)                                          | react-modal                             |
| **File Upload**        | [File Upload](https://playbook.powerapp.cloud/kits/file_upload/react)       | [react-dropzone](https://www.npmjs.com/package/react-dropzone)                                    | react-dropzone                          |
| **Filter**             | [Filter](https://playbook.powerapp.cloud/kits/filter/react)                 | [react-popper](https://www.npmjs.com/package/react-popper)                                        | react-popper                            |
| **Highlight**          | [Highlight](https://playbook.powerapp.cloud/kits/highlight/react)           | [react-highlight-words](https://www.npmjs.com/package/react-highlight-words)                      | react-highlight-words                   |
| **LightBox**           | [LightBox](https://playbook.powerapp.cloud/kits/lightbox/react)             | [react-zoom-pan-pinch](https://www.npmjs.com/package/react-zoom-pan-pinch)                        | react-zoom-pan-pinch                    |
| **Passphrase**         | [Passphrase](https://playbook.powerapp.cloud/kits/passphrase/react)         | [react-popper](https://www.npmjs.com/package/react-popper)                                        | react-popper                            |
| **Phone Number Input** | [Phone Number Input](https://playbook.powerapp.cloud/kits/phone_number_input/react) | [intl-tel-input](https://www.npmjs.com/package/intl-tel-input)                                    | intl-tel-input                          |
| **Popover**            | [Popover](https://playbook.powerapp.cloud/kits/popover/react)               | [react-popper](https://www.npmjs.com/package/react-popper) | react-popper                 |
| **Rich Text Editor**<br>(Trix Editor) | [Rich Text Editor](https://playbook.powerapp.cloud/kits/rich_text_editor/react) | [trix](https://www.npmjs.com/package/trix),<br>[react-trix](https://www.npmjs.com/package/react-trix) | trix,<br>react-trix                     |
| **Tooltip**            | [Tooltip](https://playbook.powerapp.cloud/kits/tooltip/react)               | [@floating-ui/react](https://www.npmjs.com/package/@floating-ui/react)                            | @floating-ui/react                      |
| **Typeahead**          | [Typeahead](https://playbook.powerapp.cloud/kits/typeahead/react)           | [react-select](https://www.npmjs.com/package/react-select)| react-select

## Notes
**Rich Text Editor**: This kit supports two different editors:
**TipTap Editor**: Requires manual installation of `tiptap` and various `@tiptap/*` extensions (listed above under Unbundled Dependencies).
**Trix Editor**: Dependencies (`trix` and `react-trix`) are bundled with the kit; no extra installation is needed.
