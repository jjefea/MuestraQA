// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-iframe';
import 'cypress-file-upload';

Cypress.Commands.add("uploadFile", (selector, fileUrl, type = "") => {

    return cy.get(selector).then(subject => {

        return cy

            .fixture(fileUrl, "base64")

            .then(Cypress.Blob.base64StringToBlob)

            .then(blob => {

                return cy.window().then(win => {

                    const el = subject[0];

                    const nameSegments = fileUrl.split("/");

                    const name = nameSegments[nameSegments.length - 1];

                    const testFile = new win.File([blob], name, { type });

                    const dataTransfer = new DataTransfer();

                    dataTransfer.items.add(testFile);

                    el.files = dataTransfer.files;

                    return cy.wrap(subject).trigger('change', { force: true });

                });

            });

    });

});

let cookies = {};
let active;
Cypress.Commands.add('updateCookies', (cookie_stack) => {
    if (active == undefined && cookie_stack == undefined) {
        throw 'active y cookie_stack, undefined, no se puede actualizar cookies';
    }

    let nombre = cookie_stack || active;

    if (cookies === undefined || Object.keys(cookies).length == 0) {
        throw 'Array de cookies vacío'
    } else {
        // anterior set de cookies
        for (const [key, value] of Object.entries(cookies[nombre])) {
            // console.log(value.domain+' || '+value.path);
            cy.setCookie(value.name, value.value, {
                domain: value.domain,
                expiry: value.expiry,
                httpOnly: value.httpOnly,
                path: value.path,
                secure: value.secure,
                sameSite: value.sameSite
            });
        }

        // nuevo set de cookies
        cy.getCookies().then((arr) => {
            arr.forEach((c) => {
                cookies[nombre][c.name] = c;
            })
        })
    }
});

Cypress.Commands.add('page_snapshot', (last_url, cookie_stack) => {
    if (active != undefined && !(typeof cookie_stack === 'string')) throw 'No existe una pagina activa';

    let set = cookie_stack || active;
    let url = last_url || "obten la ultima url...";

    if (!cookies[set]) throw 'El set de cookies (' + set + ') no existe';
    cookies[set]['url_path'] = url;
})

Cypress.Commands.add('add_getCookies_func', (cookie_stack) => {
    if (cookie_stack === undefined) throw 'debe darle un nombre al set de cookies';
    if (!(typeof cookie_stack === 'string')) throw 'debe ingresar un string como nombre para el set de cookies';

    cookies[cookie_stack] = {};
    cy.getCookies().then((arr) => {
        arr.forEach((e) => {
            cookies[cookie_stack][e.name] = e;
        })
    })

    active = cookie_stack;
})

Cypress.Commands.add('addCookie', (cookie_stack, e) => {
    if (cookie_stack == undefined) throw 'debe ingresar el set de cookies al que pertenece la cookie';
    if (!(typeof cookie_stack === 'string')) throw 'el nombre del set de cookies para esta cookie debe ser un String';

    // cookies.push(e);
})