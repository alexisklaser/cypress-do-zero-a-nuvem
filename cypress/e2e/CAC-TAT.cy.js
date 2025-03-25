describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    // Visita a página de login antes de cada teste
    cy.visit('src/index.html');
  });

  it('Verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
  });

  it('Informar campos obrigatórios', () => {
    cy.get('#firstName').type('Aléxis')
      .get('#lastName').type('Klaser')
      .get('#email').type('klaser403@gmail.com')
      .get('#open-text-area').type('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', { delay: 0 })
      .get('.button').click()
      .get('.success').should('be.visible');
  });

  it('Email com formato inválido', () => {
    cy.get('#firstName').type('Aléxis')
      .get('#lastName').type('Klaser')
      .get('#email').type('abc123')
      .get('#open-text-area').type('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', { delay: 0 })
      .get('.button').click();

    cy.get('.error')
      .invoke('text')
      .then((text) => text.trim())
      .should('eq', 'Valide os campos obrigatórios!');
  });

  it('Validar dígitos não numéricos no telefone', () => {
    cy.get('#phone')
      .type('abc')
      .should('have.value', '');
  });

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () => {
    cy.get('#firstName').type('Aléxis')
      .get('#lastName').type('Klaser')
      .get('#email').type('klaser403@gmail.com')
      .get('#open-text-area').type('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', { delay: 0 })
      .get('#phone-checkbox').check()
      .get('.button').click();

    cy.get('.error')
      .invoke('text')
      .then((text) => text.trim())
      .should('eq', 'Valide os campos obrigatórios!');
  });

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Aléxis')
      .should('have.value', 'Aléxis')
      .clear()
      .should('have.value', '');
    
    cy.get('#lastName')
      .type('Klaser')
      .should('have.value', 'Klaser')
      .clear()
      .should('have.value', '');
    
    cy.get('#email')
      .type('klaser403@gmail.com')
      .should('have.value', 'klaser403@gmail.com')
      .clear()
      .should('have.value', '');
    
    cy.get('#phone')
      .type('5199999999')
      .should('have.value', '5199999999')
      .clear()
      .should('have.value', '');
  });

  it('Não informar campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click();

    cy.get('.error')
      .invoke('text')
      .then((text) => text.trim())
      .should('eq', 'Valide os campos obrigatórios!');
  });

  it('Envia o formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit('Aléxis', 'Klaser', 'klaser403@gmail.com', 'Este é só um teste.');
    cy.fillMandatoryFieldsAndSubmit('Carla', 'Klaser', 'ckkieling8@gmail.com', 'Este é só um teste.');
  });

  it('Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube');
  });

  it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria');
  });

  it('Seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog');
  });

  it('Marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked');
  });

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each(($radio) => {
      cy.wrap($radio)
        .check()
        .should('be.checked');
    });
  });

  it('Marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked');
  });

  it('Seleciona um arquivo da pasta fixtures e valida se o nome é example.json', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should('have.prop', 'files')
      .then((files) => {
        expect(files[0].name).to.equal('example.json');
      });
  });

  it('Seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should('have.prop', 'files')
      .then((files) => {
        expect(files[0].name).to.equal('example.json');
      });
  });

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      // Carrega o arquivo da pasta fixtures e cria um alias
    cy.fixture('example.json').as('arquivo');
  
      // Interage com o input de upload para selecionar o arquivo
    cy.get('input[type="file"]')
      .selectFile({
        contents: '@arquivo',
        fileName: 'example.json',
        mimeType: 'application/json',
        })
      .then(($input) => {
          // Verifica o nome do arquivo no objeto `files` do input
        const file = $input[0].files[0];
        expect(file.name).to.equal('example.json');
        });
    });

   it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
     cy.contains('a', 'Política de Privacidade')
       .should('have.attr', 'href', 'privacy.html') // verifica se de fato tem o atributo href="privacy.html"
       .and('have.attr','target', '_blank') // verifica se de fato possui o atributo target = "_blank"
    });

   it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => { 
     cy.contains('a', 'Política de Privacidade')
       .invoke('removeAttr', 'target') //remove o atributo target para que a página não seja aberta em outra guia
       .click()
     cy.get('#title').contains('CAC TAT - Política de Privacidade')
     cy.go('back'); //volta para a página original
    });
  });
  
