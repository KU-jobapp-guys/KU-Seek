describe("Dashboard after login", () => {
it("logs in and opens dashboard", () => {
  const userId = "6869f95191b541da93a1806fc4065f41";

  cy.testLogin(userId);

  cy.visit("http://localhost:5173/explore-job");

  cy.contains("Welcome").should("exist");
});
});
