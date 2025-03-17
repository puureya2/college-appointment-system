Feature: Appointment Management

  Scenario: Add a new appointment
    Given I have a professor with ID "456"
    When I create an appointment slot for "2025-03-20T10:00:00Z"
    Then the appointment should be added successfully

  Scenario: Book an appointment
    Given I have an available appointment
    When a student with ID "123" books the appointment
    Then the appointment should be booked successfully

  Scenario: Cancel an appointment
    Given I have a booked appointment
    When I cancel the appointment
    Then the appointment should be cancelled successfully

  Scenario: Delete all appointments
    Given there are multiple appointments
    When I delete all appointments
    Then there should be no appointments left

  Scenario: Fetch all appointments
    Given there are appointments in the system
    When I request all appointments
    Then I should receive a list of appointments

  Scenario: Fetch user appointments
    Given I have a user with appointments
    When I request the user's appointments
    Then I should receive the correct list of appointments
