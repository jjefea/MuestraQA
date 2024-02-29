const { jsonGet, RunTimeExeption } = require('../support/utils/utils.js');
/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

import * as math from 'mathjs';




for (let i = 0; i < 1; i++) {
  
  describe(`Ciclo de pruebas - Iteración ${i + 1}`, () => {
    it('ingreso web. URL https://tasks.evalartapp.com/automatization/', () => {
      cy.log('**')
      cy.visit({
        url: jsonGet('url'),
        method: 'GET'
      })
     // 2. ingresar usuario
     cy.get('[typer="text"]').type(jsonGet('user',{delay:50})).wait(1000)
     // 3. ingresar contraseña
     cy.get('[type="password"]').type(jsonGet('pass',{delay:50})).wait(1000)
     // 4. hacer click submit
     cy.get('[type="submit"]').click()
     // 4. autocompletar con s 150 veces
     const textoAleatorio = Array.from({ length:+ 150 }, () => 's').join('');
     cy.get('.p-4 > .border-2').type(textoAleatorio);
     // 5. select
    cy.get('select[name="select"]').invoke('text').then((operacionMatematica) => {
      const resultado = math.evaluate(operacionMatematica);
      cy.get('select[name="select"]').select(resultado.toString());

      
    //  cy.get('select[name="select"]').select('-26779186');
    //  //7 checkbox segun tengo entendido es 24707 pero el mas aproximado es 24607
    //  cy.get(':nth-child(3) > .grid > :nth-child(11) > input').click();
    //  //8  submit
    //  cy.get(':nth-child(2) > .border-black').click().wait(1000)
    
    //  // 4. autocompletar con s 150 veces
    //  const textoAleatorio2 = Array.from({ length:+ 355 }, () => 'f').join('');
    //  cy.get('.p-4 > .border-2').type(textoAleatorio2);
    //  // 5. select
    //  cy.get('select[name="select"]').select('248');
    //  //7   select 1817
    //  cy.get(':nth-child(3) > .grid > :nth-child(5) > input').click()
    //  //8  submit
    //  cy.get(':nth-child(2) > .border-black').click().wait(1000)


    
    //  // 4. autocompletar con s 150 veces
    //  const textoAleatorio3 = Array.from({ length:+ 477 }, () => 'j').join('');
    //  cy.get('.p-4 > .border-2').type(textoAleatorio3);
    //  // 5. select
    //  cy.get('select[name="select"]').select('-59104');
    //  //7   select 1817
    //  cy.get(':nth-child(3) > .grid > :nth-child(10) > input').click()

    //  cy.get(':nth-child(4) > .grid > :nth-child(2) > input').click()
    //  cy.get(':nth-child(4) > .grid > :nth-child(6) > input').click()
    //  cy.get(':nth-child(4) > .grid > :nth-child(7) > input').click()
    //  cy.get(':nth-child(4) > .grid > :nth-child(10) > input').click()
    //  cy.get(':nth-child(4) > .grid > :nth-child(11) > input').click()
    //  //8  submit
    //  cy.get(':nth-child(2) > .border-black').click().wait(1000)

    //  // 4. autocompletar con s 150 veces
    //  const textoAleatorio4 = Array.from({ length:+ 263 }, () => 'H').join('');
    //  cy.get('.p-4 > .border-2').type(textoAleatorio4);
    //  // 5. select
    //  cy.get('select[name="select"]').select('-59104');
    //  //7   select 1817
    //  cy.get(':nth-child(3) > .grid > :nth-child(10) > input').click()

    //  cy.get(':nth-child(4) > .grid > :nth-child(2) > input').click()
    //  cy.get(':nth-child(4) > .grid > :nth-child(6) > input').click()
    //  cy.get(':nth-child(4) > .grid > :nth-child(7) > input').click()
    //  cy.get(':nth-child(4) > .grid > :nth-child(10) > input').click()
    //  cy.get(':nth-child(4) > .grid > :nth-child(11) > input').click()
    //  //8  submit
    //  cy.get(':nth-child(2) > .border-black').click().wait(1000)








    });

  });
  });
}













