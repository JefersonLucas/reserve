# Reserve
O Reserve é um mini sistema utilizado pelos colaboradores do setor da informática e Áudio e Vídeo do [Colégio e Faculdade Sena Aires](http://www.senaaires.com.br/) (campus Valparaíso de Goiás - GO). Essa é a versão 1.0.0 que vai ao ar no dia 20/06/2018.

As motivações para o desenvolvimento desse sistema foi:
* Agilidade na reserva de equipamento;
* Maior organização lógica das reservas, podendo agenda-lás para dias posteriores;
* Facilidade de busca com filtro de pesquisa;
* Fazer uso da TI verde e dispensar o uso de papel para o agendamento de reservas;
* Armazenamento rápido e prático.

O sistema foi desenvolvido com base nas tecnologias:
* Framework front-end [Bootstrap](https://getbootstrap.com/) versão 4.1.1;
* Pacote de ícones do [Font Awesome](https://fontawesome.com/) versão 5.0.13;
* Armazenamento no localStorage; 

## Funcionamento
O sistema funciona baseado na funcionalidade do localStorage para inserção, leitura e remoção das reservas efetuada pelos professores.

## Como começar?
Para utilizar necessita clonar o reposiório [Reserve](https://github.com/JefersonLucas/reserve) em qualquer máquina, abra o arquivo index.html

```bash
index.html
```
# Utilização
## index.html
O usuário pode fazer depois da validação, cadastrar reservas de equipamentos.
![index](https://user-images.githubusercontent.com/39635734/41671120-92edf1a2-748c-11e8-8ce7-3197a7b3d16d.jpg)
## Validação
Caso haja erro no cadastro, irá ser exibido um modal de erro, caso contrário exibe um modal de sucesso.
![index-erro](https://user-images.githubusercontent.com/39635734/41673393-31beeb1e-7493-11e8-9539-ff83f270db60.jpg)

![index-success](https://user-images.githubusercontent.com/39635734/41573481-4cce9c9c-7353-11e8-96b4-0b7d5ce73396.jpg)

## consulta.html
O usuário poderá consultar, filtrar, imprimir e também excluir os reservas cadastradas.
![consulta](https://user-images.githubusercontent.com/39635734/41673446-56004d60-7493-11e8-9582-4ef133379cee.jpg)

## Filtrando reservas
![consulta-filter](https://user-images.githubusercontent.com/39635734/41673472-6f736958-7493-11e8-827e-267636192bf9.jpg)

## Excluindo reservas
![consulta-drop](https://user-images.githubusercontent.com/39635734/41673494-7e76a3c0-7493-11e8-82f2-4f78474252c4.jpg)

## Imprimindo reservas
![consulta-print](https://user-images.githubusercontent.com/39635734/41673509-8992f858-7493-11e8-8ed6-9d8d1d0d4df3.jpg)