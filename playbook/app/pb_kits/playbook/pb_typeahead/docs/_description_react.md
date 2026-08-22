Typeahead is auto suggestion or completion based on what the user is starting to type, gets refined as the user types more.

Typeahead is available through a separate entrypoint so react-select stays out of the main `playbook-ui` bundle until this kit is used. react-select is still bundled with that entrypoint, no additional installation is required.

**NOTE**: Import Typeahead using:
```javascript
import { Typeahead } from 'playbook-ui/typeahead'
```
