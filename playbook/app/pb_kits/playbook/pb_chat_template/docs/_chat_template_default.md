Chat Template is controlled: pass the conversation as `messages` and handle new prompts with `onSubmit`. Each message needs an `id`, a `role` of `user` or `agent`, and `content`. String content is rendered with Body; any other React node is rendered as-is.

Set `loading` while waiting on the agent to show a typing indicator, and pass `onClear` to show a New chat button that resets the conversation. The thread scrolls to the newest message automatically.

When the chat is placed inline, give it a height (for example with the `height` global prop) so the conversation thread scrolls inside the window.
