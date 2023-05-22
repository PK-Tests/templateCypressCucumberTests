import * as fs from 'fs';

function parseTestResults() {
    // Reads and parses original test report
    const rawData = fs.readFileSync('allure-report/data/suites.json');
    const data = JSON.parse(rawData.toString());

    let testResults: string = '';

    // Uses only values for each test suite name, test name and test result
    data.children.forEach((suite: any) => {
        let result: string = '';
        const suiteName = suite.name;
        result = `*** \n:file_folder: **${suiteName}:**`
        testResults = testResults.concat('\n\n', result);

        suite.children.forEach((test: any) => {
            const testName = test.name;
            const status = test.status;
            let icon = '';
            if (status === 'passed') {
                icon = ':white_check_mark:';
            } else if (status === 'failed') {
                icon = ':x:';
            } else {
                icon = ':warning:';
            }
            result = `${icon} ${testName}`;
            testResults = testResults.concat('\n', result);

            suite.children.forEach((nestedTest: any) => {
                const testName = nestedTest.name;
                const status = nestedTest.status;
                let icon = '';
                if (status === 'passed') {
                    icon = ':white_check_mark:';
                } else if (status === 'failed') {
                    icon = ':x:';
                } else {
                    icon = ':warning:';
                }
                result = `${icon} ${testName}`;
                testResults = testResults.concat('\n', result);
            });
        });
    });

    // Turns resuls back to JSON and writes them to new file
    const slackPayload = {
        text: `New <https://pk-tests.github.io/templateCypressCucumberTests/|Allure report> was just deployed.\n
        Results:\n
        ${testResults}\n`
    }
    fs.writeFileSync('payload-slack-content.json', JSON.stringify(slackPayload));
}

parseTestResults();