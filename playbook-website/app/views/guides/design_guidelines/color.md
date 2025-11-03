---
title: Color
description: As a design system primarily used for business software applications, we use color to enhance user comprehension, not as ornament.
icon: palette
---

For all our Color Tokens refer to [Colors](https://playbook.powerapp.cloud/tokens/colors) in [Tokens](https://playbook.powerapp.cloud/tokens)

#### Index

[Color Palette & Usage: Best Practices](#Color-Palette-amp-Usage-Best-Practices)
‣ [Text Colors](#Text-Colors)
‣ [Status Colors](#Status-Colors)
‣ [Interface Colors](#Interface-Layout-Colors)
‣ [Data Visualization Colors](#Data-Visualization-and-Additional-Palettes)
[Color Accessibility Standards](#Color-Accessibility-Standards)

<br/>

<div class="color-guidelines">
<p>
As a design system primarily used for business software applications, we use color to enhance user comprehension, not as ornament.
<br/>
<br/>
Our design system components use neutrals and muted tones with pops of our primary blue to create a sclear hierarchy.
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

| Text Colors                                                                                                 |     | Name & Token                                                                      | Contrast Ratio      | Usage                                                                                    |
| ----------------------------------------------------------------------------------------------------------- | --- | --------------------------------------------------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------- |
| ![text default](https://github.com/powerhome/playbook/assets/89551222/98823fdc-96d8-4359-bf6d-37f83e17d010) |     | <small> DEFAULT <br/> $text_lt_default <br/> $text_dk_default</small>             | 14:1 <br/> 19.73:1  | Primary text color for all general use cases.                                            |
| ![text light](https://github.com/powerhome/playbook/assets/89551222/9cfc38ac-e9a0-49ff-8974-39f6997241b8)   |     | <small> LIGHT <br/> $text_lt_light <br/> $text_dk_light</small>                   | 4.54:1 <br/> 7.23:1 | Best for captions, secondary text and labels.                                            |
| ![text lighter](https://github.com/powerhome/playbook/assets/89551222/c41a3e62-2bdc-49eb-8336-1bf3c9b8d7fb) |     | <small> LIGHTER <br/> $text_lt_lighter <br/> $text_dk_lighter</small>             | 1.16:1 <br/> 3.71:1 | Used for low priority text content not crucial for the user.                             |
| ![text link](https://github.com/powerhome/playbook/assets/89551222/342eb35d-9e53-4d84-8ffc-245bac270378)    |     | <small> PRIMARY ACTION <br/> $primary_action <br/> $active_dark</small>           | 6.49:1 <br/> 5.29:1 | Link text color to indicate interactivity.                                               |
| ![text success](https://github.com/powerhome/playbook/assets/89551222/c4856675-f22c-47cf-9cba-3bc1570aff1e) |     | <small> SUCCESS SMALL <br/> $text_lt_success_sm <br/> $text_dk_success_sm</small> | 5.04:1 <br/> 9.11:1 | Used for regular or thin weight text under 16pt when a success state should be conveyed. |
| ![text error](https://github.com/powerhome/playbook/assets/89551222/64fae88e-92a5-44ad-aaa6-515b0a340781)   |     | <small> ERROR <br/> $error <br/> $error_dark </small>                             | 5.26:1 <br/> 5.96:1 | Can be applied to any text size when an error state should be conveyed.                  |

#### Status Colors

Status colors quickly convey different states and messages that provide users with vital system feedback. These colors can be used to indicate the successful completion of a task, caution and warn when an error has occurred, or highlight informative notifications. Playbook offers six main status colors, complemented by five subtle status colors for backgrounds, creating a cohesive system that guides user interactions and ensures clear communication throughout the interface.

| Status Colors                                                                                                        | Name & Token                                          | Contrast Ratio | Usage                                                                               |
| -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | :------------: | ----------------------------------------------------------------------------------- |
| ![status neutral](https://github.com/powerhome/playbook/assets/89551222/2ca2d5b1-f959-4cc8-b33e-cf23d62d2245)        | <small> NEUTRAL <br/> $neutral </small>               |     1.16:1     | Used for inactive states or de-emphasizing.                                         |
| ![status success](https://github.com/powerhome/playbook/assets/89551222/b9460ada-534c-4c22-bb05-ce9209db4b67)        | <small> SUCCESS <br/> $success </small>               |     3.36:1     | Indicates success of positive states.                                               |
| ![status warning](https://github.com/powerhome/playbook/assets/89551222/b0da050f-bddf-4f66-b5d2-f66aa94e410c)        | <small> WARNING <br/> $warning </small>               |     1.73:1     | Calls attention to the user without a particularly positive or negative connotation |
| ![status error](https://github.com/powerhome/playbook/assets/89551222/6e835fca-5356-4110-bfaa-f5ef902d425a)          | <small> ERROR <br/> $error </small>                   |     5.26:1     | Brings immediate attention to the user, typically in a negative context.            |
| ![status info](https://github.com/powerhome/playbook/assets/89551222/abcb2c7c-ac4d-4750-b6d3-93b6d0f5c8a6)           | <small> INFO <br/> $info </small>                     |     2.12:1     | Indicates informative notifications or messages.                                    |
| ![status primary](https://github.com/powerhome/playbook/assets/89551222/930b063e-f8f9-4683-aa38-8cbf7c7f45b6)        | <small> PRIMARY <br/> $primary </small>               |     6.49:1     | Highlights critical information using Playbook’s primary color.                     |
| ![status neutral subtle](https://github.com/powerhome/playbook/assets/89551222/4835d501-4f08-4b89-8eff-5d89faaf2caf) | <small> NEUTRAL SUBTLE <br/> $neutral_subtle </small> |     1.16:1     | A background color to go behind elements of neutral status.                         |
| ![status success subtle](https://github.com/powerhome/playbook/assets/89551222/c50baca4-d68a-485a-a2e5-2fca4a30a140) | <small> SUCCESS SUBTLE <br/> $success_subtle </small> |     3.36:1     | A background color to go behind elements of success status.                         |
| ![status warning subtle](https://github.com/powerhome/playbook/assets/89551222/2834f7d4-23ae-467c-ba64-cc89749598e9) | <small> WARNING SUBTLE <br/> $warning_subtle </small> |     1.73:1     | A background color to go behind elements of warning status.                         |
| ![status error subtle](https://github.com/powerhome/playbook/assets/89551222/e3092044-43cf-4766-a5d5-5b475a76d170)   | <small> ERROR SUBTLE <br/> $error_subtle </small>     |     5.26:1     | A background color to go behind elements of error status.                           |
| ![status info subtle](https://github.com/powerhome/playbook/assets/89551222/87bbfe96-062a-4e0c-a386-fb1fc82c9eb9)    | <small> INFO SUBTLE <br/> $info_subtle </small>       |     2.12:1     | A background color to go behind elements of information status.                     |

#### Interface Layout Colors

Interface layout colors are used to define spatial boundaries, establish sections, and signal interactivity within a digital interface. Playbook’s interface colors were purposefully chosen to improve usability and create visual hierarchy.

Playbook’s primary blue color is used as a main or accent color to show active and interactive states. We use our $primary blue with a 5% opacity as a secondary active color, primarily as a background or highlight.

Playbook primarily uses either a light or white background color. They can be used to differentiate elements on the page, with white elements on a white or light background. Do not stack elements of the same color on top of each other, and ideally no background light elements taking majority space on a white background.

Our $border_lt border color is used as a way to delineate space such as in kits like our card as a border our Section Separator and Line separator for lists and Nav items. We also utilize our shadow color with our shadow props to help differentiate objects and create visual hierarchy.

| Interface Layout Colors                                                                                              | Name & Token                                                   |   Contrast Ratio    | Usage                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | :-----------------: | ------------------------------------------------------------------------------------------------------ |
| ![Interface Primary](https://github.com/powerhome/playbook/assets/89551222/a7bb3262-8b75-489c-942e-74e7c8969501)     | <small> PRIMARY <br/> $primary <br/> $active_dark </small>     | 6.49:1 <br/> 5.29:1 | Playbook’s primary color, used as a main or accent color to show active and interactive states.        |
| ![Interface card](https://github.com/powerhome/playbook/assets/89551222/da3544e5-e3a8-483a-b31c-089ac5e75b67)        | <small> BACKGROUND <br/> $bg_light <br/> $bg_dark </small>     |  1.07:1 <br/> 1:1   | Used as a background for an entire page or sections.                                                   |
| ![Interface border](https://github.com/powerhome/playbook/assets/89551222/12eae32a-386f-422b-a9b6-fe3665f325e5)      | <small> CARD <br/> $card_light <br/> $card_dark </small>       |  1:1 <br/> 1.24:1   | Used as a background inside of a container to differentiate sections and help create visual hierarchy. |
| ![Interface background](https://github.com/powerhome/playbook/assets/89551222/d4951749-801b-4756-91c8-7862f07db8d5)  | <small> BORDER <br/> $border_light <br/> $border_dark </small> | 1.22:1 <br/> 1.74:1 | Used as an outline or line separator to delineate space.                                               |
| ![Interface shadow](https://github.com/powerhome/playbook/assets/89551222/b9b712d4-7178-4990-9f07-5a74a80f7971)      | <small> SHADOW <br/> $shadow <br/> $shadow_dark </small>       |  1.31:1 <br/> 1:1   | Shadow should be used as such, to create visual hierarchy, show interactivity and delineate space.     |
| ![Interface secondary](https://github.com/powerhome/playbook/assets/89551222/2d06f413-2e6e-4029-80be-5ce68577bae8)   | <small> SECONDARY <br/> $primary <br/> @ a 5% opacity </small> |       1.07:1        | Used as a background to show interactive states.                                                       |
| ![Interface focus input](https://github.com/powerhome/playbook/assets/89551222/c666ee85-6c40-438a-8982-4a2eba7a8387) | <small> FOCUS INPUT <br/> $focus_input_light </small>          |       1.01:1        | Used as a background color or on hover to show active states                                           |

#### Data Visualization and Additional Palettes

In data visualization, color plays a crucial role in conveying insights clearly and effectively. Playbook offers a diverse color palette designed to enhance the clarity and impact of graphics, graphs, and diagrams. Each color was selected with intentionality to ensure high contrast for easy comprehension.

#### Data Colors

These eight tokens are Playbook’s core set of data visualization colors. Designed to be used in sequence, these colors provide a go-to palette for representing data with clarity and consistency.

| Data Colors                                                                                                | Name & Token                                      | Usage                       |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------------------------- |
| ![Data colors](https://github.com/powerhome/playbook/assets/89551222/bffda6f9-cffe-42d4-9925-3bcb66cfbc20) | <small> DATA 1-8 <br/> $data_1 - $data_8 </small> | Used for representing data. |

#### Product Colors

Playbook's offers a set of ten product tokens, useful for grouping reoccurring items with a consistent color assignment.
Each product color is accompanied by corresponding background and highlight token, providing flexibility in design implementation. Background tokens are ideal for accommodating text, while highlight tokens stand out independently, perfect for icons or emphasis within design elements.

| Product Colors                                                                                                    | Name & Token                                                                                    | Usage                                                                                       |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ![Product Background](https://github.com/powerhome/playbook/assets/89551222/9729ae41-c614-4436-a79d-c2962e804bde) | <small> PRODUCT BACKGROUND 1 - 10 <br/> $product_1_background - $product_10_background </small> | Used as a background color and text color for a grouping of reoccurring items               |
| ![Product Highlight](https://github.com/powerhome/playbook/assets/89551222/43b5012c-c27d-4587-9e72-5fff35785c82)  | <small> PRODUCT HIGHLIGHT 1 - 10 <br/> $product_1_highlight - $product_10_highlight </small>    | Used as a highlight color perfect for icons or emphasis for a grouping of reoccurring items |

#### Category Colors

For more complex data visualizations or diverse design needs, Playbook offers 21 category tokens. These colors offer a wide spectrum of options designed to blend seamlessly with the rest of the palette. However, designers are advised to use them moderately, as excessive color can detract from the effectiveness of a design.

| Category Colors                                                                                                | Name & Token                                                      | Usage                                                                         |
| -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| ![Category colors](https://github.com/powerhome/playbook/assets/89551222/52804810-8f1b-43ec-bf4b-b82ad4c6a548) | <small> CATEGORY 1 - 21 <br/> $category_1 - $category_21 </small> | Used as a background color and text color for a grouping of reoccurring items |

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
