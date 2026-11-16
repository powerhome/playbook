Set `floating` to open the chat as a window fixed to the viewport. It opens in the bottom-right corner at `defaultWidth` × `defaultHeight` (400 × 560 by default).

- **Move:** drag the header, or focus the header and use the arrow keys.
- **Resize:** drag any edge or corner, or focus the header and use Shift + arrow keys. The window stays at least 320 × 360 and never grows past the viewport.
- **Close:** pass `onClose` to show the close button. Escape also calls `onClose` while focus is inside the window.
- **Small screens:** below 576px the window fills the screen and moving and resizing are turned off.

Use `context` to show what the chat is about, such as the record or page the user asked from. Contextual chats can pass that same information to their agent.
