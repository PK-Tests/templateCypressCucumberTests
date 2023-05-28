"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cypress_1 = require("cypress");
const writer_1 = __importDefault(require("@shelex/cypress-allure-plugin/writer"));
const cypress_cucumber_preprocessor_1 = require("@badeball/cypress-cucumber-preprocessor");
const browserify_1 = __importDefault(require("@badeball/cypress-cucumber-preprocessor/browserify"));
module.exports = (0, cypress_1.defineConfig)({
    e2e: {
        specPattern: ["**/*.feature", "**/*cy.js"],
        baseUrl: 'https://example.cypress.io/',
        env: {
            allureReuseAfterSpec: true,
            allure: true
        },
        async setupNodeEvents(on, config) {
            await (0, cypress_cucumber_preprocessor_1.addCucumberPreprocessorPlugin)(on, config);
            on("file:preprocessor", (0, browserify_1.default)(config, {
                typescript: require.resolve("typescript"),
            }));
            (0, writer_1.default)(on, config);
            return config;
        },
    },
});
