## Customizing a Chat Experience

| Shared (Chat Template) | Customized (your app) |
| --- | --- |
| Window layout, header, and actions | `title`, `icon`, and `context` |
| Thread scrolling and message bubbles | The `messages` state and how it is stored |
| Prompt input and submission | What `onSubmit` sends to your agent |
| Loading, empty, and error states | `emptyState`, `loadingText`, and `error` copy |
| Floating, move, and resize behavior | Whether to use `floating`, plus `defaultWidth` and `defaultHeight` |
| Default text rendering | Response patterns in `renderContent` |

## Response Guidelines for Agents
- Return structured data such as `{ type: "table", columns, rows }` instead of HTML or markdown, and render it with Playbook kits in `renderContent`.
- Keep the list of response types short, and describe each type and its fields in your agent's instructions.
- Use Table with `size="sm"` for tabular data, and put Playbook kits such as Pill, Currency, or User in cells when they add meaning.
- Return plain `content` text for conversational replies.

## Accessibility
- The window has an accessible name from `title`. It uses the `dialog` role when floating and the `region` role when inline.
- The thread uses the `log` role, so screen readers announce new messages. Errors use the `alert` role.
- The header, New chat button, close button, input, and send button can all be reached with the keyboard. When floating, the header moves the window with the arrow keys and resizes it with Shift + arrow keys, and Escape closes it.

## Things To Avoid
- Do not render HTML strings from an agent directly. Map structured responses to Playbook kits instead.
- Do not open more than one floating chat at a time.
