  
  Cypress._.times(10 , () => { //executa o teste N vezes, conforme definido
    it('Testa a página de políticas de forma independente', () => {
      cy.visit('./src/privacy.html')
      cy.get('#title').contains('CAC TAT - Política de Privacidade')
        .get('#white-background').contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT. Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real. No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.')
        .get('#white-background > :nth-child(5)').contains('Talking About Testing')
    })
  })
