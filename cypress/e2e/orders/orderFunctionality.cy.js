describe('order functionality', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('__session');
  });

  const loginCreds = {
    email: 'maxwellshick@gmail.com',
    password: 'maxwell123',
  };

  it('should log the user in and visit the orders page', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      cy.log(err);
      return false;
    });

    cy.visit('/', { failOnStatusCode: false, timeout: 10000 });
    cy.url().should('include', '/login');

    cy.get('#loginContainer');

    cy.get('input[name=email]').type(loginCreds.email);
    cy.get('input[name=password]').type(loginCreds.password);

    cy.get('#loginButton').click();

    cy.url({ timeout: 15000 }).should('include', '/orders');
    cy.get('#ordersContainer');
  });

  it('should manually refetch the table of orders', () => {
    cy.getCookie('__session', { timeout: 15000 }).should('exist');
    cy.intercept('GET', '/api/order_info').as('getOrders');
    cy.get('#refreshButton').click();

    cy.wait('@getOrders').should(({ request, response }) => {
      // request tests
      expect(request.headers).to.have.property('authorization');
      expect(request.headers).to.have.property('cookie');
      expect(request.headers.cookie).to.include('__session=');

      // response tests
      /* the 304 status code can be returned because:
      "...the client, which made the request conditional, already has a valid representation (of data in this case); the server is therefore redirecting the client to make use of that stored representation as if it were the payload of a 200 (OK) response."
      */
      expect(response.statusCode).to.be.oneOf([200, 304]);
      expect(response).to.have.property('body');

      if (response.statusCode === 304) {
        expect(response.statusMessage === 'Not Modified');
      }

      if (response.statusCode === 200) {
        expect(response.body).to.be.greaterThan(0);
      }
    });
  });

  it('should navigate to a specific customer order and show order details', () => {
    cy.get('.entryContainer').first().click();
    cy.get('#orderDetails', { timeout: 15000 });
  });

  it('should be able to redirect to orders page without sending a GET request', () => {
    cy.get('.goBackButton').click();
    cy.url({ timeout: 15000 }).should('include', '/orders');
    cy.get('#ordersContainer');

    cy.intercept('GET', '/api/order_info').as('getOrders');
    cy.get('@getOrders').then((interception) => {
      expect(interception, 'GET /api/order_info').to.not.exist;
    });
  });

  it('should return user to login view if visiting a url manually for now', () => {
    cy.visit('/orders');
    cy.url({ timeout: 15000 }).should('include', '/login');
  });
});
