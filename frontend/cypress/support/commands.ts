/// <reference types="cypress" />

Cypress.Commands.add("testLogin", (userId: string) => {
  const base = "http://localhost:8000";

  // Step 1 — Get CSRF token, preserve cookies
  return cy.request({
    method: "GET",
    url: `${base}/api/v1/csrf-token`,
    withCredentials: true, // important to store CSRF cookie
  }).then((res) => {
    const csrfToken = res.body?.csrf_token || res.body?.token || "";

    // Step 2 — POST login with CSRF header and cookie
    return cy.request({
      method: "POST",
      url: `${base}/api/v1/testing/login`,
      headers: {
        "X-CSRFToken": csrfToken,
        "Content-Type": "application/json",
      },
      body: { user_id: userId },
      withCredentials: true, // send back cookie
      failOnStatusCode: false,
    });
  });
});
