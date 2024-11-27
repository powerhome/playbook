import '../support/commands';

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/"); // Navigate to the home page
  });

  it("displays the correct title", () => {
    // If the title is in the <title> tag
    cy.title().should("eq", "Playbook Design System");
  });
});

describe("Button Kit Tests", () => {
  it("Click primary button and verify alert", () => {
    cy.visit("http://localhost:3000/kits/button/react");

    // Capture and verify the alert message
    cy.on("window:alert", (message) => {
      expect(message).to.equal("button clicked!");
    });

    // Locate and click the button
    cy.get(".pb_button_kit_primary_inline_enabled").first().click();
  });
});

