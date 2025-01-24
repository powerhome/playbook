`sortControl` is an optional prop that can be used to gain greater control over the sort state of the Advanced Table. Tanstack handles sort itself, however it does provide for a way to handle the state manually if needed. Usecases for this include needing to store the sort state so it persists on page reload, set an initial sort state, etc.

The sort state must be an object with a single key/value pair, with the key being "desc" and the value being a boolean. The default for sort direction is `desc: true`.
