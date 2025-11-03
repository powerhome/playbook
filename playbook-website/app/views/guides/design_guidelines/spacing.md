---
title: Spacing
description: Playbook uses spacing tokens for consistency, simplifying design and enabling clear, functional layouts.
icon: distribute-spacing-horizontal
---

For our Spacing Tokens refer to [Padding](https://playbook.powerapp.cloud/tokens/padding) or [Margin](https://playbook.powerapp.cloud/tokens/margin) in our [Tokens Page](https://playbook.powerapp.cloud/tokens)

#### Index

[8px Baseline Grid](#8px-Baseline-Grid)
[Playbook Spacing Tokens](#Playbook-Spacing-Tokens)
[Margin and Padding](#Margin-and-Padding)
[Layout Guidelines](#Layout-Guidelines)
[Accessibility Standards](#Accessibility-Standards)

Effective spacing in product design is key for user-friendliness. Playbook uses spacing tokens for consistency, simplifying design and enabling clear, functional layouts. Various spacing types contribute to a structured hierarchy. Consistency ensures precision and user-friendly design.


## 8px Baseline Grid

Playbook provides spacing tokens for creating clear, functional responsive layouts. It utilizes an 8px spacing system for consistency and ease of development across components, ensuring visually appealing and accessible layouts on various devices. This approach supports responsive design, enhancing the overall user experience.


## Playbook Spacing Tokens

Playbook's spacing tokens are vital for consistent interfaces and accessibility. They improve clarity and readability, especially for important information, assisting designers in creating user-friendly, easy-to-navigate interfaces. Accessibility and readability are core principles in the Playbook design system.


| Size                            | Name & Token         | Pixel Size | Usage                                   |
|---------------------------------|----------------------|------------|-----------------------------------------|
| <img width="41" alt="spacing square" class="guidelines-spacing-square" src="https://github.com/powerhome/playbook/assets/48187916/6568a9ed-262e-4502-a011-63a9085d598b"> | xl <br/> $space_xl   |  40px      | Largest value that can be used for page margins and between content containers       |
| <img width="33" alt="spacing square" class="guidelines-spacing-square" src="https://github.com/powerhome/playbook/assets/48187916/f1c874a7-3e2a-42fa-903e-c02711eff31e">  | lg <br/> $space_lg   |  32px | Good for larger spaces between groupings of smaller elements    |
| <img width="25" alt="spacing square" class="guidelines-spacing-square" src="https://github.com/powerhome/playbook/assets/48187916/f95a2286-79e6-4cb2-bade-0c68c9ca7580"> | md <br/> $space_md        |  24px | Mid sized spacing, best used between elements that are loosely related within a larger UI    |
| <img width="17" alt="spacing square" class="guidelines-spacing-square" src="https://github.com/powerhome/playbook/assets/48187916/6c450afc-48a5-481a-b6be-a9e5f2427615"> | sm <br/> $space_sm        |  16px | Most commonly used spacing size, ideal for separating mostly related UI, such as form fields    |
| <img width="9" alt="spacing square" class="guidelines-spacing-square" src="https://github.com/powerhome/playbook/assets/48187916/bd9e8997-cf5b-442b-9d41-dbb5fa31d9af"> | xs <br/> $space_xs       |  8px | Smaller spacing between related components     |
| <img width="5" alt="spacing square" class="guidelines-spacing-square" src="https://github.com/powerhome/playbook/assets/48187916/5ff92bcb-2790-493a-a697-8e250b4919bc"> | xxs <br/> $space_xxs    |  4px | Best used for spacing between small elements that are related, such as an xs icon and caption size small    |



## Margin and Padding

Margins and padding are very important for UI design, affecting layout, readability, and user experience. Margins control outer spacing, reducing clutter and enhancing readability, while padding manages inner spacing for a clean and organized interface. Playbook priorities carefully crafted margins and paddings to construct its components, ensuring enough clicking space, optimal readability, and solid accessibility standards.

<img style="margin:auto; display: block;" width="400" alt="card padding and margin graphic" src="https://github.com/powerhome/playbook/assets/48187916/694b5659-e1dd-4b66-aa46-af7045ba2be0">

## Layout Guidelines

<div class="spacing-principle">

<div>
<p class="pb_caption_kit_md"> Hierarchy </p>
UI hierarchy is essential for accessibility. It visually connects elements and enhances readability. Spacing aligns with this hierarchy. Important elements get more space for focus, less important ones get less for reduced emphasis. All Playbook's components, such as Dialog, are built prioritizing hierarchy. 
</div>
<img alt="spacing hierarchy example" src="https://github.com/powerhome/playbook/assets/48187916/98fca101-9d48-46f8-ae5c-9ca7ebaf2330">
</div>


<div class="spacing-principle">

<div>
<p class="pb_caption_kit_md"> Consistency </p>
Consistent spacing between elements based on their similarity or function enhances unity, user navigation, and comprehension. Playbook's library has thoroughly designed components, ensuring consistent spacing to unify similar elements and establish a cohesive UI.
</div>
<img alt="spacing consistency example" src="https://github.com/powerhome/playbook/assets/48187916/81e44d67-464d-48ac-a454-bd58af4d9d21">
</div>


<div class="spacing-principle">
<div>
<p class="pb_caption_kit_md"> Proximity </p>
Group related elements closely together and create space between distinct sections to visually separate content. Playbook uses proximity across all complex components to establish hierarchy.
</div>
<img alt="spacing proximity example" src="https://github.com/powerhome/playbook/assets/48187916/1710f947-0b56-4137-bf61-a890d45f394e">
</div>

<div class="spacing-principle">
<div>
<p class="pb_caption_kit_md"> Responsive Spacing </p>
Optimize spacing for diverse screens, adjusting proportionally to maintain legibility and hierarchy, ensuring a consistent interfaces. Playbook's library supports responsive layout in all components.
</div>
<span class="pb_card_kit_deselected_border_none_border_radius_xl shadow_deep py_none m_xs">
<img width="356" alt="responsive spacing example" src="https://github.com/powerhome/playbook/assets/48187916/38974b79-8e27-4517-8780-deb8c38a1792">
</span>
</div>

<div class="spacing-principle">

<div>
<p class="pb_caption_kit_md"> Whitespace </p>
Utilize intentional whitespace to delineate elements, establish hierarchy, prevent clutter, and enable user focus on critical content. Playbook has the Flex kit to define white spacing and consistency of all the UI elements.
</div>
<img alt="spacing whitespace example" src="https://github.com/powerhome/playbook/assets/48187916/682d85bd-552d-462c-bd9d-6bbcad14c7f0">
</div>



## Accessibility Standards

Improving accessibility via spacing design tokens ensures consistency, scalability, and adaptability across different screen sizes. Ample spacing facilitates smoother navigation.

###### Tap Area

Tap area spacing accessibility ensures there's enough space around interactive elements for easy tapping. This approach enhances accessibility by reducing the likelihood of accidental taps and improving usability for individuals with mobility or vision impairments.

Both iOS and Android recommend touch targets for optimal usability. iOS suggests a minimum of 44x44 pixels, while Android suggests 48x48 dp, corresponding to a 9mm physical size. Android's varied pixel densities necessitate consideration for consistent user experience.

<img style="margin:auto; display: block;" width="750px" alt="fff" src="https://github.com/powerhome/playbook/assets/48187916/a787eb2e-a27f-474d-9ce9-ecad976abefb">

###### Text Elements

In accessibility, it's important to provide adequate spacing between text elements for readability. Recommendations include:

1. Line spacing: Set to at least 1.5 times the font size.
2. Paragraph spacing: Ensure a minimum of 1.5 times the line height.
3. Letter spacing: Allow for around 0.1 to 0.2 times the font size.
4. Word spacing: Maintain consistent spacing of around 0.1 to 0.2 times the font size.

Some Playbook text examples can be found in the Typography Guidelines.
