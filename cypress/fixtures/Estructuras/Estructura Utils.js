const { jsonGet, RunTimeExeption } = require('../support/utils/utils.js');
/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})


describe('', () => {
  it('', () => {

    // Ingresar a la URL https://cnormativofront-dev.azurewebsites.net/minisitio/ 
    cy.log('**Ingresar a la URL https://cnormativofront-dev.azurewebsites.net/minisitio/**')
    cy.visit({
      url: jsonGet('url'),
      method: 'GET'
    })

    // Registrar Username del Usuario
    cy.log('**Registrar Username del Usuario**')
    cy.get('[id="username"]').type(jsonGet('user',{delay:50})).wait(1000)

    // Registrar Password
    cy.log('**Registrar Password**')
    cy.get('[id="password"]').type(jsonGet('pass',{delay:50})).wait(1000)

    // Presionar botón Log In
    cy.log('**Presionar botón Log In**')
    cy.get('[id="kc-login"]').click()
  });
})