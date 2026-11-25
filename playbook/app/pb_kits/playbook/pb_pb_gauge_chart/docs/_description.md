**In order to use this kit, 'highcharts' and 'highcharts-react-official' must be installed in your repo.**

This kit is a wrapper around the Highcharts library. It applies styling and default settings but does NOT ship Highcharts. Once 'highcharts' and 'highcharts-react-official are installed into your repo, any prop or functionality provided by Highcharts can be used with this kit without requiring specific props from Playbook. The doc examples below showcase a few common usecases but are not a comprehensive list of all the functionalities possible. 

See the [highcharts API docs](https://api.highcharts.com/highcharts/) for a comprehensive look at what is possible.

`credits` stays off. `href` and `url` values are kept only for `http:`, `https:`, and same-origin paths. Pass `sanitizeOptions` in React, or `sanitize_options` in Rails, when `options` come from untrusted input. That keeps presentation and data keys and drops functions, `events`, formatters, and `useHTML`.

**NOTE**: All chart kits are available through a separate entrypoint to keep Highcharts optional. Import them using:
```javascript
import { PbGaugeChart } from 'playbook-ui/charts'
```