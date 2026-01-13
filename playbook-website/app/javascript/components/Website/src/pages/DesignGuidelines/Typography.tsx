import { Background, Body, Title, Caption, Table } from "playbook-ui";
import HeaderImage from "../../../../../images/getting-started.svg";

const Typography = () => {
  return (
    <>
      <Background
        imageUrl={HeaderImage}
        width="100%"
        display={{ xs: "none", sm: "none", md: "none" }}
        height="250px"
        backgroundColor="dark"
        backgroundSize="contain"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      />
      <Background
        display="flex"
        justifyContent="center"
        className="markdown w100"
        backgroundColor="white"
        paddingX="sm"
        paddingY="md"
      >
        <Background maxWidth="md" backgroundColor="white">
          <Title text="Typography" size={1} marginBottom="sm" />
          
          <Body marginBottom="md">
            For our Typography Tokens refer to{" "}
            <a href="https://playbook.powerapp.cloud/tokens/typography">Typography</a> in{" "}
            <a href="https://playbook.powerapp.cloud/tokens">Tokens</a>
          </Body>

          <Title text="Index" size={4} marginBottom="sm" />
          <Body marginBottom="md">
            <a href="#typography-usage">Typography Usage & Best Practices</a><br />
            ‣ <a href="#typography-styles">Typography Styles</a><br />
            ‣ <a href="#visual-hierarchy">Creating Visual Hierarchy with Typography</a><br />
            ‣ <a href="#text-modifiers">Text Modifiers</a><br />
            ‣ <a href="#typography-kits">Typography Kits</a><br />
            ‣ <a href="#typography-tables">Typography in Tables</a><br />
            <a href="#typography-accessibility">Typography Accessibility Standards</a>
          </Body>

          <Body marginBottom="md">
            Typography serves as the backbone of any design system. It's not just for page titles and copy; typography is everywhere, from navigation labels to buttons, captions, form fields, and more. It is essential for providing context, guiding users, and delivering the core content of an application.
            <br /><br />
            Playbook's typography plays a crucial role in shaping the user experience. As a design system primarily used for business software applications, we know that readability is vital for effortless navigation and easy comprehension. To achieve this Playbook uses a professional, unembellished san-serif front and prioritizes intuitive hierarchy in our typography styles.
            <br /><br />
            When swapping out the default Playbook font, we recommend using a simple sans-serif font such as Proxima Nova or Arial.
          </Body>

          <Title id="typography-usage" text="Typography Usage & Best Practices" size={2} marginTop="xl" marginBottom="md" />

          <Title id="typography-styles" text="Typography Styles" size={3} marginTop="lg" marginBottom="sm" />
          <Body marginBottom="md">
            Playbook offers 13 different text styles within four different text components. Each component is built for a specific purpose that helps ensure consistency of usage.
          </Body>

          <Table marginBottom="xxs">
            <thead>
              <tr>
                <th>Typography</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><p className="pb_title_kit_size_1">Title 1</p></td>
                <td>Largest font size used for banners and covers on homepages.</td>
              </tr>
              <tr>
                <td><p className="pb_title_kit_size_1_thin">Title 1 Light</p></td>
                <td>Light alternative to default Title 1</td>
              </tr>
              <tr>
                <td><p className="pb_title_kit_size_2">Title 2</p></td>
                <td>Secondary title size used for regular page titles</td>
              </tr>
              <tr>
                <td><p className="pb_title_kit_size_2_thin">Title 2 Light</p></td>
                <td>Less emphasis than Title 2, good for main callouts that are not the page's title, ie. dashboard numbers.</td>
              </tr>
              <tr>
                <td><p className="pb_title_kit_size_3">Title 3</p></td>
                <td>An h3 title size</td>
              </tr>
              <tr>
                <td><p className="pb_title_kit_size_3_thin">Title 3 Light</p></td>
                <td>Light alternative to default Title 3</td>
              </tr>
              <tr>
                <td><p className="pb_title_kit_size_4">Title 4</p></td>
                <td>Useful as a header 4 for subsection titles or emphasis in a table row</td>
              </tr>
              <tr>
                <td><p className="pb_caption_kit_lg_color_default mt_xxs">Large Caption</p></td>
                <td>A larger caption style that can be used sparingly as a subsection title or large label.</td>
              </tr>
              <tr>
                <td><p className="pb_body_kit mt_xxs">Body</p></td>
                <td>Default body text size, used for paragraphs and main text content.</td>
              </tr>
              <tr>
                <td><p className="pb_caption_kit_md_color_default mt_xxs">Caption</p></td>
                <td>Default caption styling, often used underneath a title for a singular phrase or sentence</td>
              </tr>
              <tr>
                <td><p className="pb_caption_kit_xs_color_default mt_xxs">Subcaption</p></td>
                <td>A smaller caption style for information not key to the page's function</td>
              </tr>
              <tr>
                <td><p className="pb_detail_kit_color_default bold mt_xxs">Detail Bold</p></td>
                <td>Used sparingly for emphasis on secondary information</td>
              </tr>
              <tr>
                <td><p className="pb_detail_kit_color_default mt_xxs">Detail</p></td>
                <td>Used for secondary information. Useful in information dense tables</td>
              </tr>
            </tbody>
          </Table>

          <Body margin="md">
            Some Playbook components such as our button and badge, use variations of our text styles with slightly different kerning or font sizes. Differentiating these components text styles give visual cues to the user that they are conveying different information.
          </Body>

          <img 
            style={{ margin: 'auto', display: 'block', marginBottom: '2rem' }} 
            src="https://github.com/powerhome/playbook/assets/48187916/6acfdc97-be32-47f6-b955-7c80c871414f" 
            alt="Button Imagery"
          />

          <Title id="visual-hierarchy" text="Creating Visual Hierarchy with Typography" size={3} marginTop="lg" marginBottom="sm" />
          <Body marginBottom="md">
            Typography hierarchy plays a key role in guiding users through interfaces and ensuring important information is not overlooked. Using the following concepts, Playbook establishes a clear hierarchy to effectively guide the viewer's attention and create a seamless experience.
          </Body>

          <div className="typography-guidelines">
            <div style={{ marginBottom: '2rem' }}>
              <Caption text="Weight" size="md" marginBottom="sm" />
              <ul>
                <li>Bolder weights command attention and signify importance.</li>
                <li>Lighter weights are often employed for supporting content or lesser emphasis.</li>
              </ul>
              <img 
                src="https://github.com/powerhome/playbook/assets/48187916/a18ea880-ef8b-4feb-b662-47c06d0667e6" 
                alt="Example of font weight usage"
                style={{ maxWidth: '100%', marginTop: '1rem' }}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <Caption text="Case" size="md" marginBottom="sm" />
              <ul>
                <li>Uppercase text can convey formality and importance; it is used most commonly as labels and to designate sections.</li>
                <li>Sentence case or lowercase text is generally easier to read and is suitable for longer passages.</li>
              </ul>
              <img 
                src="https://github.com/powerhome/playbook/assets/48187916/62196a7c-2ddf-45e4-a6dd-825b8680b704" 
                alt="Example of font case usage"
                style={{ maxWidth: '100%', marginTop: '1rem' }}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <Caption text="Size" size="md" marginBottom="sm" />
              <ul>
                <li>Larger font sizes denote importance and hierarchy.</li>
                <li>Smaller font sizes are typically used for secondary information or details.</li>
              </ul>
              <img 
                src="https://github.com/powerhome/playbook/assets/48187916/24dcea48-4180-47fc-9cc4-65c81e252c6a" 
                alt="Example of font size usage"
                style={{ maxWidth: '100%', marginTop: '1rem' }}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <Caption text="Position" size="md" marginBottom="sm" />
              <ul>
                <li>Text positioned prominently at the top or center tends to grab attention and signal importance.</li>
                <li>Secondary information may be placed off to the side or at the bottom for less emphasis.</li>
              </ul>
              <img 
                src="https://github.com/powerhome/playbook/assets/48187916/e004f99e-4ad1-4ba2-8065-09f5b9f50773" 
                alt="Example of font position"
                style={{ maxWidth: '100%', marginTop: '1rem' }}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <Caption text="Alignment" size="md" marginBottom="sm" />
              <ul>
                <li>Centered or justified alignment can impart a formal or structured appearance.</li>
                <li>Left-aligned text is often easier to read and lends a more casual or contemporary feel.</li>
              </ul>
              <img 
                src="https://github.com/powerhome/playbook/assets/48187916/d2c95e5e-5350-411f-b179-85859729425f" 
                alt="Example of font alignment"
                style={{ maxWidth: '100%', marginTop: '1rem' }}
              />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <small style={{ display: 'block', marginBottom: '1rem' }}>
                Example UI Using Clear Text Hierarchy
              </small>
              <img 
                style={{ margin: '0px' }} 
                src="https://github.com/powerhome/playbook/assets/48187916/eab5e8fd-7434-4e92-81d8-553d42867618" 
                alt="Example UI Layout"
              />
            </div>
          </div>

          <Body marginBottom="md">
            Incorporating these concepts into our typography components and styles ensures effective communication of content hierarchy and enhances overall usability.
          </Body>

          <Title id="text-modifiers" text="Text Modifiers" size={3} marginTop="lg" marginBottom="sm" />
          <Body marginBottom="md">
            Outside of the given typography styles above, there are many other ways to create different styles. These can involve adding a different style tag, adjusting font weights, and adding tabular number spacing.
          </Body>

          <Title text="Text Styles" size={4} marginTop="md" marginBottom="sm" />
          <Body marginBottom="md">
            While the Body kit supports using style tags within the kit, these tags can be used anywhere for custom cases.
          </Body>

          <Table marginBottom="xxs">
            <thead>
              <tr>
                <th>Style</th>
                <th>Tag</th>
                <th>Definition</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Bold</b></td>
                <td><code>&lt;b&gt;</code></td>
                <td>Bolds text</td>
              </tr>
              <tr>
                <td><strong>Strong</strong></td>
                <td><code>&lt;strong&gt;</code></td>
                <td>Bolds text</td>
              </tr>
              <tr>
                <td><a>Link</a></td>
                <td><code>&lt;a&gt;</code></td>
                <td>Changes to primary color to indicate text is clickable</td>
              </tr>
              <tr>
                <td><i>Italicized</i></td>
                <td><code>&lt;i&gt;</code></td>
                <td>Italicizes text</td>
              </tr>
              <tr>
                <td><em>Emphasized</em></td>
                <td><code>&lt;em&gt;</code></td>
                <td>Emphasis used on titles</td>
              </tr>
              <tr>
                <td><small>Small</small></td>
                <td><code>&lt;small&gt;</code></td>
                <td>Reduces font size</td>
              </tr>
              <tr>
                <td><u>Underlined</u></td>
                <td><code>&lt;u&gt;</code></td>
                <td>Underlines text</td>
              </tr>
            </tbody>
          </Table>

          <Title text="Font Weights" size={4} marginTop="md" marginBottom="sm" />
          <Body marginBottom="md">
            Using font weights is crucial for typography and hierarchy because they play a significant role in establishing visual contrast and organizing information effectively. Playbook offers seven different font weights for various uses.
          </Body>

          <Table marginBottom="xxs">
            <thead>
              <tr>
                <th>Font Weight</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><p className="pb_body_kit mt_xxs typography-weight-100">Font Thin</p></td>
                <td>Good as a light option for titles with lower hierarchy</td>
              </tr>
              <tr>
                <td><p className="pb_body_kit mt_xxs">Font Regular</p></td>
                <td>Used for common body text content and general usage</td>
              </tr>
              <tr>
                <td><p className="pb_body_kit mt_xxs typography-weight-600">Font Bold</p></td>
                <td>Default bold value used for general emphasis, pairs well with a smaller font size to act as a caption</td>
              </tr>
            </tbody>
          </Table>

          <Title text="Tabular Number Spacing" size={4} marginTop="md" marginBottom="sm" />
          <div className="typography-principle" style={{ marginBottom: '2rem' }}>
            <Body marginBottom="md">
              Tabular number spacing, also known as monospacing, is a typographic feature where each digit occupies the same amount of horizontal space. This uniform spacing ensures that numbers align properly in columns, making it a particularly powerful format in data tables.
              <br /><br />
              Ensuring readable numbers is so crucial for business operations that Playbook offers tabular number spacing as a global prop within the library. It's recommended on any numeric values for display on any typographic style.
            </Body>
            <img 
              src="https://github.com/powerhome/playbook/assets/48187916/ec72abe4-02b7-4a41-a2fe-60c13f7762c0" 
              width="325px" 
              alt="Tabular Number Spacing"
              style={{ marginBottom: '1rem' }}
            />
          </div>

          <Title id="typography-kits" text="Typography Kits" size={3} marginTop="lg" marginBottom="sm" />
          <Body marginBottom="md">
            Playbook offers a range of ready-to-use typography layouts that prioritize displaying clear and concise information.
            Designed to make the best use of the library's typography options, layouts offered can be used for date and time formats, contact details, addresses, and label/value groupings.
            Through strategic use of color, font size, and font weight, Playbook establishes strong informational and visual hierarchies, ensuring effective communication and enhanced readability.
          </Body>

          <img 
            src="https://github.com/powerhome/playbook/assets/48187916/550ddd79-932f-4245-82c1-09b02de35345" 
            alt="Typography Kits Example"
            style={{ maxWidth: '100%', marginBottom: '2rem' }}
          />

          <Title id="typography-tables" text="Typography in Tables" size={3} marginTop="lg" marginBottom="sm" />
          <Body marginBottom="md">
            When working with complex tables, the UI is susceptible to becoming information-dense and harder to read. Use the following best practices to create clear, readable tables.
          </Body>

          <div className="typography-list">
            <ul>
              <li>Keep your typography choices simple. Avoid overwhelming the design with excessive options.</li>
              <li>Maintain consistency in column headers and body content throughout to ensure coherence.</li>
              <li>Avoid overly large titles or font sizes; instead, rely more on font weight and color variations to establish visual hierarchy effectively.</li>
              <li>If your content is data heavy, consider utilizing the Detail kit over the Body kit.</li>
              <li>For multi-line cells, make use of styles to create readability.
                <ul>
                  <li>Emphasize primary content using Title 4 or heavier font weights for better clarity and emphasis.</li>
                  <li>Use subcaption, detail or other light weight, smaller font sizes for sub-copy or details.</li>
                </ul>
              </li>
            </ul>
          </div>

          <img 
            style={{ margin: 'auto', display: 'block', marginBottom: '2rem' }} 
            src="https://github.com/powerhome/playbook/assets/48187916/4dbcaace-0ce9-43b2-b6f8-9534f278d2b7" 
            width="750" 
            alt="Example table UI"
          />

          <Title id="typography-accessibility" text="Typography Accessibility Standards" size={2} marginTop="xl" marginBottom="md" />
          
          <Title text="Color Accessibility Standards" size={4} marginTop="md" marginBottom="sm" />
          <Body marginBottom="md">
            Accessibility in typography is critical to ensuring inclusivity in usability, as text is such an integral part of any interface.
            There is no perfect font for accessibility, so it is important to follow best practices.
            Prioritizing the following within Playbook helps our design system be more accessible.
          </Body>

          <div className="typography-list">
            <ul>
              <li>Ensure individual letterforms are distinct in shape to avoid confusion between characters like I, l, and 1, or 0 and O.</li>
              <li>Kerning and line height should be appropriate, too little or too much space will reduce readability.</li>
              <li>Sans-serif fonts are preferred for their simplicity and clarity, particularly on screens or at smaller sizes.</li>
              <li>Bolder weights can improve legibility, but excessive thickness may hinder readability, especially for longer passages. Avoid very light or bold font weights for text under 16px.</li>
              <li>Larger font sizes aid readability, particularly for users with visual impairments or on smaller screens. Important content should be displayed with a font size of 16px or larger.</li>
              <li>Ensure paragraphs and larger text blocks are scannable, with text blocks containing 45-80 characters.</li>
              <li>Consider WCAG guidelines when implementing color in typography. Text size 16px and below requires 4.5:1 color contrast between text and background, and 3:1 for 16px bold or larger text.</li>
            </ul>
          </div>

          <Body marginBottom="md">
            Incorporate these typography best practices to optimize readability and comprehension, ensuring that UI remains clear and accessible.
            <br /><br />
            For more information on accessibility in typography review these resources:<br />
            <a href="https://accessibility.digital.gov/visual-design/typography/">https://accessibility.digital.gov/visual-design/typography/</a><br />
            <a href="https://designsystem.digital.gov/components/typography/">https://designsystem.digital.gov/components/typography/</a><br />
            <a href="https://webaim.org/standards/wcag/checklist">https://webaim.org/standards/wcag/checklist</a>
          </Body>

        </Background>
      </Background>
    </>
  );
};

export default Typography;
