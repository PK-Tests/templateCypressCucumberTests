"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function parseTestResults() {
    // Reads and parses original test report
    const rawData = fs_1.default.readFileSync('allure-report/data/suites.json');
    const data = JSON.parse(rawData.toString());
    const testResults = [];
    // Uses only values for each test suite name, test name and test result
    data.children.forEach((suite) => {
        let result = [];
        const suiteName = suite.name;
        result = [
            { suiteName }
        ];
        testResults.push(result);
        suite.children.forEach((test) => {
            const testName = test.name;
            const status = test.status;
            result = [
                {
                    testName,
                    status
                }
            ];
            testResults.push(result);
            suite.children.forEach((nestedTest) => {
                const testName = nestedTest.name;
                const status = nestedTest.status;
                result = [
                    {
                        testName,
                        status
                    }
                ];
                testResults.push(result);
            });
        });
    });
    // Turns resuls back to JSON and writes them to new file
    const formattedResults = JSON.stringify(testResults, null, 2);
    fs_1.default.writeFileSync('formatted-test-results.json', formattedResults);
}
parseTestResults();
