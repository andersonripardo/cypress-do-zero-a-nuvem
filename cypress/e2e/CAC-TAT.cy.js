describe('Central de Atendimento ao cliente TAT', () => {
          //Antes de tudo executar
  beforeEach (() => {
    cy.visit('./src/index.html')
  })
     // Cenário de teste 0 - verificar o título da aplicação
it('verificar titulo do app', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
})
    // Cenário de teste 1 - preencher os campos obrigatórios e enviar o formulário
it('Preencher os campos obrigatórios e enviar o formulário', () => {
    cy.get('#firstName').type('Anderson')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('anderson@gmail.com')
    cy.get('#open-text-area').type('Teste, teste, TESTE, TESTE, teste. TESteeste', {delay: 0})
    cy.contains('button', 'Enviar').click()
      // Validação - Verificar se a mensagem de sucesso está visível
    cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.')
})
it('Exibe mensagem de erro com um email inválida', () => {
    cy.get('#firstName').type('Anderson')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('anderson@gmail,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
      // Validação - Verificar se a mensagem de erro está visível
    cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
}) 
it('Campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone').type('abcdefghij').should('have.value', '')
})

it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Anderson')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('anderson@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()
      // Validação - Verificar se a mensagem de erro está visível
    cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!') 
    })

it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Anderson').should('have.value', 'Anderson').clear().should('have.value', '')
    cy.get('#lastName').type('Silva').should('have.value', 'Silva').clear().should('have.value', '')
    cy.get('#email').type('anderson@gmail.com').should('have.value', 'anderson@gmail.com').clear().should('have.value', '')
    cy.get('#phone').type('1234567890').should('have.value', '1234567890').clear().should('have.value', '')
})
it('Exibe mensagem de erro sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
      // Validação - Verificar se a mensagem de erro está visível
    cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
})

  it('Envia o formulário com sucesso usando um comando customizado', () => {
    cy.preencherCamposEEnviar()
    cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.')
  })

  it(`Selecione os valores de data`, () => {
    cy.preencherCamposEEnviar()
    cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.')
  })
  it('Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })
  it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })
  it('Seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })
  it('Marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="ajuda"]').check().should('have.value', 'ajuda') // alterado pra ajuda para entender o teste
  })
  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').should('have.length', 3).each((listaRadio) => {
      cy.wrap(listaRadio).check()
      cy.wrap(listaRadio).should('be.checked')
    })
  })
  it('Marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
  })

  it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json').should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })
  it('Seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }).should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })
  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]').selectFile('@sampleFile').should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade').should('have.attr','href', 'privacy.html').and('have.attr', 'target', '_blank')
  })
  it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')
  })
  
}) // Fechamento do describe