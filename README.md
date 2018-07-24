# Reserve
O Reserve é um aplicativo utilizado pelos colaboradores do setor da Informática e Áudio e Vídeo do [Colégio e Faculdade Sena Aires](http://www.senaaires.com.br/) (campus Valparaíso de Goiás - GO).

As motivações para o desenvolvimento desse aplicativo foi:
* Agilidade na reserva de equipamento;
* Melhor organização lógica das reservas, podendo agenda-lás para dias posteriores;
* Facilidade de busca com filtro de pesquisa;
* Fazer uso da TI verde e dispensar o uso de papel para o agendamento de reservas;
* Armazenamento mais rápido e prático.

O aplicativo foi desenvolvido com base nas tecnologias:
* Framework front-end [Bootstrap](https://getbootstrap.com/) versão 4.1.1;
* Pacote de ícones do [Font Awesome](https://fontawesome.com/) versão 5.0.13;
* ECMAScript 6 - [JavaScript 6](https://www.w3schools.com/js/js_es6.asp);
* Armazenamento local no [localStorage](https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/LocalStorage).

## Como funciona?
O aplicativo funciona baseado na funcionalidade CRUD no localStorage do navegador para inserção, leitura, edição e remoção das reservas efetuadas. Com esse alicativo será possível:
* Efetuar cadastros de reservas;
* Visualizar lista de reservas cadastradas;
* Editar os cadastros;
* Excluir os cadastros;
* Imprimir as reservas cadastras.

## Como utilizar?
Para utilizar a aplicação será necessário:
* Clonar via HTTPS ou SSH para seu repositório local ou fazer o download .ZIP direto desse repositório; 
* Extrair o arquivo .ZIP em algum local de sua preferência (caso tenha escolhido fazer o download direto desse repositório);
* Procurar o arquivo index.html e dê um duplo clique;
* Caso não abra, dê um clique no botão direito do mouse e procure a opção "Abrir com..." e escolha um navegador de sua preferência.

## Changelog / Versões

| Nome da Versão | Data | Funcionalidades |
| :------------: | :--: | :-------------- |
| (v1.0.0) | 20/06/2018 | Cadastro e validação das reservas; Consulta e filtro dos cadastros; Possibilidade de impressão de reservas. |
| (v1.0.1) | 24/06/2018 | Botão visualizar para ver a reserva do responsável detalhadamente; Botão atualizar para recarregar a lista; Página de Reservas listando todas as reservas cadastradas; Link  para o site do Colégio e Faculdade Sena Aires; Mudança no padrão das cores dos botões; Validação dupla na pesquisa de filtro e no cadastro de reservas.|
| (v1.0.2) | 24/06/2018 | Indentificação da versão e link do GitHub; Titles dos indentificadores da reservas. |
| (v1.0.3) | 25/06/2018 | Ícone popover da página consulta.html; Remoção do underline do link para o GitHub. |
| (v1.1.0-beta) | 26/06/2018 | Liberada como versão de testes para uso diário. |
| (v1.2.0-beta) | 28/06/2018 | Possibilidade de edição de reserva; Validação da edição de reserva; Visualização mais completa no modo visualização; Limitador de data para cadastro e consulta; Código mais limpo e mais leve. |
| (v1.2.1-beta) | 29/06/2018 | Aprimoramento na validação do cadastro de reservas. |
| (v1.2.2-beta) | 01/07/2018 | Formatação da data no formato EUA para o formato BR. |
| (v1.3.0-beta) | 02/07/2018 | Nova função de lista de consulta exibindo uma coluna "opções" com os botôes de visualização, edição e exclusão; Validação dupla na exclusão da reserva; Recuperendo valores das reservas e setando como default na edição das reservas. |
| (v1.4.0-beta) | 03/07/2018 | Apresentação de um modal de confirmação com as informações do cadastro da quando uma reserva é editada; Revisão no texto de validação. |
| (v1.5.0-beta) **new** | 24/07/2018 | Adição de cadastro, vizualização, edição e exclusão de reservas para alunos; Todas as funcionalidades em uma única página; Mudança da aparência dos inputs; Alteração do background dos modais e cor do texto das tabelas dos modais; botões; Troca de ícones e botões.  |

### Bugs / Defeitos

| Bug | Versão de correção |
| :---| :-----------------:|
| *Tooltip* continua ativado mesmo com o mouse não estando em cima do botão de filtro. | (descontinuado na versão 1.0.1) |
| Parte do placeholder do input "*data*" some em janela reduzida (somente no navegador Chrome). | (descontinuado na versão 1.0.1) |
| Botão de informação com a função *popover* pode ser clicado abaixo do própio botão. | (corrigido na versão 1.0.1) |
| Quebra de alinhamento do link do GitHub e o indentificador do da versão no menu de navegação. | (corrigido na versão 1.0.2.) |
| A página consulta atualiza quando todos os campos são preenchidos na pesquisa sem retornar nenhum resultado. | *** |

### Paths / Correções

| Correção | Versão de correção |
| :------- | :----------------: |
| Ortografia. | (versão 1.0.0) |
| Substituição do placeholder e da variável "*Professor*" por "*Responsável*". | (versão 1.0.1) |
| Realocamento dos botões de visualizar e excluir quando carrega a lista de reserva para quando o usuário filtra as reservas. | (versão 1.0.1) |
| União do horário de início e término em um única coluna na tabela de consulta. | (versão 1.0.1) |
| Validação de cadastro. | (versão 1.2.1-beta) |
| Formatação da data EUA para BR. | (versão 1.2.2-beta) |
| Validação duplas de edição e exclusão de cadastro. | (versão 1.3.0-beta) |