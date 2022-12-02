describe('login functionality', () => {
  it('should render the login view at the root URL', () => {
    cy.visit('/', { timeout: 10000 }).on('uncaught:exception', (err, runnable, promise) => {
      if (promise) {
        console.log(err);
        return false;
      }
    });
    cy.url().should('include', '/login');
  });

  it('should render the login component', () => {
    cy.get('#loginContainer');
  });

  const loginCreds = {
    email: 'maxwellshick@gmail.com',
    password: 'maxwell123',
  };

  it('should allow users to input a username and password', () => {
    cy.visit('/').on('uncaught:exception', (err, runnable, promise) => {
      if (promise) {
        console.log(err);
        return false;
      }
    });

    cy.get('input[name=email]').type(loginCreds.email);
    cy.get('input[name=password]').type(loginCreds.password);
  });

  it('should submit the email and password + navigate to orders', () => {
    cy.get('#loginButton')
      .click()
      .on('uncaught:exception', (err, runnable, promise) => {
        if (promise) {
          console.log(err);
          return false;
        }
      });

    cy.url({ timeout: 15000 }).should('include', '/orders');
    cy.get('#ordersContainer');
  });

  it('user should receive a session cookie on login', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/auth',
      body: loginCreds,
    }).on('uncaught:exception', (err, runnable, promise) => {
      if (promise) {
        console.log(err);
        return false;
      }
    });
    cy.getCookie('__session', { timeout: 15000 }).should('exist');
  });
});
