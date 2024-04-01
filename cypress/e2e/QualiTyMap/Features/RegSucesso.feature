Funcionalidade: Registro Válido
    Como um usuário novo
    Eu quero me registrar no sistema
    Para que eu possa acessar os recursos disponíveis

Cenário: Permitir que o usuário se registre com sucesso
    Dado que estou na página de registro
    Quando eu clico no botão "Registrar"
    E preencho o formulário de registro com as seguintes informações:
      | Campo         | Valor               |
      | Primeiro nome | John                |
      | Sobrenome     | Rick                |
      | E-mail        | john.rick@gmail.com |
      | Senha         | 123456789           |
    E seleciono a data de nascimento como "15/5/1990"
    Então eu devo ser registrado com sucesso no sistema
