const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://data-art-homework-frontend.vercel.app", // Adjust to your frontend URL
    setupNodeEvents(on: any, config: any) {
      // implement node event listeners here
    },
  },
});
