Chat Template provides a consistent starting point for AI chat experiences, such as contextual chats on a page or a central Nitro Intelligence chat. It handles the chat interface: the header, an optional context bar, a scrollable conversation thread, the prompt input, and loading, empty, and error states. It can render inline or as a floating window that users can move and resize.

Your app owns the agent integration. Keep the conversation in state, send prompts to your agent in `onSubmit`, and add the responses to `messages`.
