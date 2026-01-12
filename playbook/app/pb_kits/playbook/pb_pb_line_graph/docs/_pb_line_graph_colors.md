Custom data colors allow for color customization to match the needs of business requirements.

For React, import 'colors' from Playbook, then set custom colors in the colors array using the desired color variables. Hex colors are also available.

For Rails, POC#3: YAML is the source of truth (`tokens/colors.yml`). A generator (`yarn generate:from-tokens`) produces both SCSS and JSON with resolved values. Access tokens via `Playbook::Tokens.colors[:data_4]` or `Playbook::Tokens.colors.data_4`.