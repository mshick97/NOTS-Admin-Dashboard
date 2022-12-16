describe('customer table functionality', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('__session');
  });

  const loginCreds = {
    email: 'maxwellshick@gmail.com',
    password: 'maxwell123',
  };

  it('should log the user in and visit the orders page first', () => {
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

  it('should render the customer table', () => {
    cy.get('#customersButton').click();
    cy.url({ timeout: 15000 }).should('include', '/customers');
  });

  it('should be able to refetch the customers table manually', () => {
    cy.getCookie('__session', { timeout: 15000 }).should('exist');
    cy.intercept('GET', '/api/users').as('getUsers');
    cy.get('#refreshButton').click();

    cy.wait('@getUsers').should(({ request, response }) => {
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

  const userEmailTest = 'hello';

  it('should search for a user from any part of an email', () => {
    cy.intercept('POST', '/api/users/find_user').as('findUser');
    cy.get('input[name=searchUser]').type(userEmailTest);

    cy.wait(1000); // have to wait for the debounce function to timeout to allow the POST request
    cy.get('@findUser').should(({ request, response }) => {
      // request tests
      expect(request.headers).to.have.property('authorization');
      expect(request.headers).to.have.property('cookie');
      expect(request.headers.cookie).to.include('__session=');
      expect(request.body).to.have.property('email');

      // response tests
      expect(response.statusCode).to.be.oneOf([200, 304]);
      expect(response).to.have.property('body');
      expect(response.body).to.have.property('foundUser');

      if (response.statusCode === 304) {
        expect(response.statusMessage === 'Not Modified');
      }

      if (response.body.foundUser.length > 0) {
        expect(response.body.foundUser[0]).to.have.property('id');
        expect(response.body.foundUser[0]).to.have.property('city');
        expect(response.body.foundUser[0]).to.have.property('email');
        expect(response.body.foundUser[0]).to.have.property('full_name');
        expect(response.body.foundUser[0]).to.have.property('state');
        expect(response.body.foundUser[0]).to.have.property('street_1');
        expect(response.body.foundUser[0]).to.have.property('street_2');
        expect(response.body.foundUser[0]).to.have.property('zip');
      }

      if (response.body.foundUser.length === 0) {
        expect(response.statusCode).should('eq', 200);
      }
    });
  });

  it('should return user to login view if visiting a url manually for now', () => {
    cy.visit('/customers');
    cy.url({ timeout: 15000 }).should('include', '/login');
  });
});
