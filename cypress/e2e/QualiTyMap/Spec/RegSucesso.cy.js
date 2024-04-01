describe('Teste de Registro válido', () => {
  // Data de nascimento pré-definida
  const dataNascimento = {
    dia: '15',
    mes: '5',
    ano: '1990'
  };

  beforeEach(() => {
    // Visita a página de registro antes de cada teste
    cy.visitarPagina();
  });

  it('Deve permitir que o usuário se registre com sucesso', () => {
    // Clique no botão "Register"
    cy.contains('Register').click();

    // Preenche o formulário de registro com informações
    cy.preencherFormularioRegistro({
      firstName: 'John', // Primeiro nome
      lastName: 'Rick', // Sobrenome
      email: 'john.rick@gmail.com', // E-mail
      password: '123456789' // Senha
    });

    // Seleciona a data de nascimento
    cy.selecionarDataNascimento(dataNascimento.dia, dataNascimento.mes, dataNascimento.ano);

    // Verifica se a data de nascimento selecionada corresponde à data pré-definida
    cy.verificarDataNascimento(dataNascimento);

    // Submete o formulário de registro
    cy.submeterRegistro();

    // Verifica se o registro foi concluído com sucesso
    // cy.contains('Your registration completed').should('exist'); 
  });

  // Lógica de limpeza de dados após cada teste
  afterEach(() => {
    // Implemente a lógica de limpeza de dados, se necessário
  });
});
