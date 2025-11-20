/// <reference types="cypress" />

Cypress.Commands.add("testLogin", (userId: string) => {
  const base = "http://localhost:8000"

  // Step 1 — Fetch CSRF token
  cy.request({
    method: "GET",
    url: `${base}/api/v1/csrf-token`,
  }).then((res) => {
    const csrfToken =
      res.body?.csrf_token ||
      res.body?.token ||
      res.body?.csrf ||
      ""

    expect(csrfToken).to.be.a("string")

    // Step 2 — Login using CSRF token
    cy.request({
      method: "POST",
      url: `${base}/api/v1/testing/login`,
      headers: {
        "X-CSRFToken": csrfToken,
        "Content-Type": "application/json",
      },
      body: {
        user_id: userId,
      },
      failOnStatusCode: false, // optional
    })
  })
})
