Feature: User Login
    @pom
    Scenario: Login with valid credentials
        Given the user is on login page
        When user enter valid credentials
        Then dashboard page appears