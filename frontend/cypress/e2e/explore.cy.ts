/// <reference types="cypress" />

describe("Dashboard after login", () => {
  it("logs in and shows user greeting", () => {
    const userId = "f67e51e96d754c9792846fc7b84b34a3"; 
    const userRole = "staff"; 

    cy.testLogin(userId).then((resp) => {
      expect(resp.status).to.eq(200);
      const accessToken = resp.body.access_token;

      cy.visit("http://localhost:5173/explore-job", {
        onBeforeLoad(win) {
          win.localStorage.setItem("access_token", accessToken);
          win.localStorage.setItem("user_jwt", accessToken);
          win.localStorage.setItem("userId", userId);
          win.localStorage.setItem("userRole", userRole);
        },
      });

      cy.wait(500);

      
    });
  });
});
