# Reserve

O Reserve é um aplicativo de reservas que utiliza as funcionalidades da API - localStorage do navegador para armazenamento da informações.

## Começando

Essas instruções fornecerão uma cópia do projeto em execução na sua máquina local.

### Instalando
Siga passo a passo as seguinte formas de obter o código na sua máquina local.

**1. Clonando o repositório**.

Para clonar o esse repositório na sua máquina local, utilize as linhas de comando:

```
#Clonar com SSH

mkdir reserve
cd reserve
git init
git clone git@github.com:JefersonLucas/reserve.git
```

```
#Clonar com HTTPS

mkdir reserve
cd reserve
git init
git clone https://github.com/JefersonLucas/reserve.git
```

**2. Baixando o repositório**.

Você também pode [baixar](https://github.com/JefersonLucas/reserve/archive/master.zip) o repositório em formato zip.

## Como funciona?
O aplicativo Reserve funciona baseado na funcionalidade do localStorage do navegador para inserção, leitura, edição e remoção das reservas efetuadas. Com esse aplicativo será possível:
- Efetuar cadastros;
- Visualizar lista cadastradas; 
- Pesquisar e filtrar,
- Editar, excluir e imprimir as reservas cadastras.

### Utilização


### Utilização

1. Primeiro acesso
No primeiro acesso, o aplicativo vai requisitar um nome de **administrador**. Você poderá editar o seu nome de administrador a qualquer hora no menu de configurações.

**Importante!**: O aplicativo deve ser utilizado um navegador de preferência, pois os dados armazenados são gravados no navegador, ou seja, os dados gravados em um navegador não será repassado pra outro navegador.

2. Efetuando uma reserva

Insira os dados do usuário da reserva nos campos de formulário e confirma a reserva, os dados deve ser digitados nos seus devidos campos respectivos. Tudo certo basta confirmar no **botão de cadastro**, se tudo estiver certo, um modal de confirmação da reserva irá ser exibido, caso ao contrário um modal de erro irá ser exibido. Depois da conclusão de uma reserva ela automaticamente exibida em uma tabela com os dados cadastrados. Cada reserva vem exibida junto um status, e botões de opção de reserva.

3. Botões de opções da reserva:
* **Vizualizar**: exibe em um modal todos os detatlhes da reserva;
* **Editar**: tem a possibilidade de editar uma determinada reserva modificando os seus dados, depois da alteração um modal é exibido contendo os dados modificados;
* **Excluir**: exclui o reserva e todos os seus dados;
* **Verificar**: verifica e checa a reserva modificando o seu status.

4. As reservas são dividas em três status:
* **Aguardando**: quando o horário da reserva ainda não está no hora prevista, quando atingir a hora um modal de alerta é exibido informando o nome do aluno ou professor responsável pela reserva;
* **Em uso**: Quando a reserva está em uso pelo responsável pelo equipamento;
* **Recolhida**: Quando a reserva já está em poder dos funcionários responsáveis pela equipamento.

5. Vizualizando uma reserva

Após ter efetuado uma reserva, procure na coluna "Opções" um botão com um ícone semelhante a uma visão, esse botão dá a possibilidade de visualizar todos os detalhes da reserva desde a hora e data da reserva até a hora de montagem (uso de reserva) e recolhimento da reserva.

6. Alterando uma reserva

Caso sinta necessidade de alterar algum item de uma reserva, procure na coluna "Opções" um botão com um ícone de um lápis, esse botão altera os itens da reserva substituindo os valores da antiga e cadastrando novos valores.

 **Atenção**: O aplicativo permite alterar a reserva até no mesmo dia da reserva e 5 minutos antes do horário programado para a reserva ser utilizada, depois disso o aplicativo não permite mais alterações.

7. Excluindo uma reserva

Se o usuário sentir necessidade de excluir alguma determinada reserva, na coluna "Opções" tem um botão com um ícone de uma lixeira que apaga do registro do armazenamento as informações da reserva.

**Atenção**: após confirmação da exclusão da reserva, essa operação não há mais volta, tenha cuidado com essa função.

8. Verificando uma reserva

Se alguma reserva já estiver em uso ou ela estiver sido recolhida, na coluna "Opções" um botão com um ícone semelhante há um usuário verificado, esse botão trata com os diferentes status da reserva modificando o status, ele guarda a data e a hora da reserva em uso e a reserva recolhida.

9. Pesquisando uma reserva

Para efetuar uma pesquisa basta buscar nos campos os dados que tenha interesse de pesquisa caso tenha tenha um resultado semelhante a pesquisa o aplicativo retorna os dados desejado.

10. Alerta de reserva

Quando uma reserva estiver no dia e na hora de seu uso, um alerta será exibido informando todos os detalhes da reserva, facilitando o gerênciamento das reservas.

## Changelog

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
| (v1.6.0-beta) | 05/08/2018 | Indentificação de usuário; data e relógio exibidos no menu de navegação; alerta de reserva; status de reserva; verificação de reserva; código mais inteligente e funcional. |
| (v1.6.1-beta) **new** | 09/08/2018 | Modificação nas funções de call back por arrow functions; organização das funções; ajuste no texto nos modais e enxutamento do código. |

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

## Construído com

* [Bootstrap](https://getbootstrap.com/) - Framework front end
* [Font Awesome](https://maven.apache.org/) - Framework de pacote de ícones

## Contribuindo

Leia o [CONTRIBUTING.md](https://github.com/JefersonLucas/reserve/blob/master/CONTRIBUTING.md) para obter detalhes sobre nosso código de conduta e o processo para enviar solicitações pull para nós.

## Versionamento

Usamos o [SemVer](https://semver.org/lang/pt-BR/) para controle de versão. Para as versões disponíveis, consulte as [tags nesse repositório](https://github.com/JefersonLucas/reserve/tags).

## Autores

* [@JefersonLucas](https://github.com/JefersonLucas) - _Idealizador_.

Veja também a lista completa de [contribuidores](https://github.com/JefersonLucas/reserve/contributors) que participaram deste projeto.

## Licença

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE.md](https://github.com/JefersonLucas/reserve/blob/master/LICENSE) para obter detalhes.