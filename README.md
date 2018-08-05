# Reserve
O Reserve é um aplicativo de reservas de equipamentos utilizado pelos colaboradores do setor da Informática e Áudio e Vídeo do [Colégio e Faculdade Sena Aires](http://www.senaaires.com.br/) (campus Valparaíso de Goiás - GO).

As motivações para o desenvolvimento desse aplicativo foi:
* Agilidade na reserva de equipamento;
* Melhor organização lógica das reservas, podendo agenda-lás para dias posteriores;
* Facilidade de busca com filtro de pesquisa;
* Fazer uso da TI verde e dispensar o uso de papel para o agendamento de reservas;
* Armazenamento mais rápido e prático.

O aplicativo foi desenvolvido com base nas tecnologias:
* Framework front-end [Bootstrap](https://getbootstrap.com/) versão 4.1.1;
* Pacote de ícones do [Font Awesome](https://fontawesome.com/) versão 5.2.0;
* ECMAScript 6 - [JavaScript 6](https://www.w3schools.com/js/js_es6.asp);
* Armazenamento no [localStorage](https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/LocalStorage).

## Como funciona?
O aplicativo funciona baseado na funcionalidade CRUD no localStorage do navegador para inserção, leitura, edição e remoção das reservas efetuadas. 

Com esse aplicativo será possível: efetuar cadastros de reservas, visualizar lista de reservas cadastradas, pesquisar e filtrar reservas, editar os cadastros, excluir os cadastros e imprimir as reservas cadastras.

## Como utilizar?

### Efetuando o download:
* Clonar via HTTPS ou SSH para seu repositório local ou fazer o download .ZIP direto desse repositório; 
* Extrair o arquivo .ZIP em algum local de sua preferência (caso tenha escolhido fazer o download direto desse repositório);
* Procurar o arquivo index.html e dê um duplo clique;
* Caso não abra, dê um clique no botão direito do mouse e procure a opção "Abrir com..." e escolha um navegador de sua preferência;
* Dica: em um navegador de preferência salve a página como favorito ou crie um atalho no desktop para facilitrar o acesso ao app. 

### Utilização

#### Primeiro acesso
No primeiro acesso no aplicativo ele irá pedir um nome de usuário para que possa indentificar que está utilizando. Depois da indetificação o nome do usuário será exibido na barra de navegação ao lado do calendário e o relógio.

**Importante**: O aplicativo deve ser utilizado um navegador de preferência, pois os dados armazenados são gravados no navegador, ou seja, os dados gravados em um navegador não será repassado pra outro navegador.

#### Efetuando uma reserva
Com os dados do aluno ou professor deve-se informa nos seus devidos campos respectivos, com tudo certo basta confirmar no botão de cadastro abaixo dos campos, se tudo estiver certo, um modal de confirmação da reserva irá ser exibido, caso ao contrário um modal de erro irá ser exibido.

Depois da conclusão de uma reserva ela automaticamente exibida em uma tabela com os dados cadastrados. Cada reserva vem exibida junto um status, e botões de opção de reserva.

As reservas são dividas em três status:
* **Aguardando**: quando o horário da reserva ainda não está no hora prevista, quando atingir a hora um modal de alerta é exibido informando o nome do aluno ou professor responsável pela reserva;
* **Em uso**: Quando a reserva está em uso pelo responsável pelo equipamento;
* **Recolhida**: Quando a reserva já está em poder dos funcionários responsáveis pela equipamento.

Botões de opções da reserva:
* **Vizualizar**: exibe em um modal todos os detatlhes da reserva;
* **Editar**: tem a possibilidade de editar uma determinada reserva modificando os seus dados, depois da alteração um modal é exibido contendo os dados modificados;
* **Excluir**: exclui o reserva e todos os seus dados;
* **Verificar**: verifica e checa a reserva modificando o seu status.

#### Vizualizando uma reserva
Após ter efetuado uma reserva, procure na coluna "Opções" um botão com um ícone semelhante a uma visão, esse botão dá a possibilidade de visualizar todos os detalhes da reserva desde a hora e data da reserva até a hora de montagem (uso de reserva) e recolhimento da reserva.

#### Alterando uma reserva
Caso sinta necessidade de alterar algum item de uma reserva, procure na coluna "Opções" um botão com um ícone de um lápis, esse botão altera os itens da reserva substituindo os valores da antiga e cadastrando novos valores.

 **Atenção**: O aplicativo permite alterar a reserva até no mesmo dia da reserva e 5 minutos antes do horário programado para a reserva ser utilizada, depois disso o aplicativo não permite mais alterações.

#### Excluindo uma reserva
Se o usuário sentir necessidade de excluir alguma determinada reserva, na coluna "Opções" tem um botão com um ícone de uma lixeira que apaga do registro do armazenamento as informações da reserva.

**Atenção**: após confirmação da exclusão da reserva, essa operação não há mais volta, tenha cuidado com essa função.

#### Verificando uma reserva
Se alguma reserva já estiver em uso ou ela estiver sido recolhida, na coluna "Opções" um botão com um ícone semelhante há um usuário verificado, esse botão trata com os diferentes status da reserva modificando o status, ele guarda a data e a hora da reserva em uso e a reserva recolhida.

#### Alerta de reserva
Quando uma reserva estiver no dia e na hora de seu uso, um alerta será exibido informando todos os detalhes da reserva, facilitando o gerênciamento das reservas.

## Changelog / Versões

| Versão | Data | Funcionalidades |
| :----: | :--: | :-------------- |
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
| (v1.5.0-beta) | 24/07/2018 | Adição de cadastro, vizualização, edição e exclusão de reservas para Alunos; Todas as funcionalidades em uma única página; Mudança da aparência dos inputs; Alteração do background dos modais e cor do texto das tabelas dos modais; botões; Troca de ícones e botões.  |
| (v1.6.0-beta) **new** | ##/##/#### | Indentificação de usuário; data e relógio exibidos no menu de navegação; alerta de reserva; status de reserva; verificação de reserva; código mais inteligente e funcional. |

### Bugs / Defeitos

| Correção | Bug |
| :------: | :---|
| (descontinuado na versão 1.0.1) | *Tooltip* continua ativado mesmo com o mouse não estando em cima do botão de filtro. |
| (descontinuado na versão 1.0.1) | Parte do placeholder do input "*data*" some em janela reduzida (somente no navegador Chrome). |
| (corrigido na versão 1.0.1) | Botão de informação com a função *popover* pode ser clicado abaixo do própio botão. |
| (corrigido na versão 1.0.2) | Quebra de alinhamento do link do GitHub e o indentificador do da versão no menu de navegação. |
| *** | A página consulta atualiza quando todos os campos são preenchidos na pesquisa sem retornar nenhum resultado. |

### Paths / Correções

| Correção | Versão  |
| :------: | :------ |
| Ortografia. | (versão 1.0.0) |
| (versão 1.0.1) | Substituição do placeholder e da variável "*Professor*" por "*Responsável*". |
| (versão 1.0.1) | Realocamento dos botões de visualizar e excluir quando carrega a lista de reserva para quando o usuário filtra as reservas. |
| (versão 1.0.1) | União do horário de início e término em um única coluna na tabela de consulta. |
| (versão 1.2.1-beta) | Validação de cadastro. |
| (versão 1.2.2-beta) | Formatação da data EUA para BR. |
| (versão 1.3.0-beta) | Validação duplas de edição e exclusão de cadastro. |