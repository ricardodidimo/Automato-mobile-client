# 🤖 Automato

## Sobre o APP
O projeto surgiu como uma necessidade pessoal como usuário de aplicativos de gerenciamento de credenciais. Notei que estava em uma situação onde todas as minhas credenciais digitais estavam sob monopólio. Então, decidi criar uma ferramenta própria que tanto me trará mais segurança quanto disponibilidade sobre os meus próprios dados ao integrar com outras ferramentas, como bitwarden por exemplo, oferecendo uma alternativa de backup automatizado.

## Prototipação UI/UX
As telas que foram projetadas para o projeto podem ser visualizadas em: [Prototipo figma](https://www.figma.com/proto/Zkirlt7UwRhGhnnN20FuSo/Automato?node-id=13-99&t=59bxVbJ5Z6Wa6YWg-1&starting-point-node-id=13%3A99)

## Esquematização banco de dados
O diagrama de banco de dados pode ser visualizado em: [Diagrama DB](https://www.figma.com/proto/Zkirlt7UwRhGhnnN20FuSo/Automato?node-id=44-206&t=59bxVbJ5Z6Wa6YWg-1&scaling=scale-down-width&content-scaling=fixed)

## Atualizações desde o último checkpoint
* Atualizei o projeto para usar vue router como mecanismo de navegação;
* Adicionei nativewind lib para utilizar classes tailwind como método de estilização de páginas;
* Adicionei páginas estáticas: login, register, vault;

Componentização: 
* criei componentes para as seções reutilizáveis, notavelmente o 'header do aplicativo' figura em diversas partes e repetir seus elementos e estilizações seria uma má ideia. Encapsulei a lógica de apresentação em um componente próprio.
* criei o componente 'MasterPasswordModal' tanto para encapsular os elementos como as futuras chamadas de API. Usei props para receber os dados.

## Planejamento de sprints

O plano de sprints tem como visão 5 sprints divididas em 2 semanas cada. Totalizando 10 semanas de desenvolvimento.

1a sprint - 20/04 à 04/05

- [ ] ~Implementar às telas de autenticação via login/senha;~
- [ ] ~Implementar mecanismo de autenticação via biometria;~
- [ ]  Implementar modal de “Configurações gerais”;
- [ ] ~Implementar layout e roteamento para a tela de listagem de cofres.~

2a sprint - 04/05 à 18/05

- [ ]  ~Implementar listagem de cofres;~
- [ ]  Implementar ‘infinite scroll’;
- [ ]  ~Implementar mecanismo de pesquisa;~
- [ ]  ~Implementar modal de criação de cofre;~
- [ ]  Implementar mecanismo de seleção de itens em lista.

3a sprint - 18/05 à 01/06

- [ ]  Implementar deleção em massa para cofres;
- [ ]  ~Implementar modal de edição e deleção de cofre;~
- [ ]  Implementar (mesmo modal) gerenciamento de categorias:
    - [ ]  ~Criação de nova categoria;~
    - [ ]  ~Atualização de categoria;~
    - [ ]  ~Deleção de categoria.~
- [ ]  ~Implementar layout e roteamento tela listagem de credenciais em cofre.~

4a sprint - 01/06 à 15/06

- [ ]  ~Implementar listagem de credenciais;~
- [ ]  ~Implementar listagem de categorias;~
- [ ]  ~Implementar pesquisa por credenciais e por categorias;~
- [ ]  ~Implementar filtragem de credenciais por categoria;~
- [ ]  Implementar interações gerais da página:
    - [ ]  ~copiar para a área de transferência;~
    - [ ]  Selecionar um/mais/todos elementos.

5a sprint - 15/06 à 29/06

- [ ]  Implementar deleção em massa para credenciais;
- [ ]  ~Implementar modal de criação de nova credencial;~
- [ ]  ~Implementar modal de edição/deleção de uma credencial;~
- [ ]  Implementar modal menu de configuração (Ao clicar nome do cofre):
    - [ ]  “Opções do cofre” → Modal criado anteriormente em “Edição e deleção de cofre”;
    - [ ]  Configurações gerais → Modal criado anteriormente em “Implementar modal de ‘Configurações gerais’”;
    - [ ]  ~Trocar de cofre → Roteamento para a tela de seleção de cofres;~
    - [ ]  Sair da conta → Adicionar capacidade de logOut e roteamento à tela de login.
- [ ]  ~Implantar o app para distribuição.~
