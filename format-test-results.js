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
        // suites
        let result = '';
        const suiteName = suite.name;
        result = `\n:arrow_right: *${suiteName}*:\n`;
        testResults += result;
        // tests
        suite.children.forEach((test) => {
            const testName = test.name;
            const status = test.status;
            let icon = '';
            if (status === 'passed') {
                icon = ':large_green_circle:';
            }
            else if (status === 'failed') {
                icon = ':red_circle:';
            }
            else {
                icon = '\n:arrow_lower_right:';
            }
            result = `      ${icon} ${testName}\n`;
            testResults += result;
            // nested tests
            if (test.children) {
                test.children.forEach((nestedTest) => {
                    const nestedTestName = nestedTest.name;
                    const nestedTestStatus = nestedTest.status;
                    let icon = '';
                    if (nestedTestStatus === 'passed') {
                        icon = ':large_green_circle:';
                    }
                    else if (nestedTestStatus === 'failed') {
                        icon = ':red_circle:';
                    }
                    result = `              ${icon} ${nestedTestName}\n`;
                    testResults += result;
                });
            }
        });
    });
    // Turns resuls back to JSON and writes them to new file
    const slackPayload = {
        text: `New <https://pk-tests.github.io/templateCypressCucumberTests/|Allure report> was just deployed.\n
        ${testResults}\n`
    };
    fs.writeFileSync('payload-slack-content.json', JSON.stringify(slackPayload));
}
parseTestResults();
