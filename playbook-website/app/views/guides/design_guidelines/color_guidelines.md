# Color Guidelines

For all our Color Tokens refer to [Colors](https://playbook.powerapp.cloud/visual_guidelines/colors) in [Tokens & Guidelines](https://playbook.powerapp.cloud/visual_guidelines)

#### Index
Color Palette & Usage: Best Practices
1. Text Colors
   * Status Colors
   * Interface Colors
   * Data Visualization Colors
2. Color Accessibility Standards

As a design system primarily used for business software applications, we use color to enhance user comprehension, not as ornament. 

Our design system components use neutrals and muted tones with pops of our primary blue to create a clear hierarchy.

Other colors within our design system are used sparingly and intentionally to communicate system feedback.

These decisions creates a balanced UI that fosters user understanding without unnecessary distractions.

![Color Guideline Image](https://github.com/powerhome/playbook/assets/89551222/e1cc85e8-2582-4662-a71d-f63867cc02e1) 

---

## Color Palette & Usage: Best Practices

#### Text Colors

Playbook’s three main text colors are utilized for general content such as labels, microcopy, body text and titles, providing clarity and readability for essential information. 
Link text color serves to highlight interactive elements, guiding users to clickable areas and enhancing the navigational experience. 
Error and success colors are employed to communicate feedback on actions, with error colors signaling issues and success colors indicating successful completion. 

By applying these text colors, designers can create intuitive interfaces that effectively guide users and convey important messages. These colors help keep UI consistent and make it easy to maintain a cohesive and user-friendly experience.

| Text Colors | Name & Token | Contrast Ratio|  Usage |
|----------|-------------| :----:|------|
| Image | DEFAULT <br/> $text_lt_default <br/> $text_dk_default | 14:1 <br/> 19.73:1 | Primary text color for all general use cases |

#### Status Colors

Status colors quickly convey different states and messages that provide users with vital system feedback. These colors can be used to indicate the successful completion of a task, caution and warn when an error has occurred, or highlight informative notifications. Playbook offers six main status colors, complemented by five subtle status colors for backgrounds, creating a cohesive system that guides user interactions and ensures clear communication throughout the interface.

| Text Colors | Name & Token | Contrast Ratio|  Usage |
|----------|-------------| :----:|------|
| Image | DEFAULT <br/> $text_lt_default <br/> $text_dk_default | 14:1 <br/> 19.73:1 | Primary text color for all general use cases |

#### Interface Layout Colors

Interface layout colors are used to define spatial boundaries, establish sections, and signal interactivity within a digital interface. Playbook’s interface colors were purposefully chosen to improve usability and create visual hierarchy.

Playbook’s primary blue color is used as a main or accent color to show active and interactive states. We use our $primary blue with a 5% opacity as a secondary active color, primarily as a background or highlight.

Playbook primarily uses either a light or white background color. They can be used to differentiate elements on the page, with white elements on a white or light background. Do not stack elements of the same color on top of each other, and ideally no background light elements taking majority space on a white background.

Our $border_lt border color is used as a way to delineate space such as in kits like our card as a border our Section Separator and Line separator for lists and Nav items. We also utilize our shadow color with our shadow props to help differentiate objects and create visual hierarchy.

| Text Colors | Name & Token | Contrast Ratio|  Usage |
|----------|-------------| :----:|------|
| Image | DEFAULT <br/> $text_lt_default <br/> $text_dk_default | 14:1 <br/> 19.73:1 | Primary text color for all general use cases |

#### Data Visualization and Additional Palettes

In data visualization, color plays a crucial role in conveying insights clearly and effectively. Playbook offers a diverse color palette designed to enhance the clarity and impact of graphics, graphs, and diagrams. Each color was selected with intentionality to ensure high contrast for easy comprehension.

#### Data Colors

These eight tokens are Playbook’s core set of data viz colors. Designed to be used in sequence, these colors provide a go-to palette for representing data with clarity and consistency. 

| Text Colors | Name & Token | Usage |
|----------|-------------|------|
| Image | DEFAULT <br/> $text_lt_default <br/> $text_dk_default | Primary text color for all general use cases |

#### Product Colors

Playbook's offers a set of ten product tokens, useful for grouping reoccurring items with a consistent color assignment. 
Each product color is accompanied by corresponding background and highlight token, providing flexibility in design implementation. Background tokens are ideal for accommodating text, while highlight tokens stand out independently, perfect for icons or emphasis within design elements.

| Text Colors | Name & Token | Usage |
|----------|-------------|------|
| Image | DEFAULT <br/> $text_lt_default <br/> $text_dk_default | Primary text color for all general use cases |

#### Category Colors

For more complex data visualizations or diverse design needs, Playbook offers 21 category tokens. These colors offer a wide spectrum of options designed to blend seamlessly with the rest of the palette. However, designers are advised to use them moderately, as excessive color can detract from the effectiveness of a design.

| Text Colors | Name & Token | Usage |
|----------|-------------|------|
| Image | DEFAULT <br/> $text_lt_default <br/> $text_dk_default | Primary text color for all general use cases |

## Color Accessibility Standards

Accessibility refers to the practice of designing digital products in a way that ensures they can be used and enjoyed by all individuals.
Playbook is designed with accessibility in mind to help provide an inclusive experience for everyone. 

We try to prioritize color accessibility by referring to WCAG guidelines, particularly concerning color contrast ratios for Text. 

WCAG guidelines are a set of international standards developed by the World Wide Web Consortium (W3C) to ensure web content is accessible. It provides criteria for various aspects of web accessibility, including color contrast.

The AA level WCAG guidelines for graphical objects and large text is a contrast ratio of at least 3:1 and  4.5:1 for normal text. 

Our text colors are chosen to meet these guidelines, with a contrast ratio of at least 4.5:1 for normal text.
We try to ensure that text and graphical elements have sufficient contrast against their background to be easily distinguishable.

#### Exceptions and Recommendations

We acknowledge that certain design considerations have resulted in exceptions to WCAG standards. 
For example, our "text_lt_lighter" color is an exception, recommended for subtle text that is not critical for content comprehension, such as redundant copy. 

However, even in such cases, we aim to maintain readability and usability to the greatest extent possible. With this in mind we recommend checking the contrast ratio of color combinations when using color tokens not built into Playbook components.
