describe('rendering app first time', () => {
  it('should render the login view at the root URL', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
  });

  it('should render the login component', () => {
    cy.get('#loginContainer');
  });
});