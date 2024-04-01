describe('Teste de Mensagens de Erro', () => {
    beforeEach(() => {
      // Visita a página de registro antes de cada teste
      cy.visitarPagina();
    });
  
    it('Deve exibir mensagens de erro ao tentar registrar com campos obrigatórios em branco', () => {
      // Clique no botão "Register"
      cy.contains('Register').click();
  
      // Submete o formulário de registro sem preencher campos obrigatórios
      cy.submeterRegistro();
  
      // Verifica se há mensagens de erro visíveis nos campos específicos
      cy.get('#FirstName-error').should('contain.text', 'First name is required');
      cy.get('#LastName-error').should('contain.text', 'Last name is required');
      cy.get('#Email-error').should('contain.text', 'Email is required');
      cy.get('#Password-error').should('contain.text', 'Password is required');
      cy.get('#ConfirmPassword-error').should('contain.text', 'Password is required');
    });
  
    // Lógica de limpeza de dados após cada teste
    afterEach(() => {
      // Implemente a lógica de limpeza de dados, se necessário
    });
  });
  