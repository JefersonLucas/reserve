# Reserve
O Reserve é um aplicativo utilizado pelos colaboradores do setor da Informática e Áudio e Vídeo do [Colégio e Faculdade Sena Aires](http://www.senaaires.com.br/) (campus Valparaíso de Goiás - GO).

As motivações para o desenvolvimento desse aplicativo foi:
* Agilidade na reserva de equipamento;
* Maior organização lógica das reservas, podendo agenda-lás para dias posteriores;
* Facilidade de busca com filtro de pesquisa;
* Fazer uso da TI verde e dispensar o uso de papel para o agendamento de reservas;
* Armazenamento mais rápido e prático.

O aplicativo foi desenvolvido com base nas tecnologias:
* Framework front-end [Bootstrap](https://getbootstrap.com/) versão 4.1.1;
* Pacote de ícones do [Font Awesome](https://fontawesome.com/) versão 5.0.13;
* Armazenamento no localStorage.

## Changelog

### Versão 1.0.0
A versão 1.0.0 foi ao ar no dia 20/06/2018. Dentre as suas funcionalidades estão:
* Cadastro e validação das reservas;
* Consulta e filtro dos cadastros;
* Possibilidade de impressão de reservas.

### Versão 1.0.1 *new*
A versão 1.0.1 vai ao ar no dia ##/##/####. Dentre as suas funcionalidades estão:
* Adição da feature visualizar com um botão de visualização junto com o botão de exclusão. Tendo a possibilidade de visualizar detalhadamente reserva do responsável;
* Adição de link externo para o site do Colégio e Faculdade Sena Aires;
* Adição do botão atulizar;
* Adição do input checkbox para verificação de status.


* Validação de pesquisa de filtro.

## Bugs da aplicação
* ~~*Tooltip* continua ativado mesmo com o mouse não estando em cima do botão de filtro~~(*descontinuado na versão 1.0.1*);
* Parte do placeholder do input "*data*" some em janela reduzida (somente no navegador Chrome);
* ~~Botão de informação com a função *popover* pode ser clicado abaixo do própio botão~~ (*corrigido na versão 1.0.1*).

## Correções
* Ortografia (versão 1.0.0);
* Substituição do placeholder e da variável "*Professor*" para "*Responsável*" (*versão 1.0.1*);
* Substituição do placeholder *Sala* para *Local* (*versão 1.0.1*);
* Realocamento dos botões de visualizar e excluir quando carrega a lista de reserva para quando o usuário filtra as reservas (*versão 1.0.1*);
* União do horário de início e término em um única coluna na tabela de consulta (*versão 1.0.1*).

## Como funciona?
O aplicativo funciona baseado na funcionalidade do localStorage do navegador para inserção, leitura e remoção das reservas efetuada pelos professores.

## Como utilizar?
Para utilizar a aplicação necessita clonar ou fazer o download do repositório [Reserve](https://github.com/JefersonLucas/reserve) em qualquer máquina. Logo depois, abra o arquivo *index.html*.

```bash
index.html
```

## Demonstração

### index.html
O usuário pode fazer depois da validação, cadastrar reservas de equipamentos.
![index](https://user-images.githubusercontent.com/39635734/41740991-2a3625b4-7570-11e8-91c6-f4039dbec0f8.jpg)

#### Validação do cadastro
Caso haja erro no cadastro, irá ser exibido um modal de erro, caso contrário exibe um modal de sucesso.

#### Modal Erro
![index-erro](https://user-images.githubusercontent.com/39635734/41741042-527de4f8-7570-11e8-9dd3-e9056ed3754c.jpg)

#### Modal Success
![index-success](https://user-images.githubusercontent.com/39635734/41741084-74f9ba16-7570-11e8-8111-fbf963b8a369.jpg)

### consulta.html
O usuário poderá consultar, filtrar, imprimir e também excluir os reservas cadastradas.
![consulta](https://user-images.githubusercontent.com/39635734/41741130-99955d62-7570-11e8-8933-0af5939a629a.jpg)

#### Filtrando reservas
Para buscar algum cadastro basta utilizar o filtro de pesquisa e caso houver a pesquisa o aplicativo retorna a busca.
![consulta-filter](https://user-images.githubusercontent.com/39635734/41741158-ad25b7aa-7570-11e8-8506-595cebb02a73.jpg)

#### Validação do filtro
Caso haja erro no filtro, irá ser exibido um modal de erro.
![consulta-filter-error](https://user-images.githubusercontent.com/39635734/41741200-ce36b688-7570-11e8-88d8-67e28a5cbd25.jpg)

#### Visualizando reservas *new* (*versão 1.0.1*)
Se o usuário sentir necessidade de ver a reserva isolada e detalhada tem a opção no botão de visualizar reservas.
![consulta-filter-view](https://user-images.githubusercontent.com/39635734/41741427-72aa5918-7571-11e8-8665-620e1bd4f3cc.jpg)

#### Excluindo reservas *new* (*versão 1.0.1*)
No momento que o usuário decidir excluir uma reserva irá ser exibido um modal de aviso que a reserva irá ser exibido informando qual reserva será ser excluida.
![consulta-filter-del](https://user-images.githubusercontent.com/39635734/41741288-07f3d892-7571-11e8-9e6a-ae72e27683c0.jpg)

Logo depois será exibido todas reservas existentes.
![consulta-filter-del-2](https://user-images.githubusercontent.com/39635734/41741302-134c4df0-7571-11e8-9573-0f8d0ded599f.jpg)

#### Imprimindo reservas
Se caso o usuário queira, tem a opção de imprimir as reservas no aplicativo. 
![consulta-printer](https://user-images.githubusercontent.com/39635734/41741317-1fcb8294-7571-11e8-8b89-f31019cc05ea.jpg)