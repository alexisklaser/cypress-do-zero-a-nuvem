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

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (nome, sobrenome, email, texto) => {

  // Preenche os campos obrigatórios
 cy.get('#firstName').type(nome)
   .get('#lastName').type(sobrenome)
   .get('#email').type(email)
   .get('#open-text-area').type(texto)

    // Clica no botão de submit
   .get('.button').click()

    // Verifica se a mensagem de sucesso está visível
    .get('.success').should('be.visible');
});

Cypress.Commands.add('IncluirCidade', (descricao) => {
  cy.get('#btnIncluir > .fa').click();
  cy.get('#Descricao').click();
  cy.get('#Descricao').type(descricao);
  cy.get('#btnSalvar').click();
});