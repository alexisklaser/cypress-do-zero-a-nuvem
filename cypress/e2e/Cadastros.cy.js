describe('Cadastro de Cidades', () => {

  before(() => {
    cy.visit('http://localhost:17095/');
    cy.get('#entrar').click();
    cy.get('#Email').type('programacao3@secullum.com.br');
    cy.get('#Senha').type('123');
    cy.get('#login').click();
    cy.get('#cadastros > .menu-title').click();
    cy.get('#cidades').click();
  });

  after(() => {
    cy.get('.header > .fa').click();
    cy.get('tbody > tr > .checkbox > input').click();
    cy.get('#btnRemover').click();
    cy.get('#btnOk').click();
  });

  it('CadastrarAlterarCidade', () => {

    //Incluir a cidade via comando personalizado
    cy.IncluirCidade('Cadastro de Cidade com máximo caracteres informado');

    //Valida a cidade recém cadastrada
    cy.get('tbody > tr > :nth-child(2)').click();
    cy.get('#Descricao').should('have.value', 'Cadastro de Cidade com máximo caracteres informado');
    cy.get('#Id').invoke('val').should('not.be.empty');

    //Alterar a descrição da cidade
    cy.get('#Descricao').click();
    cy.get('#Descricao').clear();
    cy.get('#Descricao').type('Nova descrição da cidade informada');
    cy.get('#btnSalvar').click();

    //Valida a Descrição da cidade alterada
    cy.get('tbody > tr > :nth-child(2)').click();
    cy.get('#Descricao').should('have.value', 'Nova descrição da cidade informada');
    cy.get('#Id').invoke('val').should('not.be.empty');

    cy.get('#btnCancelar').click();

  });

});
