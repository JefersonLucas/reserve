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

### Versão 1.0.1
A versão 1.0.1 foi ao ar no dia 24/06/2018. Dentre as suas funcionalidades estão:
* Correções de bugs da versão 1.0.0;
* Adição do botão visualizar para ver detalhadamente reserva do responsável;
* Adição do botão atualizar para recarregar a lista;
* Adição da página Reservas listando todas as reservas cadastradas;
* Adição de link externo para o site do Colégio e Faculdade Sena Aires;
* Adição de link externo para o projeto no GitHub;
* Mudança na cor dos botões;
* Validação dupla na pesquisa de filtro e no cadastro de reservas.

### Versão 1.0.2 *new*
A versão 1.0.2 foi ao ar dia 20/06/2018. Corrigindo os seguintes *bugs*
* Indentificação da versão e link do GitHub;
* Titles dos indentificadores da reservas.

## Bugs / Defeitos
* ~~*Tooltip* continua ativado mesmo com o mouse não estando em cima do botão de filtro~~ (*descontinuado na versão 1.0.1*);
* ~~Parte do placeholder do input "*data*" some em janela reduzida (somente no navegador Chrome)~~ (*corrigido na versão 1.0.1*);
* ~~Botão de informação com a função *popover* pode ser clicado abaixo do própio botão~~ (*corrigido na versão 1.0.1*);
* ~~Quebra de alinhamento do link do GitHub e o indentificador do da versão no menu de navegação~~ (*corrigido na versão 1.0.2*.)

## Correções / Paths
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
