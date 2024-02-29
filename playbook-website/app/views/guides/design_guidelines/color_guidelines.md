---
title: Color Guidelines
description: As a design system primarily used for business software applications, we use color to enhance user comprehension, not as ornament.
icon: palette
---

For all our Color Tokens refer to [Colors](https://playbook.powerapp.cloud/visual_guidelines/colors) in [Tokens & Guidelines](https://playbook.powerapp.cloud/visual_guidelines)

#### Index

[Color Palette & Usage: Best Practices](#Color-Palette-amp-Usage-Best-Practices)
‣ [Text Colors](#Text-Colors)
‣ [Status Colors](#Status-Colors)
‣ [Interface Colors](#Interface-Layout-Colors)
‣ [Data Visualization Colors](#Data-Visualization-and-Additional-Palettes)
[Color Accessibility Standards](#Color-Accessibility-Standards)

<br/>

<div style="display: flex">
<p style="padding-right: 80px">
As a design system primarily used for business software applications, we use color to enhance user comprehension, not as ornament.
<br/>
<br/>
Our design system components use neutrals and muted tones with pops of our primary blue to create a clear hierarchy.
<br/>
<br/>
Other colors within our design system are used sparingly and intentionally to communicate system feedback.
<br/>
<br/>
These decisions creates a balanced UI that fosters user understanding without unnecessary distractions.
</p>
<img src="https://github.com/powerhome/playbook/assets/89551222/e1cc85e8-2582-4662-a71d-f63867cc02e1" width="298" height="226" alt="Color Wheel Image">
</div>

## Color Palette & Usage: Best Practices

#### Text Colors

Playbook’s three main text colors are utilized for general content such as labels, microcopy, body text and titles, providing clarity and readability for essential information.
Link text color serves to highlight interactive elements, guiding users to clickable areas and enhancing the navigational experience.
Error and success colors are employed to communicate feedback on actions, with error colors signaling issues and success colors indicating successful completion.

By applying these text colors, designers can create intuitive interfaces that effectively guide users and convey important messages. These colors help keep UI consistent and make it easy to maintain a cohesive and user-friendly experience.

| Text Colors | Name & Token                                                                        | Contrast Ratio      | Usage                                                                                    |
| ----------- | ----------------------------------------------------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------- |
| Image       | <small> DEFAULT <br/> $text_lt_default <br/> $text_dk_default</small>               | 14:1 <br/> 19.73:1  | Primary text color for all general use cases.                                            |
| Image       | <small> LIGHT <br/> $text_lt_light <br/> $text_dk_light</small>                     | 4.54:1 <br/> 7.23:1 | Best for captions, secondary text and labels.                                            |
| Image       | <small> LIGHTER <br/> $text_lt_lighter <br/> $text_dk_lighter</small>               | 1.16:1 <br/> 3.71:1 | Used for low priority text content not crucial for the user.                             |
| Image       | <small> PRIMARY ACTION <br/> $primary_action <br/> $active_dark</small>             | 6.49:1 <br/> 5.29:1 | Link text color to indicate interactivity.                                               |
| Image       | <small> SUCCESS SMALL <br/> $$text_lt_success_sm <br/> $$text_dk_success_sm</small> | 5.04:1 <br/> 9.11:1 | Used for regular or thin weight text under 16pt when a success state should be conveyed. |
| Image       | <small> ERROR <br/> $error <br/> $error_dark </small>                               | 5.26:1 <br/> 5.96:1 | Can be applied to any text size when an error state should be conveyed.                  |

#### Status Colors

Status colors quickly convey different states and messages that provide users with vital system feedback. These colors can be used to indicate the successful completion of a task, caution and warn when an error has occurred, or highlight informative notifications. Playbook offers six main status colors, complemented by five subtle status colors for backgrounds, creating a cohesive system that guides user interactions and ensures clear communication throughout the interface.

| Status Colors | Name & Token                                          | Contrast Ratio | Usage                                                                               |
| ------------- | ----------------------------------------------------- | :------------: | ----------------------------------------------------------------------------------- |
| Image         | <small> NEUTRAL <br/> $neutral </small>               |     1.16:1     | Used for inactive states or de-emphasizing.                                         |
| Image         | <small> SUCCESS <br/> $success </small>               |     3.36:1     | Indicates success of positive states.                                               |
| Image         | <small> WARNING <br/> $warning </small>               |     1.73:1     | Calls attention to the user without a particularly positive or negative connotation |
| Image         | <small> ERROR <br/> $error </small>                   |     5.26:1     | Brings immediate attention to the user, typically in a negative context.            |
| Image         | <small> INFO <br/> $info </small>                     |     2.12:1     | Indicates informative notifications or messages.                                    |
| Image         | <small> PRIMARY <br/> $primary </small>               |     6.49:1     | Highlights critical information using Playbook’s primary color.                     |
| Image         | <small> NEUTRAL SUBTLE <br/> $neutral_subtle </small> |     1.16:1     | A background color to go behind elements of neutral status.                         |
| Image         | <small> SUCCESS SUBTLE <br/> $success_subtle </small> |     3.36:1     | A background color to go behind elements of success status.                         |
| Image         | <small> WARNING SUBTLE <br/> $warning_subtle </small> |     1.73:1     | A background color to go behind elements of warning status.                         |
| Image         | <small> ERROR SUBTLE <br/> $error_subtle </small>     |     5.26:1     | A background color to go behind elements of error status.                           |
| Image         | <small> INFO SUBTLE <br/> $info_subtle </small>       |     2.12:1     | A background color to go behind elements of information status.                     |

#### Interface Layout Colors

Interface layout colors are used to define spatial boundaries, establish sections, and signal interactivity within a digital interface. Playbook’s interface colors were purposefully chosen to improve usability and create visual hierarchy.

Playbook’s primary blue color is used as a main or accent color to show active and interactive states. We use our $primary blue with a 5% opacity as a secondary active color, primarily as a background or highlight.

Playbook primarily uses either a light or white background color. They can be used to differentiate elements on the page, with white elements on a white or light background. Do not stack elements of the same color on top of each other, and ideally no background light elements taking majority space on a white background.

Our $border_lt border color is used as a way to delineate space such as in kits like our card as a border our Section Separator and Line separator for lists and Nav items. We also utilize our shadow color with our shadow props to help differentiate objects and create visual hierarchy.

| Interface Layout Colors | Name & Token                                                   |   Contrast Ratio    | Usage                                                                                                  |
| ----------------------- | -------------------------------------------------------------- | :-----------------: | ------------------------------------------------------------------------------------------------------ |
| Image                   | <small> PRIMARY <br/> $primary <br/> $active_dark </small>     | 6.49:1 <br/> 5.29:1 | Playbook’s primary color, used as a main or accent color to show active and interactive states.        |
| Image                   | <small> BACKGROUND <br/> $bg_light <br/> $bg_dark </small>     |  1.07:1 <br/> 1:1   | Used as a background for an entire page or sections.                                                   |
| Image                   | <small> CARD <br/> $card_light <br/> $card_dark </small>       |  1:1 <br/> 1.24:1   | Used as a background inside of a container to differentiate sections and help create visual hierarchy. |
| Image                   | <small> BORDER <br/> $border_light <br/> $border_dark </small> | 1.22:1 <br/> 1.74:1 | Used as an outline or line separator to delineate space.                                               |
| Image                   | <small> SHADOW <br/> $shadow <br/> $shadow_dark </small>       |  1.31:1 <br/> 1:1   | Shadow should be used as such, to create visual hierarchy, show interactivity and delineate space.     |
| Image                   | <small> SECONDARY <br/> $primary <br/> @ a 5% opacity </small> |       1.07:1        | Used as a background to show interactive states.                                                       |
| Image                   | <small> FOCUS INPUT <br/> $focus_input_light </small>          |       1.01:1        | Used as a background color or on hover to show active states                                           |

#### Data Visualization and Additional Palettes

In data visualization, color plays a crucial role in conveying insights clearly and effectively. Playbook offers a diverse color palette designed to enhance the clarity and impact of graphics, graphs, and diagrams. Each color was selected with intentionality to ensure high contrast for easy comprehension.

#### Data Colors

These eight tokens are Playbook’s core set of data viz colors. Designed to be used in sequence, these colors provide a go-to palette for representing data with clarity and consistency.

| Data Colors | Name & Token                                      | Usage                       |
| ----------- | ------------------------------------------------- | --------------------------- |
| Image       | <small> DATA 1-8 <br/> $data_1 - $data_8 </small> | Used for representing data. |

#### Product Colors

Playbook's offers a set of ten product tokens, useful for grouping reoccurring items with a consistent color assignment.
Each product color is accompanied by corresponding background and highlight token, providing flexibility in design implementation. Background tokens are ideal for accommodating text, while highlight tokens stand out independently, perfect for icons or emphasis within design elements.

| Product Colors | Name & Token                                                                                    | Usage                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Image          | <small> PRODUCT BACKGROUND 1 - 10 <br/> $product_1_background - $product_10_background </small> | Used as a background color and text color for a grouping of reoccurring items               |
| Image          | <small> PRODUCT HIGHLIGHT 1 - 10 <br/> $product_1_highlight - $product_10_highlight </small>    | Used as a highlight color perfect for icons or emphasis for a grouping of reoccurring items |

#### Category Colors

For more complex data visualizations or diverse design needs, Playbook offers 21 category tokens. These colors offer a wide spectrum of options designed to blend seamlessly with the rest of the palette. However, designers are advised to use them moderately, as excessive color can detract from the effectiveness of a design.

| Category Colors | Name & Token                                                      | Usage                                                                         |
| --------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Image           | <small> CATEGORY 1 - 21 <br/> $category_1 - $category_21 </small> | Used as a background color and text color for a grouping of reoccurring items |

## Color Accessibility Standards

Accessibility refers to the practice of designing digital products in a way that ensures they can be used and enjoyed by all individuals.
Playbook is designed with accessibility in mind to help provide an inclusive experience for everyone.

We try to prioritize color accessibility by referring to WCAG guidelines, particularly concerning color contrast ratios for Text.

WCAG guidelines are a set of international standards developed by the World Wide Web Consortium (W3C) to ensure web content is accessible. It provides criteria for various aspects of web accessibility, including color contrast.

The AA level WCAG guidelines for graphical objects and large text is a contrast ratio of at least 3:1 and 4.5:1 for normal text.

- Our text colors are chosen to meet these guidelines, with a contrast ratio of at least 4.5:1 for normal text.
- We try to ensure that text and graphical elements have sufficient contrast against their background to be easily distinguishable.

#### Exceptions and Recommendations

We acknowledge that certain design considerations have resulted in exceptions to WCAG standards.
For example, our "text_lt_lighter" color is an exception, recommended for subtle text that is not critical for content comprehension, such as redundant copy.

However, even in such cases, we aim to maintain readability and usability to the greatest extent possible. With this in mind we recommend checking the contrast ratio of color combinations when using color tokens not built into Playbook components.
