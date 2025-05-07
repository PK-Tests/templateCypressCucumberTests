import { defineConfig } from 'cypress';
import allureWriter from '@shelex/cypress-allure-plugin/writer';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import browserify from '@badeball/cypress-cucumber-preprocessor/browserify';

import dotenv from 'dotenv';
dotenv.config();

async function setupNodeEvents(
	on: Cypress.PluginEvents,
	config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
	await addCucumberPreprocessorPlugin(on, config);
	on(
		'file:preprocessor',
		browserify(config, {
			typescript: require.resolve('typescript'),
		})
	);

	allureWriter(on, config);

	return config;
}

module.exports = defineConfig({
	e2e: {
		specPattern: ['**/*.feature', '**/*cy.ts'],
		viewportHeight: 1080,
		viewportWidth: 1920,
		baseUrl: 'https://example.cypress.io/',
		env: {
			allureReuseAfterSpec: true,
			allure: true,
			email: process.env.EMAIL,
			password: process.env.PASSWORD
		},
		setupNodeEvents
	},
});
