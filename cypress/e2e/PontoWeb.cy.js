describe('Tela de Login do Sistema', () => {

  beforeEach(() => {
    cy.visit('localhost:17095');
    cy.get('#entrar').click();
  });

  it('Valida login inválido', () => {
    cy.get('#Email').type('programacao3@secullum.com.br');
    cy.get('#Senha').type('1234');
    cy.get('#login').click();
  
    cy.get('.validation-summary-errors')
      .should('contain.text', 'Email ou Senha inseridos estão incorretos.');
  });

  it('Valida login válido', () => {
    cy.get('#Email').type('programacao3@secullum.com.br')
      .get('#Senha').type('123');
    cy.get('#login').click();

    cy.title().should('eq', 'Página Inicial - Secullum Ponto Web');
  });
  
});

describe('Validar vários', () => {

  beforeEach(() => {
    cy.visit('http://localhost:17095/');
    cy.get('#entrar').click();
    cy.get('#Email').type('programacao3@secullum.com.br');
    cy.get('#Senha').type('123');
    cy.get('#login').click();
  });

  it('Abrir Calculadora', () => {
    cy.get('#calculadora').click();
    cy.get('#1').click()
      .get('#2').click()
      .get('#3').click();
    cy.get('#btnFecharDraggablePanel').click();
  });

  it('Abrir Cadastro de Funcionário Sem LGPD', () => {
    cy.get('#cadastros').click().get('#funcionarios').click();
    cy.get('#btnIncluir').click();
    cy.get('.aviso-incluir-legislacao-brasileira-titulo')
      .should('contain.text', 'Atenção');
    cy.get('.aviso-incluir-legislacao-brasileira > p')
      .should('contain.text', 'Para incluir funcionários, o seu usuário precisa ter permissão para visualizar os dados protegidos pela LGPD');
  });

});
