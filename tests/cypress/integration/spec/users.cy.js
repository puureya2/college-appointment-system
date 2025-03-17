describe("Users API", () => {
    it("Should create a user", () => {
      cy.request("POST", "api/users/add", {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "student",
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });
  