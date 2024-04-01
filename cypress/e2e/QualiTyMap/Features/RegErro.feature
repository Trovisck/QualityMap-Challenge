Funcionalidade: Registro com Erro
    Como um usuário não registrado
    Eu quero ver mensagens de erro ao tentar me registrar
    Para que eu possa corrigir os problemas e completar o registro com sucesso

Cenário: Exibir mensagens de erro ao tentar registrar com campos obrigatórios em branco
    Dado que estou na página de registro
    Quando eu clico no botão "Registrar"
    E eu submeto o formulário de registro sem preencher campos obrigatórios
    Então eu devo ver mensagens de erro indicando que os campos obrigatórios estão em branco
