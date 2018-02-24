---
topic: Construindo um aplicativo web
layout: course
date: 2018-02-20 19:00
part: 1
---

## Crie um projeto de aplicação web pelo NetBeans

Veja como fazer isso em <https://netbeans.org/kb/docs/web/quickstart-webapps_pt_BR.html>.

## Prepare o código inicial

1. Remova o arquivo `web/index.html`
2. Adicione um arquivo `game.css` em `web/` com [este código CSS][game.css].
3. Adicione um arquivo `index.jsp` em `web/` com [este código JSP][index.jsp].
4. Crie uma pasta chamada `tags` em `web/WEB-INF/`
5. Adicione um arquivo `Game.tag` em `web/WEB-INF/tags/` com [este código][Game.tag].
6. Adicione um arquivo `Board.tag` em `web/WEB-INF/tags/` com [este código][Board.tag].
7. Adicione um arquivo `Square.tag` em `web/WEB-INF/tags/` com [este código][Square.tag].

[game.css]: https://raw.githubusercontent.com/wagnerluis1982/java-web-tutorial/07432f43a5b26b6b28ed879447173cb73aa432bf/web/game.css
[index.jsp]: https://raw.githubusercontent.com/wagnerluis1982/java-web-tutorial/07432f43a5b26b6b28ed879447173cb73aa432bf/web/index.jsp
[Game.tag]: https://raw.githubusercontent.com/wagnerluis1982/java-web-tutorial/07432f43a5b26b6b28ed879447173cb73aa432bf/web/WEB-INF/tags/Game.tag
[Board.tag]: https://raw.githubusercontent.com/wagnerluis1982/java-web-tutorial/07432f43a5b26b6b28ed879447173cb73aa432bf/web/WEB-INF/tags/Board.tag
[Square.tag]: https://raw.githubusercontent.com/wagnerluis1982/java-web-tutorial/07432f43a5b26b6b28ed879447173cb73aa432bf/web/WEB-INF/tags/Square.tag

{% comment %}
## Objetivos dessa interação

### 1
- O ambiente de desenvolvimento 
- O que é um arquivo JSP? 
- Diferença entre HTML e JSP 
- O lado servidor 
### 2
- Formulário web 
- Estado da aplicação
### 3
- O que é um Servlet? 
- Mapeamento de URL 
- Cuidados com o caminho relativo 
### 4
- Forward vs Redirect 
- Separando a lógica da aplicação 
### 5
- Checagens no lado servidor 
- Removendo a lógica da aplicação do Servlet 
- Padrão MVC 
### 6
- Reduzindo a carga do servidor com JavaScript 
- Importância de manter a checagem do lado servidor 
### 7
- Método GET 
- Método POST 
- Quando usar GET ou POST 
### 8
- Debug de uma aplicação web 
### 9
- Entendendo melhor forward e redirect 
- Cuidados com o caminho absoluto 
### 10
- Entendendo a sessão web 
- Parâmetros da URL 
- Cookies e seus usos
{% endcomment %}
