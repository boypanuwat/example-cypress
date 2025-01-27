const mainPageKeyword = require('../../support/keyword/login')
const loginLocator = require('../../fixtures/login.json')

describe('example', function () {
    const url = Cypress.env("Url");
    it('login', function () {
        cy.visit(url)
        mainPageKeyword.login("Admin", "admin123")
    });
    //สร้างเคส invalid login
    it('invalid login', function () {
        cy.visit(url)
        cy.get(loginLocator.login.usernameTextBox).type("Admin")
        cy.get(loginLocator.login.passwordTextBox).type("admin1234")
        cy.get(loginLocator.login.loginButton).click()
        cy.checkElementText('.oxd-text.oxd-text--p.oxd-alert-content-text', 'Invalid credentials')

    });
    it('add user', function () {
        cy.visit(url)
        mainPageKeyword.login("Admin", "admin123")
        cy.get("aside[class='oxd-sidepanel'] li:nth-child(1)").click()
        cy.wait(5000)
    });
})