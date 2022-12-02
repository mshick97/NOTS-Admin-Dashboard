describe('login functionality', () => {
  it('should render the login view at the root URL', () => {
    cy.on('uncaught:exception', (err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });

    cy.on('fail', (error, runnable) => {
      throw error;
    });

    cy.visit('/', { timeout: 10000 });
    cy.url().should('include', '/login');
  });

  it('should render the login component', () => {
    cy.on('fail', (error, runnable) => {
      throw error;
    });

    cy.get('#loginContainer');
  });

  const loginCreds = {
    email: 'maxwellshick@gmail.com',
    password: 'maxwell123',
  };

  it('should allow users to input a username and password', () => {
    cy.on('uncaught:exception', (err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });

    cy.on('fail', (error, runnable) => {
      throw error;
    });

    cy.visit('/');

    cy.get('input[name=email]').type(loginCreds.email);
    cy.get('input[name=password]').type(loginCreds.password);
  });

  it('should submit the email and password + navigate to orders', () => {
    cy.on('uncaught:exception', (err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });

    cy.on('fail', (error, runnable) => {
      throw error;
    });

    cy.get('#loginButton').click();

    cy.url({ timeout: 15000 }).should('include', '/orders');
    cy.get('#ordersContainer');
  });

  it('user should receive a session cookie on login', () => {
    cy.on('uncaught:exception', (err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });

    cy.on('fail', (error, runnable) => {
      throw error;
    });

    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/auth',
      body: loginCreds,
    });
    cy.getCookie('__session', { timeout: 15000 }).should('exist');
  });
});
