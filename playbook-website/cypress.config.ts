import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Set this to the Rails app's test server URL
    setupNodeEvents(on, config) {
      // Add custom node event listeners if needed
    },
    supportFile: "cypress/support/index.ts", // Optional if you have a custom support file
  },
});
