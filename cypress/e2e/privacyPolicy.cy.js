Cypress._.times(3, () => {
  it('testa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.visit('./src/privacy.html')
      cy.contains('h1' , 'CAC TAT - Política de Privacidade').should('be.visible')
    })
})