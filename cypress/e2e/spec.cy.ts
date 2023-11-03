describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')

    // Get both inputs, type into it
    cy.get('#login-username').type('fake@email.com');
    cy.get('#login-password').type('1234567');
    cy.get('#login-submit').click();

  });
});
