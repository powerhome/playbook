---
title: Typography Guidelines
description: Typography serves as the backbone of any design system. It’s not just page titles and copy, typography is everywhere, in navigation labels, buttons, captions, form fields and more. 
icon: font-case
---

For our Typography Tokens refer to [Typography]https://playbook.powerapp.cloud/visual_guidelines/typography in [Tokens & Guidelines](https://playbook.powerapp.cloud/visual_guidelines)

#### Index

[Typography Usage & Best Practices](#Typography-Usage-amp-Best-Practices)
‣ [Typography Styles](#Typography-Styles)
‣ [Creating Visual Hierarchy with Typography](#Creating-Visual-Hierarchy-with-Typography)
‣ [Text Modifiers](#Text-Modifiers)
‣ [Typography Kits](#Typography-Kits)
‣ [Typography in Tables](#Typography-in-Tables)
[Typography Accessibility Standards](#Typography-Accessibility-Standards)

<br/>


Typography serves as the backbone of any design system. It’s not just page titles and copy, typography is everywhere, in navigation labels, buttons, captions, form fields and more. It is essential for providing context, guiding users and delivering the core content of an application.

Playbook’s typography plays a crucial role in shaping the user experience. As a design system primarily used for business software applications, we know that readability is vital for effortless navigation and easy comprehension. To achieve this Playbook uses a professional, unembellished san-serif front and prioritizes intuitive hierarchy in our typography styles. 

When swapping out the default Playbook font, we recommend using a simple sans-serif font such as Proxima Nova or Ariel.


## Typography Usage & Best Practices

#### Typography Styles

Playbook offers 13 different text styles within four different text components. Each component is built for a specific purpose that helps ensure consistency of usage. 

| Typography                           |  Usage                                                                                                     |
|--------------------------------------|------------------------------------------------------------------------------------------------------------|
| Title 1                              |  <small> Largest font size used for banners and covers on homepages. </small> |
| Title 1 Light                        |  <small> Light alternative to default Title 1 </small> |
| Title 2                              |  <small> Secondary title size used for regular page titles </small> |
| Title 2 Light                        |  <small> Less emphasis than Title 2, good for main callouts that are not the page’s title, ie. dashboard numbers. </small> |
| Title 3                              |  <small> An h3 title size </small> |
| Title 3 Light                        |  <small> Light alternative to default Title 3 </small> |
| Title 4                              |  <small> Useful as a header 4 for subsection titles or emphasis in a table row </small> |
| Large Caption                        |  <small> A larger caption style that can be used sparingly as a subsection title or large label. </small> |
| Body                                 |  <small> Default body text size, used for paragraphs and main text content. </small> |
| Caption                              |  <small> Default caption styling, often used underneath a title for a singular phrase or sentence </small> |
| Subcaption                           |  <small> A smaller caption style for information not key to the page’s function </small> |
| Detail Bold                          |  <small> Used sparingly for emphasis on secondary information </small> |
| Detail                               |  <small> Used for secondary information. Useful in information dense tables </small> |

Some Playbook components such as our button and badge, use variations of our text styles with slightly different kerning or font sizes. Differentiating these components text styles give visual cues to the user that they are conveying different information. 

<img src="https://github.com/powerhome/playbook/assets/48187916/6acfdc97-be32-47f6-b955-7c80c871414f" alt="Button Imagery">

#### Creating Visual Hierarchy with Typography

Typography hierarchy plays a key role in guiding users through interfaces and ensuring important information is not overlooked. Using the following concepts, Playbook establishes a clear hierarchy to effectively guide the viewer's attention and create a seamless experience.

<div class="typography-principle">
<div>
<h4>
Weight
</h4>
 * Bolder weights command attention and signify importance.
 * Lighter weights are often employed for supporting content or lesser emphasis.
</div>
<img src="https://github.com/powerhome/playbook/assets/48187916/a18ea880-ef8b-4feb-b662-47c06d0667e6" width="338" alt="Example of font weight usage">
</div>

<div class="typography-principle">
<div>
  <h4>
  Case
</h4>
 * Uppercase text can convey formality and importance; it is used most commonly as labels and to designate sections.
 * Sentence case or lowercase text is generally easier to read and is suitable for longer passages.
</div>
<img src="https://github.com/powerhome/playbook/assets/48187916/62196a7c-2ddf-45e4-a6dd-825b8680b704" width="338" alt="Example of font case usage">
</div>

<div class="typography-principle">
<div>
  <h4>
  Size
</h4>
 * Larger font sizes denote importance and hierarchy.
 * Smaller font sizes are typically used for secondary information or details.
</div>
<img src="https://github.com/powerhome/playbook/assets/48187916/24dcea48-4180-47fc-9cc4-65c81e252c6a" width="338" alt="Example of font size usage">
</div>

<div class="typography-principle">
<div>
  <h4>
  Position
</h4>
 * Text positioned prominently at the top or center tends to grab attention and signal importance.
 * Secondary information may be placed off to the side or at the bottom for less emphasis.
</div>
<img src="https://github.com/powerhome/playbook/assets/48187916/e004f99e-4ad1-4ba2-8065-09f5b9f50773" width="338" alt="Example of font position">
</div>


<div class="typography-principle">
<div>
  <h4>
  Alignment
</h4>
 * Centered or justified alignment can impart a formal or structured appearance.
 * Left-aligned text is often easier to read and lends a more casual or contemporary feel.
</div>
<img src="https://github.com/powerhome/playbook/assets/48187916/d2c95e5e-5350-411f-b179-85859729425f" width="338" alt="Example of font alignment">
</div>


<small>
Example UI Using Clear Text Hierarchy
</small>
<img src="https://github.com/powerhome/playbook/assets/48187916/eab5e8fd-7434-4e92-81d8-553d42867618" width="850" alt="Example UI Layout">

Incorporating these concepts into our typography components and styles ensures effective communication of content hierarchy and enhances overall usability.

#### Text Modifiers

Outside of the given typography styles above, there are many other ways to create different styles. These can involve adding a different style tag, adjusting font weights, and adding tabular number spacing.

##### Text Styles

While the Body kit supports using style tags within the kit, these tags can be used anywhere for custom cases.

| Style                           | Tag                                  |  Definition                                                              |
|---------------------------------|--------------------------------------|--------------------------------------------------------------------------|
| <b> Bold </b>                   | <small>```<b>``` </small>            |  <small> Bolds text </small> |
| <strong> Strong </strong>       | <small>```<strong>``` </small>       |  <small> Bolds text </small> |
| <a> Link </a>                   | <small>```<a>``` </small>            |  <small> Changes to primary color to indicate text is clickable </small> |
| <i> Italicized </i>             | <small>```<i>``` </small>            |  <small> Italicizes text </small> |
| <em> Emphasized </em>           | <small>```<em>``` </small>           |  <small> Emphasis used on titles </small> |
| <small> Small </small>          | <small>```<small>``` </small>        |  <small> Reduces font size </small> |
| <u> Underlined </u>             | <small>```<u>``` </small>            |  <small> Underlines text </small> |

##### Font Weights

Using font weights is crucial for typography and hierarchy because they play a significant role in establishing visual contrast and organizing information effectively. Playbook offers seven different font weights for various uses.

| Font Weight                      | Usage                                                                   |
|----------------------------------|--------------------------------------------------------------------------|
| Font Light                       |  <small> Good as a light option for titles with lower hierarchy </small> |
| Font Regular                     |  <small> Used for common body text content and general usage </small> |
| Font Bold                        |  <small> Default bold value used for general emphasis, pairs well with a smaller font size to act as a caption  </small> |

#### Tabular Number Spacing
<div class="color-guidelines">
<p>
Tabular number spacing, also known as monospacing, is a typographic feature where each digit occupies the same amount of horizontal space. This uniform spacing ensures that numbers align properly in columns, making it a particularly powerful format in data tables.
<br/>
<br/>
Ensuring readable numbers is so crucial for business operations that Playbook offers tabular number spacing as a global prop within the library. It’s recommended on any numeric values for display on any typographic style.
</p>
<img src="https://github.com/powerhome/playbook/assets/48187916/ec72abe4-02b7-4a41-a2fe-60c13f7762c0" width="325" alt="Tabular Number Spacing">
</div>

#### Typography Kits

Playbook offers a range of ready-to-use typography layouts that prioritize displaying clear and concise information.   
Designed to make the best use of the library’s typography options, layouts offered can be used for date and time formats, contact details, addresses, and label/value groupings. 
Through strategic use of color, font size, and font weight, Playbook establishes strong informational and visual hierarchies, ensuring effective communication and enhanced readability.

<img src="https://github.com/powerhome/playbook/assets/48187916/550ddd79-932f-4245-82c1-09b02de35345" alt="Tabular Number Spacing">

#### Typography in Tables

When working with complex tables, the UI is susceptible to becoming information dense and harder to read. Use the following best practices to create clear, readable tables.

1. Keep your typography choices simple. Avoid overwhelming the design with excessive options. 
2. Maintain consistency in column headers and body content throughout to ensure coherence. 
3. Avoid overly large titles or font sizes; instead, rely more on font weight and color variations to establish visual hierarchy effectively. 
4. If your content is data heavy, consider utilizing the Detail kit over the Body kit. 
5. For multi-line cells, make use of styles to create readability. 
     1.  Emphasize primary content using Title 4 or heavier font weights for better clarity and emphasis.
     2.  Use subcaption, detail or other light weight, smaller font sizes for sub-copy or details.

<img src="https://github.com/powerhome/playbook/assets/48187916/4dbcaace-0ce9-43b2-b6f8-9534f278d2b7" width="750" alt="Example table UI">

## Typography Accessibility Standards

#### Color Accessibility Standards

Accessibility in typography is critical to ensuring inclusivity in usability, as text is such atn integral part of any interface. 
There is no perfect font for accessibility, so it is important to follow best practices. 
Prioritizing the following within Playbook helps our design system be more accessible.

1. Ensure individual letterforms are distinct in shape to avoid confusion between characters like I, l, and 1, or 0 and O.
2. Kerning and line height should be appropriate, too little or too much space will reduce readability.
3. Sans-serif fonts are preferred for their simplicity and clarity, particularly on screens or at smaller sizes.
4. Bolder weights can improve legibility, but excessive thickness may hinder readability, especially for longer passages. Avoid very light or bold font weights for text under 16px.
5. Larger font sizes aid readability, particularly for users with visual impairments or on smaller screens. Important content should be displayed with a font size of 16px or larger.
6. Ensure paragraphs and larger text blocks are scannable, with text blocks containing 45-80 characters.
7. Consider WCAG guidelines when implementing color in typography. Text size 16px and below requires 4.5:1 color contrast between text and background, and 3:1 for 16px bold or larger text.

Incorporate these typography best practices to optimize readability and comprehension, ensuring that UI remains clear and accessible. 

For more information on accessibility in typography review these resources. 
<br/>
[https://accessibility.digital.gov/visual-design/typography/](https://accessibility.digital.gov/visual-design/typography/)
<br/>
[https://designsystem.digital.gov/components/typography/](https://designsystem.digital.gov/components/typography/)
<br/>
https://webaim.org/standards/wcag/checklist

