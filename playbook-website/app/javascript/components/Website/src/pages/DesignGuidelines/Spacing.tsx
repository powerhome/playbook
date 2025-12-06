import { Background, Body, Title, Caption, Table } from "playbook-ui";
import HeaderImage from "../../../../../images/getting-started.svg";

const Spacing = () => {
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
          <Title text="Spacing" size={1} marginBottom="sm" />
          
          <Body marginBottom="md">
            For our Spacing Tokens refer to{" "}
            <a href="https://playbook.powerapp.cloud/tokens/padding">Padding</a> or{" "}
            <a href="https://playbook.powerapp.cloud/tokens/margin">Margin</a> in our{" "}
            <a href="https://playbook.powerapp.cloud/tokens">Tokens Page</a>
          </Body>

          <Title text="Index" size={4} marginBottom="sm" />
          <Body marginBottom="md">
            <a href="#baseline-grid">8px Baseline Grid</a><br />
            <a href="#spacing-tokens">Playbook Spacing Tokens</a><br />
            <a href="#margin-padding">Margin and Padding</a><br />
            <a href="#layout-guidelines">Layout Guidelines</a><br />
            <a href="#accessibility-standards">Accessibility Standards</a>
          </Body>

          <Body marginBottom="md">
            Effective spacing in product design is key for user-friendliness. Playbook uses spacing tokens for consistency, simplifying design and enabling clear, functional layouts. Various spacing types contribute to a structured hierarchy. Consistency ensures precision and user-friendly design.
          </Body>

          <Title id="baseline-grid" text="8px Baseline Grid" size={2} marginTop="xl" marginBottom="md" />
          <Body marginBottom="md">
            Playbook provides spacing tokens for creating clear, functional responsive layouts. It utilizes an 8px spacing system for consistency and ease of development across components, ensuring visually appealing and accessible layouts on various devices. This approach supports responsive design, enhancing the overall user experience.
          </Body>

          <Title id="spacing-tokens" text="Playbook Spacing Tokens" size={2} marginTop="xl" marginBottom="md" />
          <Body marginBottom="md">
            Playbook's spacing tokens are vital for consistent interfaces and accessibility. They improve clarity and readability, especially for important information, assisting designers in creating user-friendly, easy-to-navigate interfaces. Accessibility and readability are core principles in the Playbook design system.
          </Body>

          <Table marginBottom="xxs">
            <thead>
              <tr>
                <th>Size</th>
                <th>Name & Token</th>
                <th>Pixel Size</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img width="41" alt="spacing square" className="guidelines-spacing-square" src="https://github.com/powerhome/playbook/assets/48187916/6568a9ed-262e-4502-a011-63a9085d598b" /></td>
                <td>xl<br />$space_xl</td>
                <td>40px</td>
                <td>Largest value that can be used for page margins and between content containers</td>
              </tr>
              <tr>
                <td><img width="33" alt="spacing square" className="guidelines-spacing-square" src="https://github.com/powerhome/playbook/assets/48187916/f1c874a7-3e2a-42fa-903e-c02711eff31e" /></td>
                <td>lg<br />$space_lg</td>
                <td>32px</td>
                <td>Good for larger spaces between groupings of smaller elements</td>
              </tr>
              <tr>
                <td><img width="25" alt="spacing square" className="guidelines-spacing-square" src="https://github.com/powerhome/playbook/assets/48187916/f95a2286-79e6-4cb2-bade-0c68c9ca7580" /></td>
                <td>md<br />$space_md</td>
                <td>24px</td>
                <td>Mid sized spacing, best used between elements that are loosely related within a larger UI</td>
              </tr>
              <tr>
                <td><img width="17" alt="spacing square" className="guidelines-spacing-square" src="https://github.com/powerhome/playbook/assets/48187916/6c450afc-48a5-481a-b6be-a9e5f2427615" /></td>
                <td>sm<br />$space_sm</td>
                <td>16px</td>
                <td>Most commonly used spacing size, ideal for separating mostly related UI, such as form fields</td>
              </tr>
              <tr>
                <td><img width="9" alt="spacing square" className="guidelines-spacing-square" src="https://github.com/powerhome/playbook/assets/48187916/bd9e8997-cf5b-442b-9d41-dbb5fa31d9af" /></td>
                <td>xs<br />$space_xs</td>
                <td>8px</td>
                <td>Smaller spacing between related components</td>
              </tr>
              <tr>
                <td><img width="5" alt="spacing square" className="guidelines-spacing-square" src="https://github.com/powerhome/playbook/assets/48187916/5ff92bcb-2790-493a-a697-8e250b4919bc" /></td>
                <td>xxs<br />$space_xxs</td>
                <td>4px</td>
                <td>Best used for spacing between small elements that are related, such as an xs icon and caption size small</td>
              </tr>
            </tbody>
          </Table>

          <Title id="margin-padding" text="Margin and Padding" size={2} marginTop="xl" marginBottom="md" />
          <Body marginBottom="md">
            Margins and padding are very important for UI design, affecting layout, readability, and user experience. Margins control outer spacing, reducing clutter and enhancing readability, while padding manages inner spacing for a clean and organized interface. Playbook priorities carefully crafted margins and paddings to construct its components, ensuring enough clicking space, optimal readability, and solid accessibility standards.
          </Body>

          <img 
            style={{ margin: 'auto', display: 'block', marginBottom: '2rem' }} 
            width="400" 
            alt="card padding and margin graphic" 
            src="https://github.com/powerhome/playbook/assets/48187916/694b5659-e1dd-4b66-aa46-af7045ba2be0"
          />

          <Title id="layout-guidelines" text="Layout Guidelines" size={2} marginTop="xl" marginBottom="md" />

          <div className="spacing-principle" style={{ marginBottom: '2rem' }}>
            <Caption text="Hierarchy" size="md" marginBottom="sm" />
            <Body marginBottom="md">
              UI hierarchy is essential for accessibility. It visually connects elements and enhances readability. Spacing aligns with this hierarchy. Important elements get more space for focus, less important ones get less for reduced emphasis. All Playbook's components, such as Dialog, are built prioritizing hierarchy.
            </Body>
            <img alt="spacing hierarchy example" src="https://github.com/powerhome/playbook/assets/48187916/98fca101-9d48-46f8-ae5c-9ca7ebaf2330" style={{ maxWidth: '100%', marginBottom: '1rem' }} />
          </div>

          <div className="spacing-principle" style={{ marginBottom: '2rem' }}>
            <Caption text="Consistency" size="md" marginBottom="sm" />
            <Body marginBottom="md">
              Consistent spacing between elements based on their similarity or function enhances unity, user navigation, and comprehension. Playbook's library has thoroughly designed components, ensuring consistent spacing to unify similar elements and establish a cohesive UI.
            </Body>
            <img alt="spacing consistency example" src="https://github.com/powerhome/playbook/assets/48187916/81e44d67-464d-48ac-a454-bd58af4d9d21" style={{ maxWidth: '100%', marginBottom: '1rem' }} />
          </div>

          <div className="spacing-principle" style={{ marginBottom: '2rem' }}>
            <Caption text="Proximity" size="md" marginBottom="sm" />
            <Body marginBottom="md">
              Group related elements closely together and create space between distinct sections to visually separate content. Playbook uses proximity across all complex components to establish hierarchy.
            </Body>
            <img alt="spacing proximity example" src="https://github.com/powerhome/playbook/assets/48187916/1710f947-0b56-4137-bf61-a890d45f394e" style={{ maxWidth: '100%', marginBottom: '1rem' }} />
          </div>

          <div className="spacing-principle" style={{ marginBottom: '2rem' }}>
            <Caption text="Responsive Spacing" size="md" marginBottom="sm" />
            <Body marginBottom="md">
              Optimize spacing for diverse screens, adjusting proportionally to maintain legibility and hierarchy, ensuring a consistent interfaces. Playbook's library supports responsive layout in all components.
            </Body>
            <img width="356" alt="responsive spacing example" src="https://github.com/powerhome/playbook/assets/48187916/38974b79-8e27-4517-8780-deb8c38a1792" style={{ marginBottom: '1rem' }} />
          </div>

          <div className="spacing-principle" style={{ marginBottom: '2rem' }}>
            <Caption text="Whitespace" size="md" marginBottom="sm" />
            <Body marginBottom="md">
              Utilize intentional whitespace to delineate elements, establish hierarchy, prevent clutter, and enable user focus on critical content. Playbook has the Flex kit to define white spacing and consistency of all the UI elements.
            </Body>
            <img alt="spacing whitespace example" src="https://github.com/powerhome/playbook/assets/48187916/682d85bd-552d-462c-bd9d-6bbcad14c7f0" style={{ maxWidth: '100%', marginBottom: '1rem' }} />
          </div>

          <Title id="accessibility-standards" text="Accessibility Standards" size={2} marginTop="xl" marginBottom="md" />
          <Body marginBottom="md">
            Improving accessibility via spacing design tokens ensures consistency, scalability, and adaptability across different screen sizes. Ample spacing facilitates smoother navigation.
          </Body>

          <Title text="Tap Area" size={4} marginTop="md" marginBottom="sm" />
          <Body marginBottom="md">
            Tap area spacing accessibility ensures there's enough space around interactive elements for easy tapping. This approach enhances accessibility by reducing the likelihood of accidental taps and improving usability for individuals with mobility or vision impairments.
            <br /><br />
            Both iOS and Android recommend touch targets for optimal usability. iOS suggests a minimum of 44x44 pixels, while Android suggests 48x48 dp, corresponding to a 9mm physical size. Android's varied pixel densities necessitate consideration for consistent user experience.
          </Body>

          <img 
            style={{ margin: 'auto', display: 'block', marginBottom: '2rem' }} 
            width="750px" 
            alt="Tap area example" 
            src="https://github.com/powerhome/playbook/assets/48187916/a787eb2e-a27f-474d-9ce9-ecad976abefb"
          />

          <Title text="Text Elements" size={4} marginTop="md" marginBottom="sm" />
          <Body marginBottom="md">
            In accessibility, it's important to provide adequate spacing between text elements for readability. Recommendations include:
          </Body>

          <ol style={{ marginBottom: '2rem' }}>
            <li>Line spacing: Set to at least 1.5 times the font size.</li>
            <li>Paragraph spacing: Ensure a minimum of 1.5 times the line height.</li>
            <li>Letter spacing: Allow for around 0.1 to 0.2 times the font size.</li>
            <li>Word spacing: Maintain consistent spacing of around 0.1 to 0.2 times the font size.</li>
          </ol>

          <Body>
            Some Playbook text examples can be found in the Typography Guidelines.
          </Body>

        </Background>
      </Background>
    </>
  );
};

export default Spacing;
