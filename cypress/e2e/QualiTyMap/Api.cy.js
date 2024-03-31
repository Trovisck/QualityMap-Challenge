describe('Teste API', () => {
    it('Produtos', () => {
        // Define os dados de login
        const loginData = {
            email: 'Teste@gmail.com',
            password: '123456789'
        };

        // Envia uma solicitação POST para fazer login
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            body: loginData
        }).then((loginResponse) => {
            // Verifica se a resposta foi bem-sucedida (status 200)
            expect(loginResponse.status).to.equal(200);
            // Verifica se a resposta contém um token de autorização
            expect(loginResponse.body).to.have.property('authorization');
            // Verifica se o token de autorização é uma string e não está vazio
            expect(loginResponse.body.authorization).to.be.a('string').and.not.be.empty;

            // Exibe o token de autorização no console para referência
            cy.log('Token de autorização:', loginResponse.body.authorization);

            // Define os dados do novo produto
            const produtoData = {
                nome: 'Teste QMAPChallenge',
                preco: 551,
                descricao: 'Teste',
                quantidade: 381
            };

            // Envia uma solicitação POST para cadastrar um novo produto
            cy.request({
                method: 'POST',
                url: 'https://serverest.dev/produtos',
                headers: {
                    Authorization: loginResponse.body.authorization
                },
                body: produtoData
            }).then((produtoResponse) => {
                // Verifica se a resposta para cadastrar o produto foi bem-sucedida (status 201)
                expect(produtoResponse.status).to.equal(201);
                // Verifica se a resposta contém a mensagem de sucesso
                expect(produtoResponse.body).to.have.property('message', 'Cadastro realizado com sucesso');
                // Verifica se a resposta contém o ID do produto
                expect(produtoResponse.body).to.have.property('_id');
                // Salva o ID do produto para uso futuro
                const productId = produtoResponse.body._id;
                // Exibe o ID do produto no console para referência
                cy.log('ID do novo produto:', productId);

                // Envia uma solicitação GET para buscar o produto pelo ID
                cy.request({
                    method: 'GET',
                    url: `https://serverest.dev/produtos/${productId}`,
                    headers: {
                        Authorization: loginResponse.body.authorization
                    }
                }).then((getProdutoResponse) => {
                    // Verifica se a resposta para buscar o produto foi bem-sucedida (status 200)
                    expect(getProdutoResponse.status).to.equal(200);
                    // Verifica se a resposta contém os dados do produto
                    expect(getProdutoResponse.body).to.have.property('nome', produtoData.nome);
                    expect(getProdutoResponse.body).to.have.property('preco', produtoData.preco);
                    expect(getProdutoResponse.body).to.have.property('descricao', produtoData.descricao);
                    expect(getProdutoResponse.body).to.have.property('quantidade', produtoData.quantidade);

                    // Define os dados para atualizar o preço do produto
                    const novoPreco = {
                        nome: produtoData.nome,
                        descricao: produtoData.descricao,
                        quantidade: produtoData.quantidade,
                        preco: 100 // Novo preço
                    };

                    // Envia uma solicitação PUT para atualizar o preço do produto
                    cy.request({
                        method: 'PUT',
                        url: `https://serverest.dev/produtos/${productId}`,
                        headers: {
                            Authorization: loginResponse.body.authorization
                        },
                        body: novoPreco
                    }).then((putProdutoResponse) => {
                        // Verifica se a resposta para atualizar o preço do produto foi bem-sucedida (status 200)
                        expect(putProdutoResponse.status).to.equal(200);
                        // Verifica se a resposta contém a mensagem de sucesso
                        expect(putProdutoResponse.body).to.have.property('message', 'Registro alterado com sucesso');

                        // Envia uma solicitação DELETE para excluir o produto pelo ID
                        cy.request({
                            method: 'DELETE',
                            url: `https://serverest.dev/produtos/${productId}`,
                            headers: {
                                Authorization: loginResponse.body.authorization
                            }
                        }).then((deleteProdutoResponse) => {
                            // Verifica se a resposta para excluir o produto foi bem-sucedida (status 200)
                            expect(deleteProdutoResponse.status).to.equal(200);
                            // Verifica se a resposta contém apenas a mensagem de sucesso
                            expect(deleteProdutoResponse.body).to.have.property('message', 'Registro excluído com sucesso');


                            // Envia uma solicitação GET para buscar o produto pelo ID
                            cy.request({
                                method: 'GET',
                                url: `https://serverest.dev/produtos/${productId}`,
                                headers: {
                                    Authorization: loginResponse.body.authorization
                                },
                                failOnStatusCode: false // Ignora falha no status code 400
                            }).then((getProdutoResponse) => {
                                // Verifica se a resposta para buscar o produto foi bem-sucedida (status 200)
                                if (getProdutoResponse.status === 200) {
                                    // Verifica se os dados do produto foram retornados corretamente
                                    expect(getProdutoResponse.body).to.have.property('nome', produtoData.nome);
                                    expect(getProdutoResponse.body).to.have.property('preco', produtoData.preco);
                                    expect(getProdutoResponse.body).to.have.property('descricao', produtoData.descricao);
                                    expect(getProdutoResponse.body).to.have.property('quantidade', produtoData.quantidade);
                                } else if (getProdutoResponse.status === 400 && getProdutoResponse.body.message === 'Produto não encontrado') {
                                    // Se o produto não for encontrado, isso também é aceitável
                                    cy.log('Produto não encontrado');
                                } else {
                                    // Se a resposta não for a esperada, falha no teste
                                    throw new Error(`Erro ao buscar o produto: ${getProdutoResponse.status} - ${getProdutoResponse.body.message}`);
                                }
                            });


                        });
                    });
                });
            });
        });
    });
});
