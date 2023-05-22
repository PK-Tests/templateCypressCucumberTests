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
        result = `${suiteName}: \n`
        testResults = testResults.concat('', result);

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
            result = `${testName} ${icon}\n`;
            testResults = testResults.concat('', result);

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
                result = `${testName} ${icon}\n`;
                testResults = testResults.concat('', result);
            });
        });
    });

    // Turns resuls back to JSON and writes them to new file
    const slackPayload = {
        text: `New <https://pk-tests.github.io/templateCypressCucumberTests/|Allure report> was just deployed.\n
        Results:\n
        ${testResults}`
    }
    fs.writeFileSync('payload-slack-content.json', JSON.stringify(slackPayload));

    //const url =
      //  'https://hooks.slack.com/services/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';
        //request.post(
          //  {
            //    url: url,
              //  body: JSON.stringify(JSON.stringify(slackPayload)),
            //},
            //(err: any, response: any, body: any) => {
            //    if (err) {
              //      console.log(err);
                //} else {
                  //  console.log('Message sent to Slack');
                //}
            //}
    //);
}

parseTestResults();