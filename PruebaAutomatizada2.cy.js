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
      for (let ciclo = 1; ciclo <= 12; ciclo++) {
      

        cy.wait(2500);
        let VarRaiz;
        let VarBotones;

        cy.get('form button').its('length').then(totalDeBotones => {
          // 'totalDeBotones' ahora contiene la cantidad de botones
          VarBotones = totalDeBotones;
          cy.log(`Total de botones: ${VarBotones}`);

          // Calcular la raíz cuadrada
          VarRaiz = Math.sqrt(VarBotones);
          cy.log(`Raíz cuadrada del total de botones: ${VarRaiz}`);
        

        cy.get('.bg-white.rounded-md.p-3.shadow-md.w-1\\/2.space-y-4').as('miElemento');
        cy.get('@miElemento').should('exist').should('be.visible').wait(2000);
        cy.get('@miElemento').then((divElement) => {
          const coordenadasText = divElement.find('.text-xl.font-bold').text();
          const coordenadas = coordenadasText.match(/\((-?\d+),(-?\d+)\)/g).map(coordenada => {
            const [x, y] = coordenada.match(/-?\d+/g);
            return { x: parseInt(x), y: parseInt(y) };
          });

          const resultadoFinal = coordenadas.reduce((resultado, coordenada) => {
            resultado.x += coordenada.x;
            resultado.y += coordenada.y;
            return resultado;
          }, { x: 0, y: 0 });

          if (resultadoFinal) {
            const yCoord = resultadoFinal.y;
            const xCoord = resultadoFinal.x;
            const indiceBoton = yCoord * VarRaiz + xCoord;

            sumarColumna(xCoord, () => {
              cy.get('form button').eq(indiceBoton).click();
            });
          } else {
            cy.log('Las coordenadas no son válidas.');
          }
        });

        function sumarColumna(columna, callback) {
          let suma = 0;

          cy.wrap([...Array(VarRaiz).keys()]).each((_, fila) => {
            const indice = fila * VarRaiz + columna;
            cy.get('form button').eq(indice).invoke('text').then((textoBoton) => {
              const valorBoton = parseInt(textoBoton.trim());
              cy.log(`Valor del botón en fila ${fila + 1}: ${valorBoton}`);
              suma += valorBoton;
            });
          }).then(() => {
            cy.log(`La suma de la columna ${columna} es: ${suma}`).wait(2500);
            callback();
            cy.get('input.rounded-md').type(suma).wait(2500);
          });

          cy.get('.space-y-10 > .mx-auto').click().wait(2500);
          cy.reload(false);
          }
        });}
      });
    });
}

// Desarrollado por Jose Ramirez Cerda 17/11/2023 con fines academicos

