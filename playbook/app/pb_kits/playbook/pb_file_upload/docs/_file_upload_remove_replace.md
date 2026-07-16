The File Upload kit does not include built-in remove or replace behavior. Manage selected files in application state and compose the kit with other Playbook components.

**Remove** — Track accepted files in state and filter out the file to remove. In React, pair `List` with `CircleIconButton`. In Rails, listen for `change` on the file input, keep files in a JavaScript array, and use `DataTransfer` to sync the input when a file is removed.

**Replace** — Selecting a new file on the native Rails input replaces the current selection. For single-file React workflows, set state to the newly accepted files instead of appending: `setFilesToUpload(files)`.
