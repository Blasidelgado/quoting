describe('template spec', () => {
  it('displays "Invalid credentials" for incorrect password', () => {
    cy.visit('http://localhost:3000/');
  
    // Enter correct username and incorrect password
    cy.get('#login-username').type('exampleUser');
    cy.get('#login-password').type('wrongpassword');
  
    // Click the submit button to log in
    cy.get('#login-submit').click();
  
    // Verify "Invalid credentials" message
    cy.contains('Invalid credentials').should('be.visible');
  });
  
  it('displays "Invalid credentials" for incorrect username', () => {
    cy.visit('http://localhost:3000/');
  
    // Enter incorrect username and correct password
    cy.get('#login-username').type('wronguser');
    cy.get('#login-password').type('1234567');
  
    // Click the submit button to log in
    cy.get('#login-submit').click();
  
    // Verify "Invalid credentials" message
    cy.contains('Invalid credentials').should('be.visible');
  });
  
  it('Displays "Invalid credentials" if bypasses required fields', () => {
    cy.visit('http://localhost:3000/');
  
    // Remove the 'required' attribute from inputs
    cy.get('#login-username').invoke('removeAttr', 'required');
    cy.get('#login-password').invoke('removeAttr', 'required');
  
    // Click the submit button to submit the form with empty fields
    cy.get('#login-submit').click();
  
    // Verify that the form submission is unsuccessful
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('successfully logs in with correct credentials', () => {
    cy.login();
    });

  it('successful login results in homepage redirect that has content', () => {
    cy.checkHomePage();
    });

  it('signed-in user can add clients at /client', () => {
    cy.addClient();
    });

  it('signed-in user can update clients at /client', () => {
    cy.updateClient();
    });

  it('signed-in user can delete clients at /client', () => {
    cy.deleteClient();
    });
  });
