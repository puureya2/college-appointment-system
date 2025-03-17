import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { AppointmentsApi } from "../support/api/appointmentsApi";


let appointmentId;
let studentId = "123";
let professorId = "456";
let date = "2025-03-20T10:00:00Z";

Given("I have a professor with ID {string}", (id) => {
    professorId = id;
});

When("I create an appointment slot for {string}", (appointmentDate) => {
    AppointmentsApi.addAppointment(professorId, appointmentDate).then((response) => {
        expect(response.status).to.eq(201);
        appointmentId = response.body.appointment._id;
    });
});

Then("the appointment should be added successfully", () => {
    expect(appointmentId).to.not.be.undefined;
});

When("a student with ID {string} books the appointment", (id) => {
    studentId = id;
    AppointmentsApi.bookAppointment(appointmentId, studentId).then((response) => {
        expect(response.status).to.eq(200);
    });
});

Then("the appointment should be booked successfully", () => {
    expect(appointmentId).to.not.be.undefined;
});

When("I cancel the appointment", () => {
    AppointmentsApi.cancelAppointment(appointmentId).then((response) => {
        expect(response.status).to.eq(200);
    });
});

Then("the appointment should be cancelled successfully", () => {
    expect(appointmentId).to.not.be.undefined;
});
