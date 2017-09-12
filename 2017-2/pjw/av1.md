---
layout: course
exam-title: 1ª Avaliação
date: 2017-09-11 19:00
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

<div class="resposta" markdown="1">

A solução mais direta possível seria criar um arquivo `menu.jsp` para ser incluído nos arquivos
`page1.jsp`, `page2.jsp` e `page3.jsp`.

Essa solução pode ser vista [**aqui**][questao1].

</div>

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

<div class="resposta" markdown="1">

Na [Revisão 1.1][rev1.1], tem uma questão muito parecida com essa.

A solução que eu fiz para esta questão é baseada nela e pode ser vista [**aqui**][questao2].

Note que só era necessário como resposta um servlet!

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

<div class="resposta" markdown="1">

Semelhante à questão anterior, a solução foi baseada em outra questão da [Revisão 1.1][rev1.1],
porém lá havia uma lista de marcação única enquanto aqui é de marcação múltipla.

Dessa forma, existem basicamente duas estratégias de solução:

 1. Utilizar um cookie para cada item da lista.

    Nesse caso, cada um dos cookies teria o valor `"marcado"` quando o usuário enviasse com a opção
    checada e no JSP bastaria fazer algo como

    ```
    ${cookie['java'].value == 'marcado' ? 'checked' : ''}
    ```

    A desvantagem dessa estratégia é que precisamos identificar as linguagens que não foram marcadas
    e remover esses cookies do usuário.

    Veja aqui a [**solução usando a estratégia 1**][questao3-s1].

 2. Utilizar um único cookie para identificar os itens marcados.

    A ideia é receber o array de strings com as linguagens e criar um string único para armazenar
    no cookie. Por exemplo, se o usuário marcou as linguagens Java, Python e PHP, então criaremos a
    string `"java:python:ruby"`, nesse exemplo usando `:` como separador.

    Para que o JSP consiga identificar se a opção deva ser marcada, convertemos a string obtida nos
    cookies para um objeto do tipo `List` que permite consulta com o método `contains()`

    Essa estratégia é um pouco mais difícil de estruturar, mas fica mais fácil de manter. Na
    estratégia anterior, se adicionarmos uma nova linguagem à lista? Teríamos que modificar tanto o
    arquivo Java como o JSP.

    Nessa estratégia, só é preciso mudar apenas o JSP.

    Veja no link a [**solução com a estratégia 2**][questao3-s2].

</div>

[questao1]: https://gist.github.com/wagnerluis1982/549658754ff432450f96a5172fb6c8a7 
[questao2]: https://gist.github.com/wagnerluis1982/48a17252bd4cd83486e448e98b533bd9
[questao3-s1]: https://gist.github.com/wagnerluis1982/ef23ee1f99f3e967fb52f2c5a5c879e4
[questao3-s2]: https://gist.github.com/wagnerluis1982/965c1ade88279eb7bb13f3670bfbd831
[rev1.1]: revisao11.html
