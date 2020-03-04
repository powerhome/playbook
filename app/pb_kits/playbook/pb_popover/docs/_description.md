A `popover` is a way to toggle content on top of other content. It can be used for small texts, small forms, or even dropdowns. By default, popover will toggle open/closed by simply clicking the trigger element.

### Enhancements

In addition, you may also choose to enable enhanced functionality so that the popover may be toggled by clicking outside of the "trigger element" and/or popover itself.

#### Usecase #1 - Close on click into popover content

You are building a single page application where clicking into the popover itself triggers some asynchronous actions which mutate the UI instantaneously. As a result, may want the popover to automatically close after a selection has been made from the popover contents.

#### Usecase #2 - Close only on click outside of popover content

You are building an custom in-page results filter list which is contained inside of the popover's content area. Since the filter list contains 5 filters, you may want to keep the popover open so that users may select multiple filters then only close the popover when users click outside of the popover.
