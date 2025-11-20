Cypress.Commands.add('preencherCamposEEnviar', (data = {
      firstName: 'Maisa',
      lastName: 'America',
      email: 'mariaamarica@teste.com',
      longText: 'Teste usando data'
    }) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.longText)
    cy.contains('button', 'Enviar').click()
})