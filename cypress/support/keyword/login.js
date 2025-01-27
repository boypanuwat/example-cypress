const loginLocator = require('../../fixtures/login.json')


export function login(username, password) {
    cy.get(loginLocator.login.usernameTextBox).type(username)
    cy.get(loginLocator.login.passwordTextBox).type(password)
    cy.get(loginLocator.login.loginButton).click()

    const titleText = "[class='oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module']"
    cy.wait(1000).get(titleText).should('be.visible').then((ele) => {
        expect(ele.text()).to.equal('Dashboard')
    })
}
