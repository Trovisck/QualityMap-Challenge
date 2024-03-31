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
Cypress.Commands.add('visitarPagina', () => {
    cy.visit('https://demo.nopcommerce.com/');
  });
  //Prencher o registro
Cypress.Commands.add('preencherFormularioRegistro', ({ firstName, lastName, email, password }) => {
    cy.get('#gender-male').click();
    cy.get('#FirstName').type(firstName);
    cy.get('#LastName').type(lastName);
    cy.get('#Email').type(email);
    cy.get('#Password').type(password);
    cy.get('#ConfirmPassword').type(password);
  });
  //Selecionar data de nascimento
  Cypress.Commands.add('selecionarDataNascimento', (dia, mes, ano) => {
    cy.get('[name="DateOfBirthDay"]').select(dia);
    cy.get('[name="DateOfBirthMonth"]').select(mes);
    cy.get('[name="DateOfBirthYear"]').select(ano);
  });
  //Enviar o registro
  Cypress.Commands.add('submeterRegistro', () => {
    cy.get('#register-button').click();
  });
  //conferir a data de nascimento
  Cypress.Commands.add('verificarDataNascimento', (dataNascimento) => {
    // Verificar o dia de nascimento
    cy.get('[name="DateOfBirthDay"]').should('have.value', dataNascimento.dia);
  
    // Verificar o mês de nascimento
    cy.get('[name="DateOfBirthMonth"]').should('have.value', dataNascimento.mes);
  
    // Verificar o ano de nascimento
    cy.get('[name="DateOfBirthYear"]').should('have.value', dataNascimento.ano);
  });
// Parte API
