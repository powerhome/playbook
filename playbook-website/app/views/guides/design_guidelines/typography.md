---
title: Typography
description: Typography serves as the backbone of any design system. It’s not just page titles and copy, typography is everywhere, in navigation labels, buttons, captions, form fields and more. 
icon: text
---

For our Typography Tokens refer to [Typography](https://playbook.powerapp.cloud/tokens/typography) in [Tokens](https://playbook.powerapp.cloud/tokens)

#### Index

[Typography Usage & Best Practices](#Typography-Usage-amp-Best-Practices)
‣ [Typography Styles](#Typography-Styles)
‣ [Creating Visual Hierarchy with Typography](#Creating-Visual-Hierarchy-with-Typography)
‣ [Text Modifiers](#Text-Modifiers)
‣ [Typography Kits](#Typography-Kits)
‣ [Typography in Tables](#Typography-in-Tables)
[Typography Accessibility Standards](#Typography-Accessibility-Standards)

Typography serves as the backbone of any design system. It’s not just for page titles and copy; typography is everywhere, from navigation labels to buttons, captions, form fields, and more. It is essential for providing context, guiding users, and delivering the core content of an application.

Playbook’s typography plays a crucial role in shaping the user experience. As a design system primarily used for business software applications, we know that readability is vital for effortless navigation and easy comprehension. To achieve this Playbook uses a professional, unembellished san-serif front and prioritizes intuitive hierarchy in our typography styles. 

When swapping out the default Playbook font, we recommend using a simple sans-serif font such as Proxima Nova or Arial.


## Typography Usage & Best Practices

### Typography Styles

Playbook offers 13 different text styles within four different text components. Each component is built for a specific purpose that helps ensure consistency of usage. 

| Typography                                                     |  Usage                                                                                                     |
|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| <p class="pb_title_kit_size_1"> Title 1 </p>                   | Largest font size used for banners and covers on homepages. |
| <p class="pb_title_kit_size_1_thin"> Title 1 Light </p>        | Light alternative to default Title 1 |
| <p class="pb_title_kit_size_2"> Title 2 </p>                   | Secondary title size used for regular page titles |
| <p class="pb_title_kit_size_2_thin"> Title 2 Light </p>        | Less emphasis than Title 2, good for main callouts that are not the page’s title, ie. dashboard numbers. |
| <p class="pb_title_kit_size_3"> Title 3 </p>                   | An h3 title size |
| <p class="pb_title_kit_size_3_thin"> Title 3 Light </p>        | Light alternative to default Title 3 |
| <p class="pb_title_kit_size_4"> Title 4 </p>                   | Useful as a header 4 for subsection titles or emphasis in a table row |
| <p class="pb_caption_kit_lg_color_default mt_xxs"> Large Caption </p> | A larger caption style that can be used sparingly as a subsection title or large label. |
| <p class="pb_body_kit mt_xxs"> Body </p>                             | Default body text size, used for paragraphs and main text content. |
| <p class="pb_caption_kit_md_color_default mt_xxs"> Caption </p>      | Default caption styling, often used underneath a title for a singular phrase or sentence |
| <p class="pb_caption_kit_xs_color_default mt_xxs"> Subcaption </p>   | A smaller caption style for information not key to the page’s function |
| <p class="pb_detail_kit_color_default bold mt_xxs"> Detail Bold </p> | Used sparingly for emphasis on secondary information |
| <p class="pb_detail_kit_color_default mt_xxs"> Detail </p>           | Used for secondary information. Useful in information dense tables |

Some Playbook components such as our button and badge, use variations of our text styles with slightly different kerning or font sizes. Differentiating these components text styles give visual cues to the user that they are conveying different information. 

<img style="margin:auto; display: block;" src="https://github.com/powerhome/playbook/assets/48187916/6acfdc97-be32-47f6-b955-7c80c871414f" alt="Button Imagery">

### Creating Visual Hierarchy with Typography

Typography hierarchy plays a key role in guiding users through interfaces and ensuring important information is not overlooked. Using the following concepts, Playbook establishes a clear hierarchy to effectively guide the viewer's attention and create a seamless experience.


<div class="typography-guidelines">

<div class="typography-principle">

<div>
<p class="pb_caption_kit_md"> Weight </p>
<ul>
 <li> Bolder weights command attention and signify importance. </li>
 <li> Lighter weights are often employed for supporting content or lesser emphasis. </li>
</ul>
</div>
<img  src="https://github.com/powerhome/playbook/assets/48187916/a18ea880-ef8b-4feb-b662-47c06d0667e6" alt="Example of font weight usage">
</div>

<div class="typography-principle">

<div>
<p class="pb_caption_kit_md"> Case </p>
<ul>
<li> Uppercase text can convey formality and importance; it is used most commonly as labels and to designate sections.</li>
<li> Sentence case or lowercase text is generally easier to read and is suitable for longer passages. </li>
</ul>
</div>
<img src="https://github.com/powerhome/playbook/assets/48187916/62196a7c-2ddf-45e4-a6dd-825b8680b704" alt="Example of font case usage">
</div>

<div class="typography-principle">
<div>
<p class="pb_caption_kit_md"> Size </p>
<ul>
 <li> Larger font sizes denote importance and hierarchy. </li>
 <li> Smaller font sizes are typically used for secondary information or details. </li>
<ul>
</div>
<img src="https://github.com/powerhome/playbook/assets/48187916/24dcea48-4180-47fc-9cc4-65c81e252c6a" alt="Example of font size usage">
</div>

<div class="typography-principle">
<div>
<p class="pb_caption_kit_md"> Position </p>
<ul>
<li> Text positioned prominently at the top or center tends to grab attention and signal importance.
</li>
<li>
Secondary information may be placed off to the side or at the bottom for less emphasis.
</li>
</ul>
</div>
<img src="https://github.com/powerhome/playbook/assets/48187916/e004f99e-4ad1-4ba2-8065-09f5b9f50773" alt="Example of font position">
</div>


<div class="typography-principle">
<div>
<p class="pb_caption_kit_md"> Alignment </p>
<ul>
 <li> Centered or justified alignment can impart a formal or structured appearance. </li>
 <li> Left-aligned text is often easier to read and lends a more casual or contemporary feel. </li>
</ul>
</div>
<img src="https://github.com/powerhome/playbook/assets/48187916/d2c95e5e-5350-411f-b179-85859729425f" alt="Example of font alignment">
</div>

<p>
<small style="text-align: center; display: block">
Example UI Using Clear Text Hierarchy
</small>
<img style="margin:0px;" src="https://github.com/powerhome/playbook/assets/48187916/eab5e8fd-7434-4e92-81d8-553d42867618" alt="Example UI Layout">
</p>

</div>


Incorporating these concepts into our typography components and styles ensures effective communication of content hierarchy and enhances overall usability.

### Text Modifiers

Outside of the given typography styles above, there are many other ways to create different styles. These can involve adding a different style tag, adjusting font weights, and adding tabular number spacing.

##### Text Styles

While the Body kit supports using style tags within the kit, these tags can be used anywhere for custom cases.

| Style                           | Tag              |  Definition                                             |
|---------------------------------|------------------|---------------------------------------------------------|
| <b> Bold </b>                   | ```<b>```        |  Bolds text |
| <strong> Strong </strong>       | ```<strong>```   |  Bolds text |
| <a> Link </a>                   | ```<a>```        |  Changes to primary color to indicate text is clickable |
| <i> Italicized </i>             | ```<i>```        |  Italicizes text |
| <em> Emphasized </em>           | ```<em>```       |  Emphasis used on titles |
| <small> Small </small>          | ```<small>```    |  Reduces font size |
| <u> Underlined </u>             | ```<u>```        |  Underlines text |

##### Font Weights

Using font weights is crucial for typography and hierarchy because they play a significant role in establishing visual contrast and organizing information effectively. Playbook offers seven different font weights for various uses.

| Font Weight                      | Usage                                                                   |
|----------------------------------|--------------------------------------------------------------------------|
| <p class="pb_body_kit mt_xxs typography-weight-100"> Font Thin </p>  | Good as a light option for titles with lower hierarchy |
| <p class="pb_body_kit mt_xxs"> Font Regular </p>                     | Used for common body text content and general usage |
| <p class="pb_body_kit mt_xxs typography-weight-600"> Font Bold </p>  | Default bold value used for general emphasis, pairs well with a smaller font size to act as a caption |

##### Tabular Number Spacing
<div class="typography-principle">
<p>
Tabular number spacing, also known as monospacing, is a typographic feature where each digit occupies the same amount of horizontal space. This uniform spacing ensures that numbers align properly in columns, making it a particularly powerful format in data tables.
<br/>
<br/>
Ensuring readable numbers is so crucial for business operations that Playbook offers tabular number spacing as a global prop within the library. It’s recommended on any numeric values for display on any typographic style.
</p>
<img src="https://github.com/powerhome/playbook/assets/48187916/ec72abe4-02b7-4a41-a2fe-60c13f7762c0" width="325px" alt="Tabular Number Spacing">
</div>

### Typography Kits

Playbook offers a range of ready-to-use typography layouts that prioritize displaying clear and concise information.   
Designed to make the best use of the library’s typography options, layouts offered can be used for date and time formats, contact details, addresses, and label/value groupings. 
Through strategic use of color, font size, and font weight, Playbook establishes strong informational and visual hierarchies, ensuring effective communication and enhanced readability.

<img src="https://github.com/powerhome/playbook/assets/48187916/550ddd79-932f-4245-82c1-09b02de35345" alt="Tabular Number Spacing">

### Typography in Tables

When working with complex tables, the UI is susceptible to becoming information-dense and harder to read. Use the following best practices to create clear, readable tables.

<div class="typography-list">
<ul>
<li> Keep your typography choices simple. Avoid overwhelming the design with excessive options.  </li>
<li> Maintain consistency in column headers and body content throughout to ensure coherence.  </li>
<li> Avoid overly large titles or font sizes; instead, rely more on font weight and color variations to establish visual hierarchy effectively.  </li>
<li> If your content is data heavy, consider utilizing the Detail kit over the Body kit.  </li>
<li> For multi-line cells, make use of styles to create readability. </li>
<ul>
     <li> Emphasize primary content using Title 4 or heavier font weights for better clarity and emphasis. </li>
     <li> Use subcaption, detail or other light weight, smaller font sizes for sub-copy or details. </li>
</ul>
</ul>

</div>

<img style="margin:auto; display: block;" src="https://github.com/powerhome/playbook/assets/48187916/4dbcaace-0ce9-43b2-b6f8-9534f278d2b7" width="750" alt="Example table UI">

## Typography Accessibility Standards

#### Color Accessibility Standards

Accessibility in typography is critical to ensuring inclusivity in usability, as text is such an integral part of any interface. 
There is no perfect font for accessibility, so it is important to follow best practices. 
Prioritizing the following within Playbook helps our design system be more accessible.

<div class="typography-list">
<ul>
<li> Ensure individual letterforms are distinct in shape to avoid confusion between characters like I, l, and 1, or 0 and O. </li>
<li> Kerning and line height should be appropriate, too little or too much space will reduce readability. </li>
<li> Sans-serif fonts are preferred for their simplicity and clarity, particularly on screens or at smaller sizes. </li>
<li> Bolder weights can improve legibility, but excessive thickness may hinder readability, especially for longer passages. Avoid very light or bold font weights for text under 16px. </li>
<li> Larger font sizes aid readability, particularly for users with visual impairments or on smaller screens. Important content should be displayed with a font size of 16px or larger. </li>
<li> Ensure paragraphs and larger text blocks are scannable, with text blocks containing 45-80 characters. </li>
<li> Consider WCAG guidelines when implementing color in typography. Text size 16px and below requires 4.5:1 color contrast between text and background, and 3:1 for 16px bold or larger text. </li>
</ul>
</div>
Incorporate these typography best practices to optimize readability and comprehension, ensuring that UI remains clear and accessible. 

For more information on accessibility in typography review these resources. 
https://accessibility.digital.gov/visual-design/typography/
https://designsystem.digital.gov/components/typography/
https://webaim.org/standards/wcag/checklist
