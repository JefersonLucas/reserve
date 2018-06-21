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
* Validação de pesquisa de filtro.

## Bugs da aplicação
* *Tooltip* continua ativado mesmo com o mouse não estando em cima do botão de filtro;
* Parte do placeholder do input "*data*" some em janela reduzida (somente no navegador Chrome);
* Botão de informação com a função *popover* pode ser clicado abaixo do própio botão.

## Correções
* Ortografia (versão 1.0.0);
* Substituição do placeholder e da variável "*Professor*" para "*Responsável*" (*versão 1.0.1*);
* Substituição do placeholder *Sala* para *Local* (*versão 1.0.1*);
* Substituição do texto e da variável "*Professor(a)*" para "*Responsável*" (*versão 1.0.1*);
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

### Validação do cadastro
Caso haja erro no cadastro, irá ser exibido um modal de erro, caso contrário exibe um modal de sucesso.

### Modal Erro

### Modal Success

### consulta.html
O usuário poderá consultar, filtrar, imprimir e também excluir os reservas cadastradas.

### Filtrando reservas

### Validação do filtro
Caso haja erro no filtro, irá ser exibido um modal de erro.

### Excluindo reservas

### Imprimindo reservas