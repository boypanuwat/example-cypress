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

Cypress.Commands.add('requestGET', (path, headers) => {
    cy.request({
        method: 'GET',
        url: path,
        headers: headers,
        failOnStatusCode: false
    }).as('response').should(response => { })
    return cy.get("@response")
})

Cypress.Commands.add('requestPUT', (path, headers, body) => {
    cy.request({
        method: 'PUT',
        url: path,
        headers: headers,
        body: body,
        failOnStatusCode: false
    }).as('response').should(response => { })
    return cy.get('@response')
})

Cypress.Commands.add('requestPOST', (path, headers, body) => {
    cy.request({
        method: 'POST',
        url: path,
        headers: headers,
        body: body,
        failOnStatusCode: false
    }).as('response').should(response => { })
    return cy.get('@response')
})

Cypress.Commands.add('requestPATCH', (path, headers, body) => {
    cy.request({
        method: 'PATCH',
        url: path,
        headers: headers,
        body: body,
        failOnStatusCode: false
    }).as('response').should(response => { })
    return cy.get('@response')
})

Cypress.Commands.add('requestDELETE', (path, headers) => {
    cy.request({
        method: 'DELETE',
        url: path,
        headers: headers,
        failOnStatusCode: false
    }).as('response').should(response => { })
    return cy.get('@response')
})

Cypress.Commands.add("retryRequest", (callFunction) => {
    let retries = -1;
    function makeRequest() {
        retries++;
        return callFunction.then((resp) => {
            try {
                expect(resp.status).to.eq(200);
            } catch (err) {

                if (retries > 5) throw new Error(`retried too many times (${--retries})`)
                return makeRequest();
            }
            return cy.wrap(resp).as('resp')
        });
    }
    return makeRequest();
});

Cypress.Commands.add('checkElementText', (element, verifyText) => {
    let element_ = element
    cy.get(element_).should('be.visible').then((ele) => {
        expect(ele.text()).to.equal(verifyText)
    })
})
