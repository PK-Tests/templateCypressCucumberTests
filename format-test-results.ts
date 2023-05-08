import * as fs from 'fs';

function parseTestResults() {
    // Reads and parses original test report
    const rawData = fs.readFileSync('allure-report/data/suites.json');
    const data = JSON.parse(rawData.toString());

    const testResults: any[] = [];

    // Uses only values for each test suite name, test name and test result
    data.children.forEach((suite: any) => {
        let result: any[] = [];
        const suiteName = suite.name;
        result = [
            { suiteName }
        ]
        testResults.push(result);

        suite.children.forEach((test: any) => {
            const testName = test.name;
            const status = test.status;
            result = [
                {
                    testName,
                    status
                }
            ]
            testResults.push(result);

            suite.children.forEach((nestedTest: any) => {
                const testName = nestedTest.name;
                const status = nestedTest.status;
                result = [
                    {
                        testName,
                        status
                    }
                ]
                testResults.push(result);
            });
        });
    });

    // Turns resuls back to JSON and writes them to new file
    // const formattedResults = JSON.stringify(testResults, null, 2);
    const formattedResults = JSON.stringify({
        text: `New <https://pk-tests.github.io/templateCypressCucumberTests/|Allure report> was just deployed.\n
        ${testResults.join('\n')}`
    }, null, 2)
    console.log(formattedResults)
    fs.writeFileSync('payload-slack-content.json', formattedResults);
}

parseTestResults();
