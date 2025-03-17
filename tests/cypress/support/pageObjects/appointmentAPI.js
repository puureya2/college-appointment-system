class AppointmentAPI {

    static deleteAppointment(appointmentId) {
        return cy.request({
            method: "DELETE",
            url: `http://localhost:5000/api/appointments/delete/${appointmentId}`,
            failOnStatusCode: false
        });
    }

    static addAppointment(professorId, date) {
        return cy.request({
            method: "POST",
            url: "/api/appointments/add",
            body: { professorId, date },
            failOnStatusCode: false
        });
    }

    static bookAppointment(appointmentId, studentId) {
        return cy.request({
            method: "PUT",
            url: `/api/appointments/book/${appointmentId}`,
            body: { studentId },
            failOnStatusCode: false
        });
    }

    static cancelAppointment(appointmentId) {
        return cy.request({
            method: "PUT",
            url: `/api/appointments/cancel/${appointmentId}`,
            failOnStatusCode: false
        });
    }

    static deleteAllAppointments() {
        return cy.request({
            method: "DELETE",
            url: "/api/appointments/delete-all",
            failOnStatusCode: false
        });
    }

    static getAllAppointments() {
        return cy.request({
            method: "GET",
            url: "/api/appointments",
            failOnStatusCode: false
        });
    }

    static getUserAppointments(userId) {
        return cy.request({
            method: "GET",
            url: `/api/appointments/user/${userId}`,
            failOnStatusCode: false
        });
    }
    
}


export default AppointmentAPI;
