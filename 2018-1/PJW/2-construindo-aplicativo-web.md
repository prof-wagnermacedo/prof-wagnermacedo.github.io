---
topic: Construindo um aplicativo web
layout: course
date: 2018-02-20 19:00
part: 1
---

## Antes de iniciar, o que estamos construindo?

Vamos construir um jogo da velha interativo utilizando a tecnologia Java para web.

## Crie um projeto de aplicação web pelo NetBeans

Veja como fazer isso em <https://netbeans.org/kb/docs/web/quickstart-webapps_pt_BR.html>.

Escreva "<u>jogo-da-velha</u>" para o nome do projeto.

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

## Começando

O código inicial contém a estrutura do que estamos construindo. Já contém os estilos de CSS, portanto só precisamos nos
preocupar com o Java.

Temos três arquivos com a extensão `.tag` dentro da pasta `web/WEB-INF/tags/`. Estes são como um JSP, mas funcionam como
componentes, do lado servidor, que podem ser reutilizados:

- Square renderiza um simples `<button>`, representando cada quadrado do jogo.
- Board renderiza nove quadrados, representando o tabuleiro do jogo.
- Game renderiza o tabuleiro e as informações do jogo.

Nesse ponto, a interface ainda não está interativa.

## Inicie a aplicação

Execute a aplicação no servidor e verifique como está sendo renderizado no browser. Verifique o código fonte da página e
perceba que não aparece `<t:Board/>` ou `<t:Square/>`, isso ocorre porque essas tags são processadas pelo servidor antes
de enviar para o cliente.

## Utilizando o atributo do quadrado

{: data-hi="3" }
```
<%-- O conteúdo é especificado aqui --%>
<button class="square">
    ${value}
 </button>
```

{% comment %}
## Descritor de implantação

Um descritor de implantação é um arquivo XML que centraliza algumas configurações da aplicação. É opcional, mas útil
para algumas situações. Vamos criar um para esse projeto, embora não terá nenhum uso no momento.

1. Selecione Arquivo &gt; Novo Arquivo (Ctrl-N) no menu principal. Em Categorias, selecione Web, em Tipos de Arquivos,
   selecione Descritor de Implantação Padrão (web.xml) e clique em Próximo.
2. Na etapa 2, clique em Finalizar.

### A pasta WEB-INF

Observe que o descritor foi criado na pasta `WEB-INF` que fica na área de Páginas Web, esta é uma pasta especial que o
servidor não permite o acesso pelo lado cliente.

Como os arquivos `.tag` também estão nessa pasta, eles também não são acessíveis diretamente pelos visitantes.

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
