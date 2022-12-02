describe('login functionality', () => {
  const loginCreds = {
    email: 'maxwellshick@gmail.com',
    password: 'maxwell123',
  };

  it('should allow users to input a username and password', () => {
    cy.visit('/');

    cy.get('input[name=email]').type(loginCreds.email);
    cy.get('input[name=password]').type(loginCreds.password);
  });

  it('should submit the email and password + navigate to orders', () => {
    cy.get('#loginButton').click();

    cy.url({ timeout: 15000 }).should('include', '/orders');
    cy.get('#ordersContainer');
  });

  it('user should receive a session cookie on login', () => {
    cy.request('POST', 'http://localhost:3000/api/auth', loginCreds).as('login');
    cy.getCookie('__session', { timeout: 15000 }).should('exist');
  });
});
