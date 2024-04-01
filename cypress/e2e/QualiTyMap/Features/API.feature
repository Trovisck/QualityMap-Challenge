Funcionalidade: Autenticação e Gerenciamento de Produtos na API

Cenário: Login na API
    Dado que tenho acesso à API de autenticação
    Quando envio uma solicitação POST para fazer login com credenciais válidas
    Então devo receber uma resposta com status 200
    E a resposta deve conter um token de autorização válido

Cenário: Criar um novo produto
    Dado que tenho acesso à API de produtos
    E estou autenticado com um token de autorização válido
    Quando envio uma solicitação POST para criar um novo produto
    Então devo receber uma resposta com status 201
    E a resposta deve conter uma mensagem de sucesso e o ID do produto
    E o novo produto deve ser adicionado ao banco de dados

Cenário: Buscar um produto pelo ID
    Dado que tenho acesso à API de produtos
    E existem produtos cadastrados no banco de dados
    Quando envio uma solicitação GET para buscar um produto pelo ID
    Então devo receber uma resposta com status 200
    E a resposta deve conter os detalhes do produto correspondente ao ID fornecido

Cenário: Atualizar o preço de um produto
    Dado que tenho acesso à API de produtos
    E existem produtos cadastrados no banco de dados
    E estou autenticado com um token de autorização válido
    Quando envio uma solicitação PUT para atualizar o preço de um produto
    Então devo receber uma resposta com status 200
    E a resposta deve conter uma mensagem de sucesso

Cenário: Excluir um produto
    Dado que tenho acesso à API de produtos
    E existem produtos cadastrados no banco de dados
    E estou autenticado com um token de autorização válido
    Quando envio uma solicitação DELETE para excluir um produto pelo ID
    Então devo receber uma resposta com status 200
    E a resposta deve conter apenas uma mensagem de sucesso

Cenário: Tentar buscar um produto inexistente pelo ID
    Dado que tenho acesso à API de produtos
    E estou autenticado com um token de autorização válido
    Quando envio uma solicitação GET para buscar um produto pelo ID que não existe
    Então devo receber uma resposta com status 400 ou 404
    E a resposta deve conter uma mensagem indicando que o produto não foi encontrado