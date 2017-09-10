---
layout: course
exam-title: 1ª Avaliação
date: 2017-09-11 19:00

hidden: true
---

# {{ page.exam-title }}

{: .pergunta}
1\. Em arquivos JSP, podemos criar uma URL relativa ao contexto com a tag `<c:url>`.

<div class="pergunta" markdown="1">

Por exemplo,

```html
<c:url value="/listagem.jsp"/>
```

gera a url <a>/BlogApp/listagem.jsp</a> sendo <a>/BlogApp</a> o caminho do contexto.

Usando essa tag, crie três páginas JSP, `page1.jsp`, `page2.jsp` e `page3.jsp` onde no topo das
páginas tenha um menu simples com links para todas as páginas, inclusive ela mesma.

</div>

**Dica:** você pode utilizar a tag `<jsp:include>` para reutilizar um arquivo com o menu.

{: .pergunta}
2\. Para obtermos uma URL relativa ao contexto da aplicação, basta usar como prefixo a string
resultante da chamada `request.getContextPath()`, que é um método que obtém o caminho da aplicação
configurado no container.

<div class="pergunta" markdown="1">

Por exemplo, o servlet abaixo tem o objetivo único de redirecionar o cliente para <a>/perfil.jsp</a>:

```java
public class ExemploServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String url = getUrl(request, "/perfil.jsp");
        response.sendRedirect(url);
    }

    private static String getUrl(HttpServletRequest request, String relativePath) {
        return request.getContextPath() + relativePath;
    }
}
```

Veja que a URL resultante estará no mesmo servidor, isto é, se esse servlet estiver acessível em
<a>http://127.0.0.1/WebApp/exemplo</a> sendo <a>/WebApp</a> o caminho do contexto, então:

```java
url = "http://127.0.0.1/WebApp/perfil.jsp"
```

Sendo assim, como tarefa da questão, crie um servlet mapeado para <a>/livro</a> que identifique o
idioma solicitado e redirecione

- para <a>/livro/pt</a>, se idioma for português
- para <a>/livro/fr</a>, se idioma for francês
- para <a>/livro/en</a>, para qualquer outro idioma

Lembre-se que todos esses são caminhos relativos ao contexto da aplicação.

</div>

{: .pergunta}
3\. Para esta questão, considere o formulário de múltiplas opções a seguir:

```html
<form method="post">
    Linguagens preferidas: <br>
    <input type="checkbox" name="linguagem" value="java">    Java    <br>
    <input type="checkbox" name="linguagem" value="python">  Python  <br>
    <input type="checkbox" name="linguagem" value="ruby">    Ruby    <br>
    <input type="checkbox" name="linguagem" value="php">     PHP     <br>
    <input type="checkbox" name="linguagem" value="c">       C       <br>
    <input type="checkbox" name="linguagem" value="haskell"> Haskell <br>
    <input type="checkbox" name="linguagem" value="julia">   Julia   <br> 
    <br>
    <input type="submit">
</form>
```

<div class="pergunta" markdown="1">

Utilizando esse formulário, crie um servlet para gravar em um ou mais cookies as opções marcadas
anteriormente pelo usuário, de forma que quando o usuário acessar o formulário novamente, essas
opções apareçam já marcadas.

Note que o formulário envia por método POST, assim a gravação dos cookies devem ser implementados no
método `doPost()` enquanto o formulário deve ser exibido para o usuário no método `doGet()`.

Para que uma opção apareça pré-marcada, adicione o atributo `checked` à tag `<input>`:

```html
<input type="checkbox" name="linguagem" value="java" checked>
```

</div>
