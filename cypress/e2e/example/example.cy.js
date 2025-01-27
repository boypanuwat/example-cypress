const mainPageKeyword = require('../../support/keyword/login')
const loginLocator = require('../../fixtures/locator/login.json')
const userData = require('../../fixtures/data/user.json')
const pageLocator = require('../../fixtures/locator/page.json')

describe('example', function () {
    const url = Cypress.env("Url");
    it('case:1 กรณีเข้าสู่ระบบในฐานะ Admin', function () {
        cy.visit(url)
        mainPageKeyword.login("Admin", "admin123")
    });
    it('case:2 กรณีกรอกข้อมูล Username/Password ไม่ถูกต้อง', function () {
        cy.visit(url)
        cy.get(loginLocator.login.usernameTextBox).type("Admin")
        cy.get(loginLocator.login.passwordTextBox).type("admin1234")
        cy.get(loginLocator.login.loginButton).click()
        cy.checkElementText('.oxd-text.oxd-text--p.oxd-alert-content-text', 'Invalid credentials')

    });
    it('case:3 ตรวจสอบการเพิ่ม Employee สำเร็จในระบบ', function () {
        cy.visit(url)
        mainPageKeyword.login("Admin", "admin123")
        //เมนู PIM(Employee)
        cy.get("aside[class='oxd-sidepanel'] li:nth-child(2)").click()
        cy.wait(2000)
        cy.checkElementText(pageLocator.employee.titleEmployee, 'Employee Information')
        cy.get(pageLocator.employee.Addbtn).should('be.visible').click()
        cy.wait(2000)
        cy.checkElementText(pageLocator.addEmployee.titleAddEmployee, 'Add Employee')
        cy.get(pageLocator.addEmployee.firstName).type(userData.user.firstName)
        cy.get(pageLocator.addEmployee.middleName).type(userData.user.middleName)
        cy.get(pageLocator.addEmployee.lastName).type(userData.user.lastName)
        cy.get(pageLocator.addEmployee.saveBtn).click()
        cy.get('.oxd-text--toast-message').should('be.visible').and('contain', 'Successfully Saved'); // ตรวจสอบว่าข้อความคือ "Successfully Saved"
        cy.wait(5000)
        //กรอกข้อมูลเพิ่มเติม
        cy.checkElementText(pageLocator.employeeDetail.titleEmployeeDetail, 'Personal Details')
        cy.get(pageLocator.employeeDetail.nationality).click()
        cy.wait(1000)
        cy.get(pageLocator.employeeDetail.nationDropdown).scrollIntoView().contains('Thai').click()
        cy.wait(1000)
        cy.get(pageLocator.employeeDetail.status).click()
        cy.get(pageLocator.employeeDetail.statusDropdown).scrollIntoView().contains('Single').click()
        cy.get(pageLocator.employeeDetail.birthday).type("1996-01-01")
        cy.get(pageLocator.employeeDetail.maleGender).click()
        cy.get(pageLocator.employeeDetail.saveBtn).click()
        cy.get('.oxd-text--toast-message').should('be.visible').and('contain', 'Successfully Updated'); // ตรวจสอบว่าข้อความคือ "Successfully Updated"
        cy.wait(3000)
    });
    it('case:4 ตรวจสอบการค้นหา Employee ใน Employee List', function () {
        cy.visit(url)
        mainPageKeyword.login("Admin", "admin123")
        //เมนู PIM(Employee)
        cy.get("aside[class='oxd-sidepanel'] li:nth-child(2)").click()
        cy.wait(2000)
        cy.checkElementText(pageLocator.employee.titleEmployee, 'Employee Information')
        cy.get(pageLocator.employee.field).should('be.visible')
        cy.get(pageLocator.employee.searchBox).type(userData.user.firstName)
        cy.wait(2000)
        cy.get(pageLocator.employee.searchBtn).click()
        cy.wait(2000)
        cy.checkElementText(pageLocator.employee.result, userData.user.firstName+' '+userData.user.middleName)
    });
    it('case:5 ตรวจสอบการลบ Employee ออกจากระบบ', function () {
        cy.visit(url)
        mainPageKeyword.login("Admin", "admin123")
        //เมนู PIM(Employee)
        cy.get("aside[class='oxd-sidepanel'] li:nth-child(2)").click()
        cy.wait(2000)
        cy.checkElementText(pageLocator.employee.titleEmployee, 'Employee Information')
        cy.get(pageLocator.employee.field).should('be.visible')
        cy.get(pageLocator.employee.searchBox).type(userData.user.firstName)
        cy.wait(2000)
        cy.get(pageLocator.employee.searchBtn).click()
        cy.wait(2000)
        cy.checkElementText(pageLocator.employee.result, userData.user.firstName+' '+userData.user.middleName)
        cy.get(pageLocator.employee.checkAll).click()
        cy.get(pageLocator.employee.deleteBtn)
        .should('be.visible').and('contain', ' Delete Selected ').click().wait(2000)
        cy.checkElementText(pageLocator.employee.titlePopupDelete,"Are you Sure?")
        cy.checkElementText(pageLocator.employee.bodyPopupDelete,"The selected record will be permanently deleted. Are you sure you want to continue?")
        cy.get(pageLocator.employee.confirmDeleteBtn)
        .should('be.visible').and('contain', ' Yes, Delete ').click()
        cy.get('.oxd-text--toast-message').should('be.visible').and('contain', 'Successfully Deleted'); // ตรวจสอบว่าข้อความคือ "Successfully Deleted"
        cy.wait(3000)
    });
})