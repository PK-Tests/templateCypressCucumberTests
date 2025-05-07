Feature: Example feature

    Example Description

    Background:
        Given user navigates to testing site
        And chooses "type" section

    @smokeTests
    Scenario: Submitting form with credentials
        When user fills out credentaials
        And confirms form
        Then form is submitted