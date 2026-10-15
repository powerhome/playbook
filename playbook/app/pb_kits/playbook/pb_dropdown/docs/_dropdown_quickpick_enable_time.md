When linked DatePickers use `enable_time` / `enableTime`, QuickPick presets that do not include an explicit time apply **start of day** (12:00 AM) to the start picker and **end of day** (11:59:59 PM) to the end picker. That matches inclusive datetime filters for ranges like Today and Yesterday.

Custom QuickPick values that include an explicit time are preserved as configured.

Alternate configuration: QuickPick + Time can also be handled by a Date-only QuickPick (Dropdown QuickPick + two DatePickers without time selection) paired with two TimePickers for start + end time selection in the same form.
