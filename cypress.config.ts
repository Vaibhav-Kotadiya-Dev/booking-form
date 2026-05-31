import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.{js,ts,jsx,tsx}", // <-- make sure this matches your test files
    supportFile: "cypress/support/e2e.{js,ts}",        // optional, your support file
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: "cypress/component/**/*.cy.{js,ts,jsx,tsx}", // component tests
    supportFile: "cypress/support/component.{js,ts}",         // optional
  },
});
