Cypress.Commands.add('login', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#login-username').type('exampleUser');
    cy.get('#login-password').type('1234567');
    cy.get('#login-submit').click();
    cy.contains('Welcome, exampleUser').should('be.visible');
  });
  
  Cypress.Commands.add('checkHomePage', () => {
    cy.login();
    cy.get('nav').contains('Rusina system').should('be.visible');
    cy.get('nav').contains('Clients').should('be.visible');
    cy.get('nav').contains('Logout').should('be.visible');
  });

Cypress.Commands.add('addClient', () => {
    cy.checkHomePage(); // Login and check content

    cy.visit('http://localhost:3000/clients'); // Visit clients page

    // Interact with form fields and submit the form
    cy.get('#clientName').type('New Client');
    cy.get('#CUIT').type('123456789');
    cy.get('#address').type('123 Main St');
    cy.get('#condicionIVA').select('Monotributista');
    cy.get('form').submit();

    // Assert that the new client is displayed in the list
    cy.contains('New Client').should('exist');
});

Cypress.Commands.add('updateClient', () => {
    cy.checkHomePage();

    cy.visit('http://localhost:3000/clients'); // Visit clients page

    // Find the edit button of the first client and click it
    cy.get('.client-item').first().find('.edit-button').click();

    // Interact with the update form fields and save
    cy.get('.client-item').first().find('#editCUIT').clear().type('9999');
    cy.get('.client-item').first().find('.save-button').click();

    // Assert that the client name is updated in the list
    cy.contains('9999').should('exist');
});

Cypress.Commands.add('updateClientEmpty', () => {
  cy.checkHomePage();

  cy.visit('http://localhost:3000/clients'); // Visit clients page

  // Find the edit button of the first client and click it
  cy.get('.client-item').first().find('.edit-button').click();

  // Interact with the update form fields and save
  cy.get('.client-item').first().find('#editClientName').clear();
  cy.get('.client-item').first().find('.save-button').click();

  // Assert that the client name is updated in the list
  cy.get('.client-name').invoke('text').should('have.length.above', 3);
});

Cypress.Commands.add('deleteClient', () => {
    cy.checkHomePage();

    cy.visit('http://localhost:3000/clients'); // Visit clients page

    cy.get('.client-item').first().find('.delete-button').click();

    // Confirm the delete action in the confirmation dialog
    cy.on('window:confirm', () => true);

    // Assert that the client is removed from the list
    cy.get('.client-item').should('not.exist');
});
