describe("Appointments API", () => {

  let appointmentId;
  let studentId = "123";
  let professorId = "456";
  let date = "2025-03-20T10:00:00Z";

  it("Should add a new appointment slot", () => {
      AppointmentsApi.addAppointment(professorId, date).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.have.property("message", "Appointment slot added successfully!");
          appointmentId = response.body.appointment._id;
      });
  });

  it("Should book an appointment", () => {
      AppointmentsApi.bookAppointment(appointmentId, studentId).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("message", "Appointment booked successfully!");
      });
  });

  it("Should delete an appointment by ID", () => {
    const appointmentId = "65fcf3f1a4b6e01234567890";

    AppointmentAPI.deleteAppointment(appointmentId)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Appointment deleted successfully");
    });
  });

  it("Should cancel an appointment", () => {
      AppointmentsApi.cancelAppointment(appointmentId).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("message", "Appointment cancelled successfully!");
      });
  });

  it("Should delete all appointments", () => {
      AppointmentsApi.deleteAllAppointments().then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("message", "All appointments deleted successfully!");
      });
  });

  it("Should fetch all appointments", () => {
      AppointmentsApi.getAllAppointments().then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an("array");
      });
  });

  it("Should fetch user appointments", () => {
      AppointmentsApi.getUserAppointments(studentId).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an("array");
      });
  });
    
});
  