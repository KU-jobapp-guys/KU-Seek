declare namespace Cypress {
  interface Chainable {
    testLogin(userId: string): Chainable;
  }
}