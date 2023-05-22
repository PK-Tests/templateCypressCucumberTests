"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
function parseTestResults() {
    // Reads and parses original test report
    const rawData = fs.readFileSync('allure-report/data/suites.json');
    const data = JSON.parse(rawData.toString());
    let testResults = '';
    // Uses only values for each test suite name, test name and test result
    data.children.forEach((suite) => {
        let result = '';
        const suiteName = suite.name;
        result = `${suiteName}: \n`;
        testResults = testResults.concat('', result);
        suite.children.forEach((test) => {
            const testName = test.name;
            const status = test.status;
            let icon = '';
            if (status === 'success') {
                icon = ':white_check_mark:';
            }
            else if (status === 'failed') {
                icon = ':x:';
            }
            else {
                icon = ':warning:';
            }
            result = `${testName} ${icon}\n`;
            testResults = testResults.concat('', result);
            suite.children.forEach((nestedTest) => {
                const testName = nestedTest.name;
                const status = nestedTest.status;
                let icon = '';
                if (status === 'success') {
                    icon = ':white_check_mark:';
                }
                else if (status === 'failed') {
                    icon = ':x:';
                }
                else {
                    icon = ':warning:';
                }
                result = `${testName} ${icon}\n`;
                testResults = testResults.concat('', result);
            });
        });
    });
    // Turns resuls back to JSON and writes them to new file
    const formattedResults = JSON.stringify(testResults, null, 2);
    const slackPayload = {
        text: `New <https://pk-tests.github.io/templateCypressCucumberTests/|Allure report> was just deployed.\n
        Results:\n
        ${formattedResults}`
    };
    fs.writeFileSync('payload-slack-content.json', JSON.stringify(slackPayload));
}
parseTestResults();
