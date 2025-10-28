Feature: User Login
    @basic
    Scenario: Login with valid credentials
        Given the user is on the login page
        When the user enter valid credentials
        Then the dashboard page appears