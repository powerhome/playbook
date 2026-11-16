Agents should return structured data, not markup. Give each message a `type` plus the data it needs, and use `renderContent` to map each `type` to a response pattern built from Playbook kits. Return `undefined` from `renderContent` to fall back to the default rendering of `content`.

This example defines two patterns. `table` renders a Table with Pills in its cells, and `summary` renders label and value pairs. Ask about "compensation" or a "project summary" to see the agent choose a pattern.

This keeps agent logic out of the UI. Each chat experience can define its own patterns, and you can put those pattern definitions in your agent's instructions, or use the Playbook MCP, so the agent only returns types and fields the UI supports. Wide content such as multi-column tables scrolls sideways inside its message.
