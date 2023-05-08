"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function parseTestResults() {
    // Reads and parses original test report
    var rawData = fs.readFileSync('allure-report/data/suites.json');
    var data = JSON.parse(rawData.toString());
    var testResults = [];
    // Uses only values for each test suite name, test name and test result
    data.children.forEach(function (suite) {
        var result = [];
        var suiteName = suite.name;
        result = [
            { suiteName: suiteName }
        ];
        testResults.push(result);
        suite.children.forEach(function (test) {
            var testName = test.name;
            var status = test.status;
            result = [
                {
                    testName: testName,
                    status: status
                }
            ];
            testResults.push(result);
            suite.children.forEach(function (nestedTest) {
                var testName = nestedTest.name;
                var status = nestedTest.status;
                result = [
                    {
                        testName: testName,
                        status: status
                    }
                ];
                testResults.push(result);
            });
        });
    });
    // Turns resuls back to JSON and writes them to new file
    // const formattedResults = JSON.stringify(testResults, null, 2);
    var formattedResults = JSON.stringify({
        text: "New <https://pk-tests.github.io/templateCypressCucumberTests/|Allure report> was just deployed.\n\n        ".concat(testResults.join('\n'))
    }, null, 2);
    console.log(formattedResults);
    fs.writeFileSync('payload-slack-content.json', formattedResults);
}
parseTestResults();
