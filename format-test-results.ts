import * as fs from 'fs';

function parseTestResults() {
    // Reads and parses original test report
    const rawData = fs.readFileSync('allure-report/data/suites.json');
    const data = JSON.parse(rawData.toString());

    let testResults: string = '';

    // Uses only values for each test suite name, test name and test result
    data.children.forEach((suite: any) => {
        // suites
        let result: string = '';
        const suiteName = suite.name;
        result = `\n:arrow_right: *${suiteName}*:\n`
        testResults += result;

        // tests
        suite.children.forEach((test: any) => {
            const testName = test.name;
            const status = test.status;
            let icon = '';
            if (status === 'passed') {
                icon = ':large_green_circle:';
            } else if (status === 'failed') {
                icon = ':red_circle:';
            } else {
                icon = '\n:arrow_lower_right:';
            }
            result = `${icon} ${testName}\n`;
            testResults += result;

            // nested suites
            if (test.children) {
                test.children.forEach((nestedSuite: any) => {
                    const nestedSuiteName = nestedSuite.name;
                    result = `\n:arrow_lower_right: *${nestedSuiteName}*:\n`
                    testResults += result;

                    // nested tests
                    nestedSuite.children.forEach((nestedTest: any) => {
                        const nestedTestName = nestedTest.name;
                        const nestedTestStatus = nestedTest.status;
                        let icon = '';
                        if (nestedTestStatus === 'passed') {
                            icon = ':large_green_circle:';
                        } else if (nestedTestStatus === 'failed') {
                            icon = ':red_circle:';
                        } else {
                            icon = '\n:arrow_lower_right:';
                        }
                        result = `${icon} ${nestedTestName}\n`;
                        testResults += result;
                    });
                });
            }
        });
    });

    // Turns resuls back to JSON and writes them to new file
    const slackPayload = {
        text: `New <https://pk-tests.github.io/templateCypressCucumberTests/|Allure report> was just deployed.\n
        ${testResults}\n`
    }
    fs.writeFileSync('payload-slack-content.json', JSON.stringify(slackPayload));
}

parseTestResults();