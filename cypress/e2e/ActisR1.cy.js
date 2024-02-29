import * as math from 'mathjs';

const { jsonGet, RunTimeExeption } = require('../support/utils/utils.js');
/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})


for (let i = 0; i < 1; i++) {
  // dependiendo de cuantas veces queremos iterar se podra generar automaticamente el proceso y solo necesita cambiar los textos para que automaticamente los datos se modifiquen
  describe(`Ciclo de pruebas - Iteración ${i + 10}`, () => {
    it('ingreso web. URL https://tasks.evalartapp.com/automatization/', () => {
      cy.log('**')
      cy.visit({
        url: jsonGet('url'),
        method: 'GET'
      })
      // 2. ingresar usuario Nota: Generalmetne usamos utils para poder hacer los proyectos escalables, aplicando JsonGet
      cy.get('[typer="text"]').type(jsonGet('user', { delay: 50 })).wait(1000)
      // 3. ingresar contraseña
      cy.get('[type="password"]').type(jsonGet('pass', { delay: 50 })).wait(1000)
      // 4. hacer click submit
      cy.get('[type="submit"]').click()
      for (let ciclo = 1; ciclo <= 10; ciclo++) {

        // Autocompletado de Primera Parte del texto segun cantidad de tipo y cantidad
        // 5. capturamos el texto completo
        cy.get('.p-4 > .text-center').invoke('text').then((TextoParteUno) => {
          //  capturamos todo el texto
          const match = TextoParteUno.match(/(\d+)/);
          cy.log("el texto es el siguiente:", TextoParteUno);
          // capturamos el numero desde el texto
          const numero = parseInt(match[0], 10);
          // imprimir
          cy.log(`Número: ${numero}`);
          // capturamos la letra dentro de ""
          const match2 = TextoParteUno.match(/"([^"]+)"/);
          const letra = match2[1];
          // imprimir
          cy.log(`Letra: ${letra}`);
          // por medio de variables numero = cantidad y letra  se generara el siguiente type
          cy.get('.p-4 > .border-2').then(($input) => {
            const texto = letra.repeat(numero);
            cy.wrap($input).type(texto);
          });
        });
        // Selector automatico segun texto numerico en select
        cy.get('.space-y-4 > .font-bold').invoke('text').then((operacionMatematica) => {
          const resultado = math.evaluate(operacionMatematica);
          const resultado1 = resultado.entries[0].toString().replace(/\[|\]/g, '');
          cy.get('select[name="select"]').select(resultado1.toString());
        });
        // Selector automatico segun texto numerico en select
        cy.get(':nth-child(3) > .font-bold').invoke('text').then((operacionMatematica1) => {
          const operacionMatematica2 = operacionMatematica1.replace('=?', '');
          const resultado2 = math.evaluate(operacionMatematica2);
          cy.log('ResultadoRescatado', resultado2);
          cy.get('label').contains(resultado2).click();
        });
        // extraer numero del texto que indica al cual deben pertenecer esos multiplos
        cy.get(':nth-child(4) > .text-center').invoke('text').then((ObtenerTexto) => {
          // cy.log('Texto es:', ObtenerTexto);
          const numero = parseInt(ObtenerTexto.match(/\d+/)[0], 10);
          // cy.log('el numero es:', numero);

          // generar multiplos 
          const cantidadDeMultiplos = 99;
          const multiplosDeNumeroBase = [];

          for (let i = 1; i <= cantidadDeMultiplos; i++) {
            const multiplo = numero * i;
            multiplosDeNumeroBase.push(multiplo);
          }
          //  iteramos checkboxes
          cy.get('input[name="checkbox"]').each(($checkbox) => {
          // extraigo valor numerico
          const valorCheckbox = parseInt($checkbox.val(), 10);
          // Verificar si el valor esta en mi arreglo multiplosDeNumeroBase donde almaceno mis multiplos en base al texto
          if (multiplosDeNumeroBase.includes(valorCheckbox)) {
          cy.wrap($checkbox).check();
      }
    });
          cy.get(':nth-child(2) > .border-black').click()
        });
        // corto el load en caso de reload
        cy.reload(false);
      }
    });
  });
}

// Desarrollado por Jose Ramirez Cerda 17/11/2023 con fines academicos

